// ===== BACKEND SERVER EXAMPLE FOR PRODUCTION =====
// This is an example Node.js/Express backend for Tariq Smile Game Hub
// To use this, install: npm install express stripe dotenv cors
// Then update script.js to call these endpoints

const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
            // TODO: Generate download links
            // TODO: Send confirmation email
            // TODO: Save order to database
            
            res.json({
                success: true,
                message: 'Payment processed successfully',
                orderId: paymentIntent.id,
                downloadLinks: generateDownloadLinks(gameIds)
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
    // TODO: Send confirmation email
    // TODO: Generate download links
    // TODO: Update order status
}

function handlePaymentFailed(paymentIntent) {
    console.log('Payment failed:', paymentIntent.id);
    // TODO: Send failure notification
    // TODO: Update order status
}

function handleRefund(charge) {
    console.log('Refund processed:', charge.id);
    // TODO: Disable download links
    // TODO: Send refund notification
}

// ===== ERROR HANDLING =====

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        success: false,
        error: 'Internal server error'
    });
});

// ===== START SERVER =====

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Tariq Smile Game Hub server running on port ${PORT}`);
});

module.exports = app;
