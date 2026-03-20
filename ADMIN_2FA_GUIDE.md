# Admin 2FA Authentication & Game Management Guide

## Overview

This guide explains the complete **Two-Factor Authentication (2FA)** system for admin access and the **game management** features in the Tariq Smile Game Hub.

---

## 🔐 2FA System Features

### What is 2FA?
Two-Factor Authentication provides an additional security layer:
1. **First Factor**: Admin email & password verification
2. **Second Factor**: Time-based 6-digit code sent to email (TOTP - Time-based One-Time Password)

### How It Works

1. **Admin requests access** → Enters email + password
2. **Server validates** → Checks credentials
3. **Code generation** → Creates time-based 6-digit code
4. **Email sent** → Code delivered to admin email
5. **Admin enters code** → Verifies code from email
6. **Session created** → Admin token granted for 24 hours
7. **Access granted** → Admin dashboard opens

---

## ⚙️ Environment Configuration

### Required Environment Variables

Create a `.env` file in the root directory with:

```bash
# Email Configuration (SendGrid)
SENDGRID_API_KEY=your_sendgrid_api_key_here
OWNER_EMAIL=your-email@example.com

# Admin Credentials
ADMIN_EMAIL=admin@taruqsmile.com
ADMIN_PASSWORD=your_secure_password_here

# 2FA Secret
TOTP_SECRET=taruq-smile-game-hub-secret-key

# Server Configuration
NODE_ENV=production
PORT=3000
```

### Setting Up SendGrid

