// routes/checkout.js
const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

// Subscription plans with Stripe Price IDs
const plans = [
  { 
    id: 'free', 
    name: 'Free', 
    price: '0', 
    features: ['Basic Access', 'Community Forum'] 
  },
  { 
    id: 'premium', 
    name: 'Premium', 
    price: '9', 
    features: ['High Speed Downloads', 'No Ads'], 
    priceId: 'price_PREMIUM_ID' // Update with actual Stripe Price ID
  },
  { 
    id: 'pro', 
    name: 'Pro', 
    price: '19', 
    features: ['Early Beta Access', 'Exclusive Rewards'], 
    priceId: 'price_PRO_ID' // Update with actual Stripe Price ID
  },
];

// POST /api/checkout - Create Stripe Checkout Session
router.post('/api/checkout', async (req, res) => {
  try {
    const { priceId } = req.body;

    // Validate priceId
    if (!priceId) {
      return res.status(400).json({ error: 'Price ID is required' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: req.body.email || undefined,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/webhook - Handle Stripe Webhook Events
router.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Payment successful:', event.data.object);
        // TODO: Update user subscription status in database
        break;

      case 'customer.subscription.updated':
        console.log('📝 Subscription updated:', event.data.object);
        // TODO: Update user subscription tier
        break;

      case 'customer.subscription.deleted':
        console.log('❌ Subscription cancelled:', event.data.object);
        // TODO: Revoke subscription access
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

// GET /api/plans - Get all subscription plans
router.get('/api/plans', (req, res) => {
  res.json(plans);
});

module.exports = router;
