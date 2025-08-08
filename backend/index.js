const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Using mock data instead of database
console.log('ℹ️  Application configured to use mock data');

const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL, /\.vercel\.app$/]
    : true,
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);

// Root endpoint for API
app.get('/api', (req, res) => {
  res.json({
    message: 'NirogGyan Healthcare API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      doctors: '/api/doctors',
      specialties: '/api/doctors/specialties',
      appointments: '/api/appointments'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// For Vercel serverless functions
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  const PORT = process.env.PORT || 5000;
  
  app.listen(PORT, () => {
    console.log(`
🚀 Healthcare API Server is running!
📍 Server: http://localhost:${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
📊 Health Check: http://localhost:${PORT}/api/health
👩‍⚕️ Doctors API: http://localhost:${PORT}/api/doctors
💾 Using mock data (no database required)
    `);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('SIGINT received. Shutting down gracefully...');
    process.exit(0);
  });
}
