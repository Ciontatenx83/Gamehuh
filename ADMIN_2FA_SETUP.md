# 2FA Admin Setup - Quick Start

## 🚀 Quick Setup (5 minutes)

### Step 1: Copy Files
Ensure these files are created:
- ✅ `admin-login.html` - Login page
- ✅ `admin.html` - Admin dashboard (update existing)
- ✅ `admin.js` - Dashboard logic (update existing)
- ✅ `routes/admin-2fa.js` - Backend routes

### Step 2: Update Server
Update your `server.js`:

```javascript
// Add import
const admin2faRoutes = require('./routes/admin-2fa');

// Add route
app.use(admin2faRoutes);

// Add routes
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});
```

### Step 3: Configure Environment
Create/update `.env` file:

```bash
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxx
OWNER_EMAIL=your-email@gmail.com
ADMIN_EMAIL=admin@taruqsmile.com
ADMIN_PASSWORD=YourSecurePassword123!
TOTP_SECRET=taruq-smile-game-hub-secret-key
```

### Step 4: Test
1. Start server: `npm start`
2. Go to: `http://localhost:3000/admin-login`
3. Enter credentials:
   - Email: `admin@taruqsmile.com`
   - Password: `YourSecurePassword123!`
4. Check email for 6-digit code
5. Enter code and access dashboard

---

## 🔑 Getting SendGrid API Key

1. Visit [SendGrid](https://sendgrid.com)
2. Sign up or login
3. Go to **Settings** → **API Keys**
4. Click **Create API Key**
5. Give it a name (e.g., "GameHub Admin")
6. Copy the key
7. Paste in `.env` as `SENDGRID_API_KEY`

---

## 🆔 Default Credentials

```
Email: admin@taruqsmile.com
Password: YourSecurePassword123!
```

Change these in `.env` after first login!

---

## ✨ Features Included

✅ **Email-based 2FA**
- Time-based 6-digit codes
- Sent to admin email
- Expires in 5 minutes
- Code changes every 30 seconds

✅ **Secure Session**
- Admin token valid for 24 hours
- Stored in browser localStorage
- Verified on each page load
- Auto-logout on expiry

✅ **Game Management**
- Add new games
- Edit existing games
- Delete games
- View statistics
- Import/Export data

✅ **Admin Dashboard**
- Add games with all details
- Manage game catalog
- View game statistics by genre
- Import/Export games as JSON
- Reset to default games

---

## 📱 Mobile Friendly

✅ Responsive design works on:
- Desktop browsers
- Tablets
- Mobile phones
- All modern browsers

---

## 🔒 Security Details

- HMAC-SHA256 based TOTP
- 6-digit codes (1 million combinations)
- Invalid attempt limit (5 attempts)
- Session expiry (5 minutes)
- Email verification required
- HTTPS recommended for production

---

## 🐛 Common Issues

### Email Not Arriving
- [ ] Check SendGrid API key is correct
- [ ] Check OWNER_EMAIL is correct
- [ ] Check spam folder
- [ ] Verify email settings allow external senders

### Code Invalid
- [ ] Code only valid for ~1-3 minutes
- [ ] Server time must be synchronized
- [ ] Try the previous or next code
- [ ] Request new code if expired

### Login Loop
- [ ] Clear browser cache
- [ ] Check credentials in .env
- [ ] Restart server
- [ ] Check server console for errors

---

## 📚 Full Documentation

See `ADMIN_2FA_GUIDE.md` for complete documentation

---

**Setup Time**: ~5 minutes
**Required Services**: SendGrid (free tier available)
