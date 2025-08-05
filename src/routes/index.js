const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Fashion Store',
    user: req.user || null
  });
});

// Products route
router.get('/products', (req, res) => {
  res.render('products', { 
    title: 'All Products',
    user: req.user || null
  });
});

// Single product route
router.get('/products/:id', (req, res) => {
  res.render('product-detail', { 
    title: 'Product Details',
    user: req.user || null,
    productId: req.params.id
  });
});

// Cart route
router.get('/cart', (req, res) => {
  res.render('cart', { 
    title: 'Shopping Cart',
    user: req.user || null
  });
});

// Checkout route
router.get('/checkout', (req, res) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  res.render('checkout', { 
    title: 'Checkout',
    user: req.user
  });
});

// Login route
router.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('login', { 
    title: 'Login',
    user: null
  });
});

// Register route
router.get('/register', (req, res) => {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('register', { 
    title: 'Register',
    user: null
  });
});

module.exports = router;
