// This file is the entry point for Vercel Serverless Functions
const { app } = require('../src/app');

// Enable CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Vercel Serverless Function handler
module.exports = async (req, res) => {
  console.log('Vercel Serverless Function invoked:', req.method, req.url);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Forward the request to Express app
    return app(req, res);
  } catch (error) {
    console.error('Unhandled error in serverless function:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message 
    });
  }
};
