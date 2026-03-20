# Email Setup & Configuration Guide

## Overview

The Game Hub admin panel includes a built-in email service that allows you to send license activation codes to customers directly. This guide walks you through setting up the email functionality.

---

## Architecture

- **Frontend**: Admin panel (admin.html) with email form in Settings tab
- **Backend**: Node.js/Express server (server-email.js) handling email delivery
- **Email Service**: Nodemailer with Gmail or custom SMTP support
- **License Codes**: AUTO-XXXX-XXXX-XXXX format, tracked with usage limits

---

## Prerequisites

Ensure you have:
- ✅ Node.js 14+ installed
- ✅ npm installed
- ✅ An email account (Gmail recommended)
- ✅ The workspace files extracted

---

## Step 1: Install Dependencies

All required npm packages are already listed in `package.json`. Install them:

```bash
cd /workspaces/Gamehuh
npm install
```

This will install:
- `express` - Web framework
- `nodemailer` - Email sending
- `cors` - Cross-origin requests
- `body-parser` - Request parsing
- `dotenv` - Environment variables
- `nodemon` - Development auto-reload (optional)

---

## Step 2: Configure Email Credentials

### Option A: Gmail Configuration (Recommended)

#### 2A1. Enable 2-Factor Authentication

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Sign in with your Gmail account
3. Scroll to "2-Step Verification" and enable it
4. Complete the verification process

#### 2A2. Generate App Password

