# 🔒 Security & Deployment Guide - Tariq Smile Game Hub

## PCI Compliance

This implementation uses **Stripe Checkout**, which means:

✅ **No card data ever touches your server** - It is handled entirely by Stripe's PCI-DSS Level 1 infrastructure.
✅ **Your server never processes payment details** - Stripe handles all sensitive data.
✅ **Webhook signature verification** - All Stripe events are verified using `stripe.webhooks.constructEvent`.
✅ **No storage of card information** - Secure by design.

## Environment Variables Setup

### ⚠️ NEVER commit `.env.local` to GitHub

Add to your `.gitignore`:
```
.env.local
.env
*.env
node_modules/
```

### Required Variables

Create `.env.local` in your root directory with:

```env
# Stripe Keys (Get from dashboard.stripe.com/apikeys)
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# SendGrid Email
SENDGRID_API_KEY=SG....
OWNER_EMAIL=ericmosha676@gmail.com

# Site Info
NEXT_PUBLIC_OWNER_NAME="Erick Vicent Ibrahim"
NEXT_PUBLIC_OWNER_PHONE="+255762679099"

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## Setup Instructions

### 1. **Stripe Setup**

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Sign up or log in
3. **Create Products:**
   - Name: "Premium Subscription"
   - Description: "High Speed Downloads, No Ads"
   - **Create Pricing:** Monthly, $9/month
   - Copy the **Price ID** (starts with `price_`)
   
4. Repeat for "Pro Subscription" ($19/month)
5. Add Price IDs to [routes/checkout.js](routes/checkout.js):
   ```javascript
   { id: 'premium', priceId: 'price_XXXXXXXXXXXXX' },
   { id: 'pro', priceId: 'price_XXXXXXXXXXXXX' },
   ```

6. **Get API Keys:**
   - Navigate to Developers → API Keys
   - Copy **Publishable Key** (pk_test_...)
   - Copy **Secret Key** (sk_test_...)
   - Add to `.env.local`

7. **Webhook Setup (for production):**
   - Go to Developers → Webhooks
   - Add endpoint: `your-domain.com/api/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy **Signing Secret** (whsec_...) to `.env.local`

### 2. **SendGrid Email Setup**

1. Go to [SendGrid](https://sendgrid.com)
2. Sign up or log in
3. **Create API Key:**
   - Settings → API Keys
   - Create New → Full Access
   - Copy the key to `.env.local` as `SENDGRID_API_KEY`

4. **Verify Sender:**
   - Settings → Sender Authentication
   - Add your email (ericmosha676@gmail.com)
   - Verify via email confirmation link

### 3. **Integration with Your Project**

1. **Update `server.js`:**
   ```javascript
   // Add at the top
   require('dotenv').config();
   const checkoutRoutes = require('./routes/checkout');
   const emailRoutes = require('./routes/emails');

   // Add routes
   app.use(checkoutRoutes);
   app.use(emailRoutes);
   ```

2. **Add CSS to `index.html`:**
   ```html
   <link rel="stylesheet" href="/subscription-styles.css">
   ```

3. **Add HTML to `index.html`:**
   Copy the content from [public/subscription-html.txt](public/subscription-html.txt) and paste into your `index.html`

4. **Install dependencies:**
   ```bash
   npm install stripe@latest nodemailer@latest
   ```

### 4. **Success & Cancel Pages**

Create `public/success.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Subscription Successful</title>
  <link rel="stylesheet" href="/styles.css">
  <style>
    .success-container {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #128c00, #00ff00);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .success-container h1 { font-size: 3rem; margin-bottom: 20px; }
    .success-container p { font-size: 1.2rem; margin-bottom: 30px; }
    .btn { padding: 15px 30px; background: white; color: #128c00; border: none; border-radius: 25px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <div class="success-container">
    <h1>✓ Subscription Successful!</h1>
    <p>Welcome to your new plan. Check your email for confirmation.</p>
    <a href="/" class="btn">Back to Home</a>
  </div>
</body>
</html>
```

Create `public/cancel.html`:
```html
<!DOCTYPE html>
<html>
<head>
  <title>Subscription Cancelled</title>
  <link rel="stylesheet" href="/styles.css">
  <style>
    .cancel-container {
      text-align: center;
      padding: 60px 20px;
      background: linear-gradient(135deg, #ff0000, #ff6b6b);
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
    }
    .cancel-container h1 { font-size: 3rem; margin-bottom: 20px; }
    .cancel-container p { font-size: 1.2rem; margin-bottom: 30px; }
    .btn { padding: 15px 30px; background: white; color: #ff0000; border: none; border-radius: 25px; font-weight: 700; cursor: pointer; }
  </style>
</head>
<body>
  <div class="cancel-container">
    <h1>Payment Cancelled</h1>
    <p>Your subscription was not completed. Feel free to try again.</p>
    <a href="/#subscriptions" class="btn">Choose a Plan</a>
  </div>
</body>
</html>
```

## Deployment

### On Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Update NEXT_PUBLIC_* variables as needed

### On Heroku
1. `heroku config:set STRIPE_SECRET_KEY=sk_test_...`
2. `heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...`
3. `heroku config:set SENDGRID_API_KEY=SG....`
4. Deploy: `git push heroku main`

### On DigitalOcean / AWS / Custom VPS
1. Set environment variables in `.env.local`
2. Run: `npm install && npm start`
3. Use PM2 for process management:
   ```bash
   npm install -g pm2
   pm2 start server.js --name "game-hub"
   pm2 save
   ```

## Testing

### Test Stripe Locally
1. Start your server: `npm run dev`
2. Visit `http://localhost:3000`
3. Click "Subscribe Now"
4. Use test card: `4242 4242 4242 4242` / Any future date / 123 CVC
5. Should redirect to success page

### Test Webhooks Locally
Use Stripe CLI:
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login and forward webhooks
stripe login
stripe listen --forward-to localhost:3000/api/webhook

# In another terminal, trigger test events
stripe trigger checkout.session.completed
```

## Security Checklist

- [ ] `.env.local` added to `.gitignore`
- [ ] Stripe Secret Key never exposed in client-side code
- [ ] Webhook signature verified (`stripe.webhooks.constructEvent`)
- [ ] HTTPS enabled in production
- [ ] Rate limiting implemented
- [ ] Email validation in place
- [ ] CORS configured for your domain only

## Support & Resources

- [Stripe Documentation](https://stripe.com/docs)
- [SendGrid Documentation](https://sendgrid.com/docs)
- [Express.js Guide](https://expressjs.com)
- [PCI Compliance Guide](https://stripe.com/en-gb/guides/pci-compliance)

---

**Need help?** Contact: ericmosha676@gmail.com | Phone: +255762679099
