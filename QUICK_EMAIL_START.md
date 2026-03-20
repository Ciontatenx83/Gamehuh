# Quick Start: Running the Email Service

## TL;DR - Get Running in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env` File

For **Gmail**:
```env
ADMIN_EMAIL=your-gmail@gmail.com
ADMIN_EMAIL_PASSWORD=aaaa bbbb cccc dddd
PORT=3000
NODE_ENV=development
```

> **Need app password?** Follow [these steps in EMAIL_SETUP.md](EMAIL_SETUP.md#option-a-gmail-configuration-recommended)

### 3. Start Server
```bash
npm run dev
```

### 4. Test It
- Open [admin.html](admin.html) in your browser
- Go to **Settings** tab
- Fill in the email form and send a test email

---

## What Gets Installed?

From `package.json`:
- `express` - Web framework
- `nodemailer` - Email sending  
- `cors` - Cross-origin support
- `dotenv` - Environment variables
- `nodemon` - Auto-reload (dev)

---

## Environment Variables Explained

| Variable | Example | Purpose |
|----------|---------|---------|
| `ADMIN_EMAIL` | `user@gmail.com` | Email account that sends codes |
| `ADMIN_EMAIL_PASSWORD` | `aaaa bbbb cccc dddd` | App password (Gmail) or password |
| `PORT` | `3000` | Server port |
| `NODE_ENV` | `development` | Set to `production` when deploying |

---

## Common Issues

**"Cannot find module 'express'"**
→ Run `npm install`

**"Invalid login"**
→ Check your `.env` file has correct email/password

**"Connection refused on :3000"**
→ Is server running? Open a new terminal, run `npm run dev`

**Email not sending**
→ Check server terminal for error messages

---

## Next Steps

- 📖 Read [EMAIL_SETUP.md](EMAIL_SETUP.md) for detailed configuration
- 🧪 Test endpoints with curl: `curl http://localhost:3000/api/health`
- 🚀 Ready to deploy? See [SECURITY_AND_DEPLOYMENT.md](SECURITY_AND_DEPLOYMENT.md)

---

**Questions?** Check [EMAIL_SETUP.md](EMAIL_SETUP.md) for comprehensive troubleshooting guide.