1. Return to [Google Account Security](https://myaccount.google.com/security)
2. Scroll to "App passwords" (appears only after 2FA is enabled)
3. Select **Mail** and **Windows Computer** (or your device)
4. Google will generate a 16-character password
5. **Copy this password** - you'll use it in Step 3

#### 2A3. Get Your Gmail Address

- Your email address is your regular Gmail address (e.g., `yourname@gmail.com`)

### Option B: Custom Email Server

If using a custom SMTP server (Office 365, SendGrid, etc.):

1. Get your SMTP server address (e.g., `smtp.office365.com`)
2. Get your email account username
3. Get your email account password or API key
4. Note the SMTP port (usually 587 or 465)

You'll need to modify the `nodemailer.createTransport()` configuration in `server-email.js`.

---

## Step 3: Create Environment Configuration File

Create a `.env` file in the root directory (`/workspaces/Gamehuh/.env`):

### For Gmail:

```env
# Email Configuration (Gmail)
ADMIN_EMAIL=your-email@gmail.com
ADMIN_EMAIL_PASSWORD=aaaa bbbb cccc dddd
PORT=3000
NODE_ENV=development
```

Replace:
- `your-email@gmail.com` with your Gmail address
- `aaaa bbbb cccc dddd` with the 16-character app password (spacing doesn't matter)

### For Custom SMTP:

```env
# Email Configuration (Custom SMTP)
ADMIN_EMAIL=your-email@example.com
ADMIN_EMAIL_PASSWORD=your-password
SMTP_HOST=smtp.office365.com
SMTP_PORT=587
PORT=3000
NODE_ENV=development
```

Then modify `server-email.js` to use these variables:

```javascript
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD
    }
});
```

---

## Step 4: Start the Email Server

### Development Mode (with auto-reload):

```bash
npm run dev
```

### Production Mode:

```bash
npm start
```

You should see output like:

```
Email service running on port 3000
Health check: http://localhost:3000/api/health
```

---

## Step 5: Test the Email Service

### Test 1: Health Check

```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{"status":"operational"}
```

### Test 2: Send a Test Email

```bash
curl -X POST http://localhost:3000/api/send-license-code \
  -H "Content-Type: application/json" \
  -d '{
    "to": "test@example.com",
    "subject": "Test Email",
    "game": "Elden Ring",
    "price": 59.99,
    "licenseCode": "AUTO-TEST-1234-5678",
    "customMessage": "Thank you for your purchase!",
    "timestamp": "'$(date -u +'%Y-%m-%dT%H:%M:%SZ')'"
  }'
```

Expected response:
```json
{
  "success": true,
  "message": "License code sent successfully",
  "codeId": "code-123456789",
  "email": "test@example.com",
  "game": "Elden Ring",
  "sentAt": "2024-01-15T10:30:00Z"
}
```

### Test 3: Use Admin Panel

1. Open `admin.html` in your browser
2. Go to **Settings** tab → **Send License Code** section
3. Enter:
   - **Customer Email**: your-test-email@example.com
   - **Game**: Select a game from dropdown
   - **License Code**: Click "Generate" button (creates AUTO-XXXX-XXXX-XXXX)
   - **Message**: Optional custom message
4. Click **Send License Code**
5. Check the email address for the license code email

---

## Step 6: API Endpoints Reference

All endpoints expect JSON requests. The backend runs at `http://localhost:3000` by default.

### POST /api/send-license-code

**Send a license code via email**

Request:
```json
{
  "to": "customer@example.com",
  "subject": "Your License Code",
  "game": "Game Title",
  "price": 49.99,
  "licenseCode": "AUTO-XXXX-XXXX-XXXX",
  "customMessage": "Optional custom message",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

Response:
```json
{
  "success": true,
  "message": "License code sent successfully",
  "codeId": "unique-code-id",
  "email": "customer@example.com",
  "game": "Game Title",
  "sentAt": "2024-01-15T10:30:00Z"
}
```

### POST /api/verify-license-code

**Verify a license code and check remaining uses**

Request:
```json
{
  "code": "AUTO-XXXX-XXXX-XXXX",
  "email": "customer@example.com"
}
```

Response:
```json
{
  "valid": true,
  "game": "Game Title",
  "usedCount": 1,
  "remainingUses": 2,
  "status": "active"
}
```

### GET /api/license-codes

**Get all license codes (admin only)**

Response:
```json
[
  {
    "email": "customer@example.com",
    "game": "Game Title",
    "licenseCode": "AUTO-XXXX-XXXX-XXXX",
    "createdAt": "2024-01-15T10:30:00Z",
    "status": "active",
    "usageCount": 1
  }
]
```

### DELETE /api/license-codes/:codeId

**Revoke a license code**

Response:
```json
{
  "success": true,
  "message": "License code revoked"
}
```

### GET /api/health

**Check if email service is running**

Response:
```json
{"status":"operational"}
```

---

## Troubleshooting

### Email Not Sending

**Problem**: License codes fail to send
**Solution**:
1. Check `.env` file has correct email and password
2. Gmail users: Verify app password is from "App passwords" (not regular password)
3. Gmail users: Confirm 2FA is enabled
4. Check server is running: `curl http://localhost:3000/api/health`
5. Check server logs for error messages

### "Invalid login" Error

**Problem**: Authentication failed
**Solution**:
1. Gmail: App password has spaces but that's OK (spaces are ignored)
2. Gmail: Make sure you're using app password, NOT your Google account password
3. Custom SMTP: Verify username, password, host, and port

### "Connection Refused"

**Problem**: Can't connect to server
**Solution**:
1. Is the server running? (check terminal for `listening on port 3000`)
2. Is the PORT in `.env` correct?
3. Is port 3000 already in use? Change PORT in `.env`

### Certificate/TLS Issues

**Problem**: Email sends but with warnings about certificates
**Solution**: This is normal in development. For production, ensure SSL/TLS is properly configured.

---

## Production Deployment

### Before Deploying:

1. ✅ Test email sending in development
2. ✅ Replace `.env` values with production credentials
3. ✅ Set `NODE_ENV=production` in `.env`
4. ✅ Add authentication to API endpoints (see Security section below)
5. ✅ Use environment variables, never hardcode credentials
6. ✅ Set up database for persistent license code storage (MongoDB recommended)
7. ✅ Enable HTTPS on production server
8. ✅ Set up backups for license code database

### Environment Variables for Production:

```env
ADMIN_EMAIL=production-email@company.com
ADMIN_EMAIL_PASSWORD=production-app-password
PORT=3000
NODE_ENV=production
DATABASE_URL=mongodb+srv://...
JWT_SECRET=your-secret-key-here
```

### Suggested Deployment Platforms:

- **Heroku**: `git push heroku main` (free tier available)
- **AWS**: EC2 + RDS for database
- **DigitalOcean**: App Platform or Droplet
- **Railway**: Git-based deployment, simple setup
- **Replit**: Quick testing and demos

---

## Security Recommendations

### Enable API Authentication

Current implementation has no authentication. For production, add JWT or API keys:

```javascript
// Add to server-email.js
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.sendStatus(403);
        req.user = decoded;
        next();
    });
}

// Apply to routes
app.post('/api/send-license-code', authenticateToken, handleSendLicenseCode);
```

### Rate Limiting

Prevent spam:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Input Validation

Always validate email format:

```javascript
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

### Database Persistence

Replace in-memory `licenseCodeDatabase` with MongoDB:

```javascript
const mongoose = require('mongoose');

const licenseCodeSchema = new mongoose.Schema({
    email: String,
    game: String,
    licenseCode: String,
    createdAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'limited', 'revoked'], default: 'active' },
    usageCount: { type: Number, default: 0 }
});

const LicenseCode = mongoose.model('LicenseCode', licenseCodeSchema);
```

---

## Next Steps

1. ✅ **Complete**: Configure email credentials
2. ✅ **Complete**: Start the server
3. ✅ **Complete**: Test email sending
4. ⏳ **Recommended**: Set up database for persistent storage
5. ⏳ **Recommended**: Add authentication to API endpoints
6. ⏳ **Recommended**: Deploy to production

---

## Support

For issues or questions:
1. Check the **Troubleshooting** section above
2. Review server logs in the terminal
3. Test API endpoints with curl or Postman
4. Check that `.env` file exists and has correct values
5. Verify email account credentials are correct

---

## File Reference

- **server-email.js** - Main email service backend
- **admin.html** - Admin panel with email form
- **admin.js** - License code generation and form handling
- **.env** - Environment variables (create this file)
- **package.json** - Dependencies and scripts

---

**Last Updated**: January 2024
**Version**: 1.0
