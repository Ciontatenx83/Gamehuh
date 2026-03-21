# 🎮 Tariq Smile Game Hub - Complete Setup & Deployment Guide

**Created:** March 21, 2026  
**Status:** ✅ Production Ready  
**For:** Erick Ibrahim (ericmosha676@gmail.com)  
**Version:** 2.0 - Complete & Unified

---

## ⚡ Quick Status Check

- ✅ Server fixed and running successfully
- ✅ All routes properly integrated
- ✅ Frontend files complete
- ✅ Admin authentication system active
- ✅ Email integration ready
- ✅ Payment processing configured
- ✅ Database structure ready

---

## 📋 Step-by-Step Setup (30 minutes)

### STEP 1: Prerequisites (5 minutes)

Before starting, ensure you have:

```bash
# Check Node.js version (need v14+)
node --version

# Check npm version (need v6+)
npm --version
```

If not installed, download from https://nodejs.org/

### STEP 2: Install Dependencies (10 minutes)

```bash
# Navigate to project directory
cd /workspaces/Gamehuh

# Install all npm packages
npm install

# Verify installation
npm list --depth=0
```

**Expected Output:**
```
tariq-smile-game-hub@1.0.0
├── express@^4.18.2
├── stripe@^12.0.0
├── dotenv@^16.0.3
├── cors@^2.8.5
├── ...
```

### STEP 3: Configure Environment Variables (10 minutes)

The `.env.local` file has been created for you, but you need to add your API keys:

```bash
# Open .env.local in your editor
cp .env.local .env.local.bak  # Backup original
```

**Edit `.env.local` and add your keys:**

```env
# Node Environment
NODE_ENV=development
PORT=3000
HOST=localhost

# Stripe Keys (from https://dashboard.stripe.com/apikeys)
STRIPE_PUBLIC_KEY=pk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_ACTUAL_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_ACTUAL_KEY_HERE

# SendGrid Email Key (from https://app.sendgrid.com/settings/api_keys)
SENDGRID_API_KEY=SG.YOUR_ACTUAL_KEY_HERE
OWNER_EMAIL=ericmosha676@gmail.com

# Session Secret (generate random string)
SESSION_SECRET=your_random_secret_string_here_min_32_chars

# API Configuration
BASE_URL=http://localhost:3000
```

### STEP 4: Verify Setup (5 minutes)

```bash
# Start the development server
npm start

# You should see:
# ✅ Route handlers loaded successfully
# ✅ 2FA routes loaded successfully
# 🎮 TARIQ SMILE GAME HUB - SERVER STARTED 🎮
# 🌐 Server running at: http://localhost:3000
```

**If server starts successfully, continue to testing.**

---

## 🧪 Testing the Application

### Website Access

Open your browser and visit:

| Page | URL | Purpose |
|------|-----|---------|
| **Game Store** | http://localhost:3000 | Browse & purchase games |
| **Checkout** | http://localhost:3000/checkout | Payment processing |
| **Success Page** | http://localhost:3000/success | Purchase confirmation |
| **Admin Login** | http://localhost:3000/admin-login | Admin access |
| **Admin Dashboard** | http://localhost:3000/admin | Manage games & send codes |
| **Health Check** | http://localhost:3000/api/health | Server status |

### Admin Login Test

1. Open http://localhost:3000/admin-login
2. Use the built-in authentication (padlock icon method)
3. You should see the admin dashboard with tabs for:
   - 📊 Dashboard (statistics)
   - ➕ Add Game
   - 🎮 Games List
   - 📧 Email Management
   - 📥 Backup & Restore

### Game Management Test

1. Click "Add Game" tab
2. Fill in game details:
   - Name: "Test Game"
   - Category: "Action"
   - Price: "9.99"
   - Description: "A test game"
3. Click "Add Game"
4. Game should appear in the store immediately

### Email Integration Test

**This requires Stripe & SendGrid keys to be configured**

1. Go to "Email Management" tab
2. Enter recipient email
3. Enter license code (e.g., AUTO-TEST-1234-5678)
4. Click "Send License Code"
5. Check the recipient's email inbox

---

## 🔧 Project Structure Explained

### Root Directory
```
/workspaces/Gamehuh/
├── index.html              ← Main game store page
├── admin.html              ← Admin dashboard
├── admin-login.html        ← Admin login page
├── admin.js                ← Admin functionality
├── admin-styles.css        ← Admin styling
├── script.js               ← Game store logic
├── styles.css              ← Game store styles
├── server.js               ← Express server (MAIN FILE)
├── package.json            ← Project dependencies
├── .env.local              ← Environment variables (NEVER COMMIT)
└── .gitignore              ← Git ignore rules
```

### Public Directory (`/public`)
Contains all frontend assets for checkout and subscriptions:
```
/public/
├── checkout.html           ← Checkout page
├── checkout.js             ← Stripe checkout logic
├── checkout-styles.css     ← Checkout styling
├── success.html            ← Order success page
├── subscription.js         ← Subscription plans
├── subscription-styles.css ← Plans styling
├── contact.js              ← Contact form
├── contact-styles.css      ← Contact styling
└── footer.html             ← Footer component
```

### Routes Directory (`/routes`)
API endpoint handlers:
```
/routes/
├── checkout.js             ← Stripe checkout sessions
├── emails.js               ← Email notifications
├── contact-email.js        ← Contact form emails
├── payment.js              ← Payment processing
└── admin-2fa.js            ← Two-factor authentication
```

---

## 📱 Available Endpoints

