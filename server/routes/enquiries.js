import express from 'express';
import { saveEnquiry, getAllEnquiries, getDbStatus } from '../config/db.js';

const router = express.Router();

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/enquiries
 * Submit project enquiry with validation and spam protection
 */
router.post('/enquiries', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      institution,
      category,
      preferred_tech,
      description,
      deadline,
      additional_requirements,
      // Spam protection fields:
      hp_field, // Honeypot field (hidden in UI)
      form_load_time // Client timestamp when form loaded
    } = req.body;

    // 1. Honeypot check - if a bot filled the hidden honeypot field
    if (hp_field && hp_field.trim().length > 0) {
      console.warn('Bot detected via honeypot field. Discarding silently.');
      // Return 200 to trick bot
      return res.status(200).json({
        success: true,
        message: 'Your project enquiry has been received. Our team will review your idea and get in touch shortly.'
      });
    }

    // 2. Rapid submission check (spam protection)
    if (form_load_time) {
      const elapsed = Date.now() - Number(form_load_time);
      if (elapsed < 1200) {
        // Less than 1.2s to fill the entire form is almost certainly automated
        console.warn('Submission flagged as potential automated bot (submitted in < 1.2s).');
      }
    }

    // 3. Validation
    const errors = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please provide your full name (at least 2 characters).';
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      errors.email = 'Please provide a valid email address.';
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      errors.phone = 'Please provide a valid contact number (Phone or WhatsApp).';
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      errors.category = 'Please select a project category.';
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      errors.description = 'Please describe your project idea or requirement (at least 10 characters).';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the required fields.',
        errors
      });
    }

    // Client IP address
    const ip_address = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';

    // 4. Save to PostgreSQL or fallback
    const result = await saveEnquiry({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      institution: institution ? institution.trim() : '',
      category: category.trim(),
      preferred_tech: preferred_tech ? preferred_tech.trim() : '',
      description: description.trim(),
      deadline: deadline ? deadline.trim() : '',
      additional_requirements: additional_requirements ? additional_requirements.trim() : '',
      ip_address
    });

    return res.status(201).json({
      success: true,
      message: 'Your project enquiry has been received. Our team will review your requirements and reach out within 24 hours.',
      data: {
        id: result.record.id,
        name: result.record.name,
        category: result.record.category,
        storage: result.source,
        created_at: result.record.created_at
      }
    });
  } catch (error) {
    console.error('Error handling enquiry submission:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while processing your request. Please try again or reach out directly.'
    });
  }
});

/**
 * GET /api/enquiries
 * Retrieve submitted enquiries
 */
router.get('/enquiries', async (req, res) => {
  try {
    const data = await getAllEnquiries();
    return res.status(200).json({
      success: true,
      count: data.enquiries.length,
      storage: data.source,
      enquiries: data.enquiries
    });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve enquiries.'
    });
  }
});

/**
 * GET /api/health
 * System health and database connection status
 */
router.get('/health', async (req, res) => {
  const dbStatus = getDbStatus();
  const data = await getAllEnquiries();
  return res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    service: 'Coderitz Backend API',
    database: dbStatus,
    totalEnquiries: data.enquiries.length
  });
});

export default router;
