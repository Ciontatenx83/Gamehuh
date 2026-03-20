# ⚡ Quick Start Checklist - Subscription Setup

Complete these steps in order to get your subscription system live.

## Step 1: Environment Setup (5 minutes)

- [ ] Copy `.env.local` file contents to your root directory
- [ ] Replace placeholder values with your actual keys:
  - [ ] Get Stripe keys from https://dashboard.stripe.com/apikeys
  - [ ] Get SendGrid API key from https://app.sendgrid.com/settings/api_keys
  - [ ] Update email: ericmosha676@gmail.com

## Step 2: Stripe Configuration (10 minutes)

1. [ ] Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. [ ] Create Product: "Premium Subscription" ($9/month)
   - [ ] Copy Price ID (format: `price_...`)
   - [ ] Update in [routes/checkout.js](routes/checkout.js) line 11
3. [ ] Create Product: "Pro Subscription" ($19/month)
   - [ ] Copy Price ID
   - [ ] Update in [routes/checkout.js](routes/checkout.js) line 19
4. [ ] Get API Keys:
   - [ ] Publishable Key (pk_test_...) → .env.local
   - [ ] Secret Key (sk_test_...) → .env.local

## Step 3: SendGrid Setup (5 minutes)

- [ ] Create SendGrid account at https://sendgrid.com
- [ ] Create API Key (Settings → API Keys)
- [ ] Copy API Key to .env.local
- [ ] Verify sender email: ericmosha676@gmail.com
  - [ ] Go to Settings → Sender Authentication
  - [ ] Add email and confirm via verification link

## Step 4: Install Dependencies & Create Routes

```bash
# Install required packages
npm install stripe@latest nodemailer@latest

# Files already created for you:
# ✓ /routes/checkout.js - Stripe checkout handler
# ✓ /routes/emails.js - Email notifications
# ✓ /public/subscription.js - Frontend logic
# ✓ /public/subscription-styles.css - Styling
# ✓ /.env.local - Environment variables
```

## Step 5: Update Your Main Files

### A. Update `server.js`

Add these lines at the **top** of your server.js:
```javascript
require('dotenv').config();
```

Add these lines **after middleware setup** (after app.use statements):
```javascript
const checkoutRoutes = require('./routes/checkout');
const emailRoutes = require('./routes/emails');

app.use(checkoutRoutes);
app.use(emailRoutes);
```

### B. Update `index.html`

1. Add CSS link in `<head>` section:
```html
<link rel="stylesheet" href="/public/subscription-styles.css">
```

2. Add HTML section for subscriptions (where you want it displayed):
```html
<section id="subscriptions" class="subscription-section">
  <div class="subscription-header">
    <h2>Choose Your Plan</h2>
    <p>Unlock unlimited access to premium games and exclusive features</p>
  </div>
  <div class="plans-container" id="plansContainer">
    <!-- Plans will be loaded dynamically -->
  </div>
</section>
```

3. Add Stripe script **before closing `</body>` tag**:
```html
<script src="https://js.stripe.com/v3/"></script>
<script src="/public/subscription.js"></script>
```

## Step 6: Create Success & Cancel Pages

Create `public/success.html` with your success page (template in SECURITY_AND_DEPLOYMENT.md)
Create `public/cancel.html` with your cancel page (template in SECURITY_AND_DEPLOYMENT.md)

## Step 7: Update .gitignore

Add these lines to prevent exposing secrets:
```
.env.local
.env
*.env
.env.*.local
```

## Step 8: Test Locally

```bash
# Start development server
npm run dev

# Visit: http://localhost:3000
# Scroll to subscription section
# Click "Subscribe Now"
# Use test card: 4242 4242 4242 4242
# Any future date and 123 CVC
```

## Step 9: Deploy to Production

### Option A: Vercel (Recommended - Easiest)
```bash
npm install -g vercel
vercel

# Set environment variables in Vercel dashboard:
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - SENDGRID_API_KEY
# - OWNER_EMAIL
# - NEXT_PUBLIC_OWNER_NAME
# - NEXT_PUBLIC_OWNER_PHONE
```

### Option B: Heroku
```bash
heroku create your-app-name
heroku config:set STRIPE_SECRET_KEY=sk_test_...
heroku config:set STRIPE_WEBHOOK_SECRET=whsec_...
heroku config:set SENDGRID_API_KEY=SG....
git push heroku main
```

### Option C: Custom Server
- Set .env.local variables
- Run `npm install && npm start`
- Use PM2 for process management

## Step 10: Set Up Webhooks (For Production)

1. [ ] In Stripe Dashboard → Developers → Webhooks
2. [ ] Add endpoint: `https://your-domain.com/api/webhook`
3. [ ] Select events:
   - [ ] `checkout.session.completed`
   - [ ] `customer.subscription.updated`
   - [ ] `customer.subscription.deleted`
4. [ ] Copy Signing Secret to .env.local: `STRIPE_WEBHOOK_SECRET`

## Troubleshooting

### "Cannot find module 'stripe'"
```bash
npm install stripe@latest
```

### "STRIPE_SECRET_KEY is undefined"
- Check .env.local file exists in root directory
- Restart your dev server: `npm run dev`
- Verify the key format: `sk_test_...`

### "Email not sending"
- Verify SendGrid API key is correct
- Verify sender email is verified in SendGrid
- Check SendGrid credentials in .env.local

### "Stripe test card not working"
- Use exactly: `4242 4242 4242 4242`
- Use ANY future date (e.g., 12/25)
- Use ANY 3-digit CVC (e.g., 123)
- You should be on localhost or your actual domain

### "Webhook not triggering"
- Use Stripe CLI for local testing (see SECURITY_AND_DEPLOYMENT.md)
- Make sure /api/webhook route is accessible
- Verify webhook secret matches STRIPE_WEBHOOK_SECRET

## Files Created For You

✅ `.env.local` - Environment configuration template
✅ `routes/checkout.js` - Stripe checkout API handler
✅ `routes/emails.js` - Email notification handler
✅ `public/subscription.js` - Frontend subscription logic
✅ `public/subscription-styles.css` - Beautiful styling
✅ `public/subscription-html.txt` - HTML template
✅ `SERVER_INTEGRATION_GUIDE.md` - Detailed integration guide
✅ `SECURITY_AND_DEPLOYMENT.md` - Security & deployment guide

## Need Help?

📧 Email: ericmosha676@gmail.com
📞 Phone: +255762679099

---

**Estimated Setup Time: 30 minutes**
**Testing Time: 10 minutes**
**Total: ~40 minutes to go live!**
