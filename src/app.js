// Load environment variables first
require('dotenv').config();

// Core dependencies
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const helmet = require('helmet');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

// Route imports
const indexRouter = require('./routes');

// Validate required environment variables
const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SESSION_SECRET'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

// Initialize Supabase client with error handling
let supabase;
try {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase URL and Anon Key are required');
  }
  
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized successfully');
} catch (error) {
  console.error('❌ Failed to initialize Supabase client:', error.message);
  process.exit(1);
}

// Import routes
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const ordersRouter = require('./routes/orders');
const profileRouter = require('./routes/profile');
const adminRouter = require('./routes/admin');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// Middleware
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Make Supabase client available in all routes
app.use((req, res, next) => {
  res.locals.supabase = supabase;
  next();
});

// Routes
app.use('/', indexRouter);
// Add more routes here as needed

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Enhanced error handler
app.use(function(err, req, res, next) {
  // Log the error
  console.error('❌ Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method,
    headers: req.headers,
    body: req.body
  });

  // Set locals, only providing error in development
  const isDev = req.app.get('env') === 'development';
  res.locals.message = err.message;
  res.locals.error = isDev ? err : {};
  res.locals.status = err.status || 500;

  // Respond with JSON for API requests
  if (req.xhr || req.path.startsWith('/api/')) {
    return res.status(err.status || 500).json({
      error: {
        message: err.message || 'Internal Server Error',
        ...(isDev && { stack: err.stack })
      }
    });
  }

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Handle 404 - Must be after all other routes
app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Page Not Found',
    error: { status: 404 }
  });
});

// Create HTTP server in development
let server;
if (process.env.NODE_ENV !== 'production') {
  const http = require('http');
  const port = process.env.PORT || 3000;
  server = http.createServer(app);
  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
  
  server.on('listening', () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  
  server.listen(port);
}

// Export both app and server for different use cases
module.exports = {
  app,
  server
};
