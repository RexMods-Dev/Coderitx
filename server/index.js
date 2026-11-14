import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import enquiriesRouter from './routes/enquiries.js';
import { initDatabase } from './config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy for IP extraction behind reverse proxies
app.set('trust proxy', 1);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Spam prevention: Rate limiter for enquiry submissions (e.g. max 15 requests per 15 minutes per IP)
const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many project enquiries submitted from this IP. Please wait 15 minutes or contact us directly.'
  }
});

// API Routes
app.use('/api/enquiries', enquiryLimiter);
app.use('/api', enquiriesRouter);

// Serve static frontend in production if built
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

app.get('*', (req, res, next) => {
  // If requesting an API route that wasn't matched, send 404 JSON
  if (req.path.startsWith('/api')) {
    return res.status(404).json({
      success: false,
      message: 'API endpoint not found'
    });
  }
  // Otherwise serve client index.html if it exists
  const indexPath = path.join(clientDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).send('Coderitz API Server running. Client frontend is available via Vite dev server or npm run build.');
    }
  });
});

// Start server
async function startServer() {
  await initDatabase();

  app.listen(PORT, () => {
    console.log(`===============================================`);
    console.log(`  Coderitz API Server listening on port ${PORT}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`  Enquiries Endpoint: http://localhost:${PORT}/api/enquiries`);
    console.log(`===============================================`);
  });
}

startServer();