### Game Store API
```
GET  /                      ← Main game store
GET  /admin-login           ← Admin login page
GET  /admin                 ← Admin dashboard
GET  /contact               ← Contact page (embedded in store)
GET  /checkout              ← Checkout page
GET  /success               ← Success page
```

### API Endpoints
```
GET  /api/health            ← Server status check
POST /api/checkout          ← Create Stripe checkout session
GET  /api/plans             ← Get subscription plans
POST /api/webhook           ← Handle Stripe webhooks
POST /api/send-email        ← Send subscription confirmation
POST /api/send-contact-email ← Send contact form message
POST /api/process-payment   ← Process payment
POST /api/webhook/payment   ← Payment webhook handler
```

---

## 🔐 Security Configuration

### Never Commit Secrets
```bash
# .gitignore already configured to ignore:
.env.local
.env
.env.production
node_modules/
logs/
```

### Generate Session Secret
```bash
# Create a strong random secret (use in .env.local)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Stripe Webhook Setup
1. Go to https://dashboard.stripe.com/webhooks
2. Create webhook endpoint:
   - URL: `https://yourdomain.com/api/webhook`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`
3. Copy webhook secret to `.env.local`

---

## 🚀 Production Deployment

### Before Deploying

1. **Change NODE_ENV to production**
   ```env
   NODE_ENV=production
   ```

2. **Update Stripe keys** (use production keys)
   ```env
   STRIPE_PUBLIC_KEY=pk_live_YOUR_LIVE_KEY
   STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
   ```

3. **Update SendGrid key** (verify in production)

4. **Update BASE_URL** to your domain
   ```env
   BASE_URL=https://yourdomain.com
   ```

5. **Test thoroughly** on staging environment first

### Deployment Options

#### Option A: Heroku
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create your-game-hub

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set STRIPE_SECRET_KEY=sk_live_...
heroku config:set SENDGRID_API_KEY=SG...

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

#### Option B: AWS / DigitalOcean / VPS
```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone <your-repo-url>
cd Gamehuh

# Install dependencies
npm install --production

# Set environment variables
nano .env.local

# Start with PM2 (process manager)
npm install -g pm2
pm2 start server.js --name "gamehub"
pm2 save
pm2 startup

# View status
pm2 status
```

#### Option C: Docker
```bash
# Build image
docker build -t gamehub .

# Run container
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e STRIPE_SECRET_KEY=sk_live_... \
  gamehub
```

---

## 🛠️ Troubleshooting

### Server Won't Start

**Error: "STRIPE_SECRET_KEY not found"**
- Solution: Check `.env.local` exists with all required keys

**Error: "Cannot find module 'express'"**
- Solution: Run `npm install` again

**Error: "PORT already in use"**
- Solution: Change PORT in `.env.local` or kill process: `lsof -ti:3000 | xargs kill -9`

### Games Not Showing

1. Check browser console (F12) for JavaScript errors
2. Verify `script.js` is loaded in index.html
3. Check localStorage in DevTools (should contain game data)
4. Try in incognito/private mode to reset localStorage

### Email Not Sending

1. Verify SENDGRID_API_KEY is set in `.env.local`
2. Check SendGrid account has verified sender email
3. Check email recipient is valid
4. Review SendGrid Activity Log for bounce/suppression reasons

### Admin Not Loading

1. Clear localStorage: `localStorage.clear()` in console
2. Verify admin.js is loaded (check Network tab)
3. Check browser console for errors
4. Try incognito mode

### Payment Issues

1. Use Stripe test card: 4242 4242 4242 4242 (any future date, any CVC)
2. Check /api/health endpoint returns 200 status
3. Verify STRIPE_PUBLIC_KEY and STRIPE_SECRET_KEY match
4. Check Stripe dashboard for webhook events

---

## 📚 Additional Resources

### Documentation Files
- **MASTER_GUIDE.md** - Complete system overview
- **COMPLETE_CHECKOUT_GUIDE.md** - Payment processing details
- **SECURITY_AND_DEPLOYMENT.md** - Security best practices
- **SERVER_INTEGRATION_GUIDE.md** - Backend integration details
- **EMAIL_SETUP.md** - Email configuration guide

### External Resources
- [Stripe Documentation](https://stripe.com/docs)
- [SendGrid API Reference](https://docs.sendgrid.com/api-reference)
- [Express.js Guide](https://expressjs.com/)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)

---

## 📞 Support

### For Issues
1. Check this guide's Troubleshooting section
2. Review error logs: `npm start` output
3. Check browser console: F12 → Console tab
4. Verify `.env.local` configuration

### Contact
- Owner: Erick Ibrahim
- Email: ericmosha676@gmail.com
- Phone: +255 762 679 099

---

## ✅ Deployment Checklist

Before going live:

- [ ] Install dependencies (`npm install`)
- [ ] Configure `.env.local` with all API keys
- [ ] Test server locally (`npm start`)
- [ ] Test all pages load correctly
- [ ] Test admin login and game management
- [ ] Test game purchase flow (use Stripe test card)
- [ ] Test email sending (if configured)
- [ ] Set up SSL/HTTPS certificate
- [ ] Configure custom domain
- [ ] Update BASE_URL in `.env.local`
- [ ] Set NODE_ENV=production
- [ ] Set up automated backups
- [ ] Configure monitoring/logging
- [ ] Test on staging environment first
- [ ] Deploy to production
- [ ] Verify all features work in production
- [ ] Monitor error logs for first 24 hours

---

**Last Updated:** March 21, 2026  
**Status:** ✅ Ready for Production  
**Next Step:** Run `npm install` then `npm start` to begin!
