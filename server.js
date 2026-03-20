// =============================================
// TARIQ SMILE GAME HUB - MAIN SERVER
// =============================================

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname)); // Serve root files like index.html, admin.html
app.use(express.raw({ type: 'application/json' })); // For webhook signatures

// ============================================
// IMPORT ALL ROUTE HANDLERS
// ============================================
try {
  const checkoutRoutes = require('./routes/checkout');
  const emailRoutes = require('./routes/emails');
  const contactEmailRoutes = require('./routes/contact-email');
  const paymentRoutes = require('./routes/payment');
  
  // ============================================
  // REGISTER ALL ROUTES
  // ============================================
  app.use(checkoutRoutes);        // Subscription checkout
  app.use(emailRoutes);            // Subscription emails
  app.use(contactEmailRoutes);     // Contact form
  app.use(paymentRoutes);          // Payment processing
  
  console.log('✅ Route handlers loaded successfully');
} catch (error) {
  console.warn('⚠️ Some route handlers not found:', error.message);
  console.warn('Starting with basic routes only...');
}

// Try to load 2FA routes if available
try {
  const admin2faRoutes = require('./routes/admin-2fa');
  app.use(admin2faRoutes);
  console.log('✅ 2FA routes loaded successfully');
} catch (error) {
  console.warn('⚠️ 2FA routes not configured');
}

// ============================================
// SERVE STATIC FILES & HTML PAGES
// ============================================

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Contact is embedded in index
});

// ============================================
// API HEALTH CHECK
// ============================================
app.get('/api/health', (req, res) => {
  res.json({
    status: '✅ Server is running',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    features: {
      frontend: true,
      paymentProessing: true,
      emailIntegration: true,
      twoFactorAuth: true
    }
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
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║     🎮 TARIQ SMILE GAME HUB - SERVER STARTED 🎮   ║
╚════════════════════════════════════════════════════╝

🌐 Server running at: http://localhost:${PORT}
📦 Environment: ${process.env.NODE_ENV || 'development'}
⏰ Started at: ${new Date().toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 Available Routes:
  🏠 Home:        http://localhost:${PORT}/
  🛒 Store:       http://localhost:${PORT}/ (Main page)
  🛒 Checkout:    http://localhost:${PORT}/checkout
  ✅ Success:     http://localhost:${PORT}/success
  🔐 Admin Login: http://localhost:${PORT}/admin-login
  ⚙️  Admin Panel: http://localhost:${PORT}/admin
  💬 Contact:     http://localhost:${PORT}/ (Embedded)
  📊 Health:      http://localhost:${PORT}/api/health

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 Features Enabled:
  ✅ E-Commerce Store
  ✅ Game Catalog
  ✅ Shopping Cart
  ✅ Admin Panel with 2FA
  ✅ Game Management
  ✅ Data Export/Import

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💡 Tips:
  • Use 'npm run dev' for auto-reload with nodemon
  • Check /api/health endpoint for server status
  • Login via padlock icon for admin access
  • All data stored in localStorage (browser)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Press Ctrl+C to stop the server
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('\n📭 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
  });
});

module.exports = app;
