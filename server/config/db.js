import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'data');
const fallbackFilePath = path.join(dataDir, 'enquiries_fallback.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Ensure fallback file exists
if (!fs.existsSync(fallbackFilePath)) {
  fs.writeFileSync(fallbackFilePath, JSON.stringify([], null, 2), 'utf-8');
}

let pool = null;
let isPgConnected = false;
let dbErrorDetails = null;

// Configure connection options
const connectionString = process.env.DATABASE_URL;

const poolConfig = connectionString
  ? {
      connectionString,
      ssl: process.env.PGSSLMODE === 'require' ? { rejectUnauthorized: false } : false,
      connectionTimeoutMillis: 3500,
    }
  : {
      host: process.env.PGHOST || 'localhost',
      port: parseInt(process.env.PGPORT || '5432', 10),
      user: process.env.PGUSER || 'postgres',
      password: process.env.PGPASSWORD || '',
      database: process.env.PGDATABASE || 'coderitz_db',
      connectionTimeoutMillis: 3500,
    };

pool = new Pool(poolConfig);

/**
 * Initialize PostgreSQL database and table
 */
export async function initDatabase() {
  try {
    const client = await pool.connect();
    console.log('✓ Successfully connected to PostgreSQL database.');

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS enquiries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(100) NOT NULL,
        institution VARCHAR(255),
        category VARCHAR(100) NOT NULL,
        preferred_tech VARCHAR(255),
        description TEXT NOT NULL,
        deadline VARCHAR(100),
        additional_requirements TEXT,
        ip_address VARCHAR(100),
        status VARCHAR(50) DEFAULT 'new',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(createTableQuery);
    client.release();
    isPgConnected = true;
    console.log('✓ Verified PostgreSQL "enquiries" table is ready.');
  } catch (err) {
    isPgConnected = false;
    dbErrorDetails = err.message;
    console.warn(`! Note: PostgreSQL connection not active (${err.message}).`);
    console.warn('  Enquiries will be safely persisted to local JSON store (server/data/enquiries_fallback.json)');
    console.warn('  To connect PostgreSQL: Set DATABASE_URL in server/.env with your PostgreSQL credentials.');
  }
}

/**
 * Save an enquiry to PostgreSQL or fallback storage
 */
export async function saveEnquiry(data) {
  const {
    name,
    email,
    phone,
    institution = '',
    category,
    preferred_tech = '',
    description,
    deadline = '',
    additional_requirements = '',
    ip_address = ''
  } = data;

  if (isPgConnected && pool) {
    try {
      const query = `
        INSERT INTO enquiries (
          name, email, phone, institution, category, 
          preferred_tech, description, deadline, additional_requirements, ip_address
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
      `;
      const values = [
        name,
        email,
        phone,
        institution,
        category,
        preferred_tech,
        description,
        deadline,
        additional_requirements,
        ip_address
      ];

      const result = await pool.query(query, values);
      return {
        success: true,
        source: 'postgresql',
        record: result.rows[0]
      };
    } catch (pgError) {
      console.error('PostgreSQL insert error, falling back to local storage:', pgError.message);
    }
  }

  // Fallback file persistence
  try {
    const raw = fs.readFileSync(fallbackFilePath, 'utf-8');
    const records = JSON.parse(raw || '[]');
    const newRecord = {
      id: records.length + 1,
      name,
      email,
      phone,
      institution,
      category,
      preferred_tech,
      description,
      deadline,
      additional_requirements,
      ip_address,
      status: 'new',
      created_at: new Date().toISOString()
    };
    records.push(newRecord);
    fs.writeFileSync(fallbackFilePath, JSON.stringify(records, null, 2), 'utf-8');

    return {
      success: true,
      source: 'local_storage',
      record: newRecord
    };
  } catch (fsErr) {
    throw new Error(`Failed to save enquiry: ${fsErr.message}`);
  }
}

/**
 * Retrieve all enquiries
 */
export async function getAllEnquiries() {
  if (isPgConnected && pool) {
    try {
      const res = await pool.query('SELECT * FROM enquiries ORDER BY created_at DESC');
      return {
        source: 'postgresql',
        enquiries: res.rows
      };
    } catch (err) {
      console.warn('Failed to query PostgreSQL, loading fallback:', err.message);
    }
  }

  try {
    const raw = fs.readFileSync(fallbackFilePath, 'utf-8');
    const records = JSON.parse(raw || '[]');
    return {
      source: 'local_storage',
      enquiries: records.reverse()
    };
  } catch (err) {
    return { source: 'empty', enquiries: [] };
  }
}

/**
 * Database health & status
 */
export function getDbStatus() {
  return {
    isPgConnected,
    storageType: isPgConnected ? 'PostgreSQL' : 'Local JSON Fallback',
    info: isPgConnected
      ? 'PostgreSQL active and table schema synchronized'
      : 'Using local persistence store until PostgreSQL is connected',
    connectionError: isPgConnected ? null : dbErrorDetails
  };
}
