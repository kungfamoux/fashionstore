// This file is the entry point for Vercel Serverless Functions
console.log('Initializing serverless function...');

// Log environment variables (without sensitive data)
console.log('Environment:', {
  NODE_ENV: process.env.NODE_ENV,
  NODE_VERSION: process.version,
  VERCEL: process.env.VERCEL,
  VERCEL_ENV: process.env.VERCEL_ENV,
  VERCEL_REGION: process.env.VERCEL_REGION,
  // Don't log sensitive data like API keys
  SUPABASE_URL: process.env.SUPABASE_URL ? '***' : 'Not set',
  SESSION_SECRET: process.env.SESSION_SECRET ? '***' : 'Not set'
});

// Load the app with error handling
let app;
try {
  console.log('Loading app...');
  app = require('../src/app').app;
  console.log('App loaded successfully');
} catch (error) {
  console.error('Failed to load app:', error);
  process.exit(1);
}

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();});

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    headers: req.headers
  });
  
  if (!res.headersSent) {
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  }
});

// Vercel Serverless Function handler
module.exports = async (req, res) => {
  console.log(`\n--- New Request: ${req.method} ${req.url} ---`);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(200).end();
  }
  
  try {
    console.log('Processing request...');
    // Forward the request to Express app
    return app(req, res, (error) => {
      if (error) {
        console.error('Error in request processing:', error);
        if (!res.headersSent) {
          res.status(500).json({ 
            error: 'Request Processing Error',
            message: error.message
          });
        }
      }
    });
  } catch (error) {
    console.error('Unhandled error in serverless function:', {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      headers: req.headers
    });
    
    if (!res.headersSent) {
      return res.status(500).json({ 
        error: 'Unhandled Server Error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred'
      });
    }
  }
};
