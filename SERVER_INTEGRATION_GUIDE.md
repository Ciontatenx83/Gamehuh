// server.js - Updated with Subscription Routes
// Add this to your existing server.js file

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Import subscription routes
const checkoutRoutes = require('./routes/checkout');
const emailRoutes = require('./routes/emails');

// Register routes
app.use(checkoutRoutes);
app.use(emailRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Cancel page
app.get('/cancel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cancel.html'));
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📚 API Routes:`);
  console.log(`   GET  /api/plans - Get all subscription plans`);
  console.log(`   POST /api/checkout - Create Stripe checkout session`);
  console.log(`   POST /api/webhook - Stripe webhook endpoint`);
  console.log(`   POST /api/send-email - Send subscription confirmation email`);
});
