// server.js - COMPLETE EXAMPLE FOR YOUR PROJECT
// Copy this code structure to your existing server.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// ============================================
// MIDDLEWARE SETUP
// ============================================
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.raw({ type: 'application/json' })); // For webhook signatures

// ============================================
// IMPORT ALL ROUTE HANDLERS
// ============================================
const checkoutRoutes = require('./routes/checkout');
const emailRoutes = require('./routes/emails');
const contactEmailRoutes = require('./routes/contact-email');
const paymentRoutes = require('./routes/payment');
const admin2faRoutes = require('./routes/admin-2fa');

// ============================================
// REGISTER ALL ROUTES
// ============================================
app.use(checkoutRoutes);        // Subscription checkout: /api/checkout, /api/plans, /api/webhook
app.use(emailRoutes);            // Subscription emails: /api/send-email
app.use(contactEmailRoutes);     // Contact form: /api/send-contact-email
app.use(paymentRoutes);          // Payment processing: /api/process-payment, /api/webhook/payment
app.use(admin2faRoutes);         // Admin 2FA: /api/admin/request-2fa, /api/admin/verify-2fa, /api/admin/verify-token, /api/admin/logout

// ============================================
// SERVE STATIC FILES & HTML PAGES
// ============================================
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin login page
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

// Admin dashboard page
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Checkout page
app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'checkout.html'));
});

// Success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'success.html'));
});

// Contact page (if separate)
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Contact is embedded in index
});

// ============================================
// API HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred',
  });
});

// ============================================
// 404 NOT FOUND
// ============================================
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
  });
});

// ============================================
// START SERVER
// ============================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🎮 Tariq Smile Game Hub - Server Running              ║
║                                                           ║
║   Server: http://localhost:${PORT}                       ║
║   Environment: ${process.env.NODE_ENV || 'development'}                              ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║ API ENDPOINTS:                                            ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║ 🛒 SUBSCRIPTION & CHECKOUT:                              ║
║   GET  /api/plans                 - List subscription plans
║   POST /api/checkout              - Create checkout session
║   POST /api/webhook               - Stripe webhook handler
║   POST /api/send-email            - Send subscription email   ║
║                                                           ║
║ 💳 PAYMENT PROCESSING:                                   ║
║   POST /api/process-payment       - Process payment        ║
║   POST /api/webhook/payment       - Payment webhook        ║
║                                                           ║
║ 📧 CONTACT FORM:                                         ║
║   POST /api/send-contact-email    - Send contact message  ║
║                                                           ║
║ 🏥 HEALTH:                                               ║
║   GET  /api/health                - Server status         ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║ PAGES:                                                    ║
╠═══════════════════════════════════════════════════════════╣
║   http://localhost:${PORT}            - Home page         ║
║   http://localhost:${PORT}/checkout   - Checkout page     ║
║   http://localhost:${PORT}/success    - Success page      ║
║                                                           ║
╠═══════════════════════════════════════════════════════════╣
║ SECURITY:                                                 ║
╠═══════════════════════════════════════════════════════════╣
║   ✓ CVV never stored or transmitted                      ║
║   ✓ Full card number never logged                        ║
║   ✓ Webhook signatures verified                          ║
║   ✓ CORS enabled for cross-origin requests              ║
║   ✓ Environment variables protected                      ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});