1. Go to [SendGrid](https://sendgrid.com)
2. Create an account and log in
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the key and add to `.env` as `SENDGRID_API_KEY`

---

## 📋 Accessing Admin Panel

### Step 1: Navigate to Admin Login
```
https://yourdomain.com/admin-login
```

### Step 2: Enter Credentials
- **Email**: Your registered admin email
- **Password**: Your admin password

### Step 3: Receive 2FA Code
- Check your email for a code
- Code is valid for **5 minutes**
- Code changes every 30 seconds (time-based)

### Step 4: Enter Code
- Enter the 6-digit code from your email
- You have **5 attempts** before the session expires
- Code works for ±1 time window (allows 2-3 minutes of flexibility)

### Step 5: Access Dashboard
- Successfully authenticated
- Admin token stored locally (24-hour validity)
- Full access to admin features

---

## 🎮 Game Management Features

### Adding Games

1. **Navigate** to "Add New Game" tab in admin dashboard
2. **Fill in required fields**:
   - **Game Title**: Name of the game
   - **Developer**: Game developer/studio
   - **Genre**: Select from dropdown (Action, Adventure, RPG, etc.)
   - **Price**: Game price in USD
   - **Rating**: Game rating (0-5 stars)
   - **Description**: Detailed game description
   - **Image URL**: Link to game cover image
   - **Download Link**: Link to download/purchase game
   - **Release Date**: When game was released

3. **Submit** the form
4. **Confirmation** message appears
5. **Game added** to catalog and visible on main store

### Managing Games

#### View Games
- Go to "Manage Games" tab
- See all games in table format
- Shows: Title, Genre, Price, Rating

#### Edit Games
1. Click **Edit button** (pencil icon)
2. Modal opens with current game data
3. **Modify** any field
4. Click **Save Changes**
5. Game updated immediately

#### Delete Games
1. Click **Delete button** (trash icon)
2. **Confirm** deletion
3. Game removed from catalog

### Game Statistics

View analytics:
- **Total Games**: Number of games in catalog
- **Average Price**: Mean game price
- **Average Rating**: Mean game rating
- **Total Genres**: Number of unique genres
- **Games by Genre**: Breakdown by category with progress bars

---

## 🔑 API Endpoints

### 2FA Routes

#### Request 2FA Code
```
POST /api/admin/request-2fa
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "2FA code sent to your email",
  "sessionId": "...",
  "expiresIn": 300
}
```

#### Verify 2FA Code
```
POST /api/admin/verify-2fa
Content-Type: application/json

{
  "sessionId": "...",
  "code": "123456"
}

Response:
{
  "success": true,
  "message": "2FA verified successfully",
  "adminToken": "...",
  "email": "admin@example.com",
  "expiresIn": 86400
}
```

#### Verify Token
```
POST /api/admin/verify-token
Content-Type: application/json

{
  "token": "..."
}

Response:
{
  "success": true,
  "message": "Token is valid",
  "email": "admin@example.com",
  "expiresAt": 1234567890
}
```

#### Logout
```
POST /api/admin/logout
Content-Type: application/json

{
  "token": "..."
}

Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🛡️ Security Features

### Code Security
- ✅ HMAC-SHA256 based TOTP generation
- ✅ 6-digit codes with 1,000,000 possible combinations
- ✅ Time-window based (±1 window = valid for ~2-3 minutes)
- ✅ Codes change every 30 seconds
- ✅ Cannot reuse previous codes

### Session Security
- ✅ Sessions expire after 5 minutes if code not verified
- ✅ Maximum 5 failed attempts per session
- ✅ Admin tokens valid for 24 hours
- ✅ Tokens stored in browser localStorage
- ✅ Email verification required for all access

### Password Security
- ✅ HTTPS required in production
- ✅ Credentials validated on server
- ✅ Sensitive data sent via encrypted channels
- ✅ Never stored in browser

---

## 🔄 Token Management

### Token Storage
- Stored in browser **localStorage**
- Key: `adminToken`
- Valid for **24 hours**

### Token Usage
- Automatically sent with admin requests
- Verified before dashboard access
- Required for game management operations

### Token Expiry
- Automatically removed after 24 hours
- Can be manually cleared via logout
- Expired tokens redirect to login page

---

## ⏱️ Time-Based Code Details

### How TOTP Works

The 2FA codes are **time-based**:
- New code generated every **30 seconds**
- Based on current server time
- Same code valid for ~30 seconds

### Code Validity Window

The system accepts:
- Current time code ✅
- Previous 30-sec code (within 1 minute) ✅
- Next 30-sec code (within 1 minute) ✅

This provides a **±30 second buffer** for network delays and user input speed.

### Example Timeline
```
23:59:30 - Code A generated (valid until 00:00:00)
24:00:00 - Code B generated (Code A still valid)
00:00:30 - Code C generated (Code B now most valid)
00:01:00 - Code D generated (only Code C & D valid)
```

---

## 🚀 Deployment Checklist

Before going to production:

- [ ] Set `NODE_ENV=production` in .env
- [ ] Configure SendGrid API key
- [ ] Set strong `ADMIN_PASSWORD`
- [ ] Generate random `TOTP_SECRET`
- [ ] Use HTTPS/SSL certificate
- [ ] Test 2FA login flow
- [ ] Test game addition
- [ ] Test game editing
- [ ] Test game deletion
- [ ] Verify email delivery
- [ ] Test logout functionality
- [ ] Test token expiry
- [ ] Backup game data

---

## 🆘 Troubleshooting

### Email Not Received
1. Check `SENDGRID_API_KEY` is correct
2. Verify `OWNER_EMAIL` in .env
3. Check spam folder
4. Ensure email quotes allow external senders
5. Test SendGrid connection

### Code Expired
- Generate new code and request fresh
- Codes valid for 5 minutes
- Time synchronization important

### Login Loop
- Clear browser cache/localStorage
- Check `ADMIN_EMAIL` and `ADMIN_PASSWORD` match credentials
- Verify server is running
- Check network connectivity

### Games Not Saving
- Verify games.js is loaded
- Check localStorage availability
- Ensure forms validate correctly
- Check browser console for errors

### Buttons Not Working
- Verify Bootstrap is loaded
- Check JavaScript console for errors
- Ensure event listeners attached
- Test in different browser

---

## 📝 Files Overview

| File | Purpose |
|------|---------|
| `admin-login.html` | 2FA authentication interface |
| `admin.html` | Admin dashboard with game management |
| `admin.js` | Dashboard logic & token verification |
| `routes/admin-2fa.js` | Backend 2FA endpoints |
| `server-complete.example.js` | Server setup with 2FA routes |

---

## 🔄 Update Existing Server

If you have an existing `server.js`:

```javascript
// Add this import
const admin2faRoutes = require('./routes/admin-2fa');

// Register route
app.use(admin2faRoutes);

// Add admin routes
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});
```

---

## 💡 Best Practices

### For Admins
1. ✅ Use strong, unique passwords
2. ✅ Keep email account secure
3. ✅ Logout when done
4. ✅ Check for security warnings
5. ✅ Verify email address in confirmation

### For Developers
1. ✅ Never hardcode credentials
2. ✅ Always use environment variables
3. ✅ Enable HTTPS in production
4. ✅ Rotate TOTP_SECRET periodically
5. ✅ Monitor admin access logs
6. ✅ Use strong password requirements

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review browser console for errors
3. Verify .env configuration
4. Test API endpoints with Postman
5. Review server logs

---

**Last Updated**: March 2026
**Version**: 1.0
