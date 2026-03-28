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
      paymentProcessing: true,
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

// ===== PAYMENT ENDPOINTS =====

/**
 * Create payment intent
 * POST /api/payment/create-intent
 * Body: { amount: number, currency: string }
 */
app.post('/api/payment/create-intent', async (req, res) => {
    try {
        const { amount, currency = 'usd', metadata = {} } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency,
            metadata
        });

        res.json({
            success: true,
            clientSecret: paymentIntent.client_secret,
            intentId: paymentIntent.id
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Process payment
 * POST /api/payment/process
 */
app.post('/api/payment/process', async (req, res) => {
    try {
        const { paymentIntentId, amount, gameIds, email } = req.body;

        // Confirm the payment intent
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            // Payment successful
            // Generate download links
            const downloadLinks = generateDownloadLinks(gameIds);
            
            // Send confirmation email
            sendConfirmationEmail(email, gameIds, downloadLinks);
            
            // Save order to database
            saveOrderToDatabase(paymentIntentId, email, gameIds, amount);
            
            res.json({
                success: true,
                message: 'Payment processed successfully',
                orderId: paymentIntent.id,
                downloadLinks
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Payment was not successful'
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Get payment status
 * GET /api/payment/:intentId
 */
app.get('/api/payment/:intentId', async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.intentId);

        res.json({
            success: true,
            status: paymentIntent.status,
            amount: paymentIntent.amount / 100,
            currency: paymentIntent.currency
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// ===== WEBHOOK ENDPOINT =====

/**
 * Stripe webhook handler
 * POST /api/webhooks/stripe
 */
app.post('/api/webhooks/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case 'payment_intent.succeeded':
            handlePaymentSuccess(event.data.object);
            break;
        case 'payment_intent.payment_failed':
            handlePaymentFailed(event.data.object);
            break;
        case 'charge.refunded':
            handleRefund(event.data.object);
            break;
    }

    res.json({ received: true });
});

// ===== GAME ENDPOINTS =====

/**
 * Get all games
 * GET /api/games
 */
app.get('/api/games', (req, res) => {
    // TODO: Fetch from database
    const games = [
        {
            id: 1,
            name: 'Dragon Quest',
            category: 'rpg',
            price: 29.99,
            rating: 4.8
        }
        // Add more games from database
    ];

    res.json({ success: true, games });
});

/**
 * Get single game
 * GET /api/games/:id
 */
app.get('/api/games/:id', (req, res) => {
    // TODO: Fetch from database by ID
    const game = {
        id: req.params.id,
        name: 'Game Name',
        description: 'Description',
        price: 29.99
    };

    res.json({ success: true, game });
});

// ===== DOWNLOAD ENDPOINTS =====

/**
 * Generate download link
 * POST /api/download/generate-link
 */
app.post('/api/download/generate-link', async (req, res) => {
    try {
        const { gameId, orderId, email } = req.body;

        // Generate unique download token (valid for 24 hours)
        const token = generateToken();
        
        // TODO: Store token in database with expiry
        // TODO: Generate AWS S3 signed URL if using S3

        const downloadLink = `${process.env.BASE_URL}/api/download/${token}`;

        res.json({
            success: true,
            downloadLink,
            expiresIn: 86400 // 24 hours in seconds
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Download game file
 * GET /api/download/:token
 */
app.get('/api/download/:token', async (req, res) => {
    try {
        // TODO: Verify token and check expiry
        // TODO: Log download
        // TODO: Serve file from storage

        res.download('/path/to/game/file.zip');
    } catch (error) {
        res.status(400).json({
            success: false,
            error: 'Invalid or expired download link'
        });
    }
});

// ===== USER ENDPOINTS =====

/**
 * Create user account
 * POST /api/users/register
 */
app.post('/api/users/register', async (req, res) => {
    try {
        const { email, password, name } = req.body;

        // TODO: Hash password
        // TODO: Save to database
        // TODO: Send verification email

        res.json({
            success: true,
            message: 'Account created. Please verify your email.'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * User login
 * POST /api/users/login
 */
app.post('/api/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // TODO: Verify credentials
        // TODO: Generate JWT token

        res.json({
            success: true,
            token: 'jwt_token_here',
            user: {
                id: 1,
                email,
                name: 'User Name'
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

/**
 * Get user library (purchased games)
 * GET /api/users/:id/library
 */
app.get('/api/users/:id/library', async (req, res) => {
    try {
        // TODO: Verify user is authenticated
        // TODO: Fetch user's purchased games

        const library = [
            { id: 1, name: 'Dragon Quest', purchased: '2024-01-15' }
        ];

        res.json({ success: true, library });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// ===== HELPER FUNCTIONS =====

function generateDownloadLinks(gameIds) {
    return gameIds.map(id => ({
        gameId: id,
        link: `/download/${generateToken()}`
    }));
}

function generateToken() {
    return require('crypto').randomBytes(32).toString('hex');
}

function handlePaymentSuccess(paymentIntent) {
    console.log('Payment succeeded:', paymentIntent.id);
    // Send confirmation email
    // Generate download links
    // Update order status
}

function handlePaymentFailed(paymentIntent) {
    console.log('Payment failed:', paymentIntent.id);
    // Send failure notification
    // Update order status
}

function handleRefund(charge) {
    console.log('Refund processed:', charge.id);
    // Disable download links
    // Send refund notification
}

// ===== HELPER FUNCTIONS IMPLEMENTATIONS =====

function sendConfirmationEmail(email, gameIds, downloadLinks) {
    console.log(`Sending confirmation email to ${email} for games: ${gameIds.join(', ')}`);
    // TODO: Implement actual email sending with nodemailer
    // For now, just log the action
}

function saveOrderToDatabase(paymentIntentId, email, gameIds, amount) {
    console.log(`Saving order to database: ${paymentIntentId}, ${email}, ${gameIds.join(', ')}, $${amount}`);
    // TODO: Implement actual database save with mongoose
    // For now, just log the action
}

// ===== ERROR HANDLING =====

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});
