# 2FA System - Visual Guide & Architecture

## 🔄 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN LOGIN PROCESS                       │
└─────────────────────────────────────────────────────────────┘

1. REQUEST STAGE
   ┌─────────────────────────────┐
   │  Admin Login Page            │
   │  ┌─────────────────────────┐ │
   │  │ Email: [_____________]  │ │
   │  │ Password: [___________] │ │
   │  │ [Send 2FA Code] Button  │ │
   │  └─────────────────────────┘ │
   └─────────────────────────────┘
              ↓
   ┌─────────────────────────────┐
   │ POST /api/admin/request-2fa │
   │ ├─ Validate credentials     │
   │ ├─ Generate TOTP code       │
   │ ├─ Create session (5 min)   │
   │ └─ Send email               │
   └─────────────────────────────┘
              ↓
   📧 Email with Code Sent


2. VERIFICATION STAGE
   ┌─────────────────────────────┐
   │  2FA Code Entry Page        │
   │  ┌─────────────────────────┐ │  Expires in: 5:00
   │  │ [_] [_] [_] [_] [_] [_] │ │  Attempts: 5/5
   │  │ [Verify Code] Button    │ │
   │  │ [Back] Button           │ │
   │  └─────────────────────────┘ │
   └─────────────────────────────┘
              ↓
   ┌─────────────────────────────┐
   │ POST /api/admin/verify-2fa  │
   │ ├─ Verify TOTP code         │
   │ ├─ Check time window        │
   │ ├─ Create admin token       │
   │ └─ Return token (24 hr)     │
   └─────────────────────────────┘
              ↓
   💾 Token saved to localStorage


3. SUCCESS STAGE
   ┌─────────────────────────────┐
   │  Successfully Authenticated │
   │  ✅ Admin Login Complete    │
   │  🔄 Redirecting...          │
   └─────────────────────────────┘
              ↓
   ┌─────────────────────────────┐
   │  Admin Dashboard            │
   │  ✅ Full Access Granted     │
   │  ├─ Add Games               │
   │ ├─ Manage Games             │
   │  ├─ View Statistics         │
   │  └─ Settings & Export       │
   └─────────────────────────────┘
```

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                        CLIENT SIDE                            │
├──────────────────────────────────────────────────────────────┤
│
│  admin-login.html                    admin.html
│  ├─ Stage 1: Credentials            ├─ Navbar (email + logout)
│  ├─ Stage 2: Code input             ├─ Add Game Tab
│  └─ Stage 3: Success                ├─ Manage Games Tab
│                                      ├─ Statistics Tab
│  admin.js                            └─ Settings Tab
│  ├─ Token verification on load
│  ├─ Form submission handlers
│  └─ Logout functionality
│
└──────────────────────────────────────────────────────────────┘
                         ↕ API Calls
                    HTTPS / REST JSON
                         ↕
┌──────────────────────────────────────────────────────────────┐
│                      SERVER SIDE                              │
├──────────────────────────────────────────────────────────────┤
│
│  routes/admin-2fa.js
│  ├─ POST /api/admin/request-2fa
│  │  ├─ Validate credentials
│  │  ├─ Generate TOTP code
│  │  ├─ Create session
│  │  └─ Send email via SendGrid
│  │
│  ├─ POST /api/admin/verify-2fa
│  │  ├─ Verify TOTP code
│  │  ├─ Validate time window
│  │  └─ Create admin token
│  │
│  ├─ POST /api/admin/verify-token
│  │  ├─ Check token validity
│  │  └─ Return user info
│  │
│  └─ POST /api/admin/logout
│     └─ Invalidate token
│
│  activeSessions Map (In-memory storage)
│  ├─ sessionId → {code, email, expiresAt, attempts}
│  └─ adminToken → {email, isAdmin, expiresAt}
│
└──────────────────────────────────────────────────────────────┘
                         ↕
                    SendGrid Email API
                         ↓
                      📧 User Email
```

---

## 📊 Data Flow - Add Game Example

```
1. User enters game details
   ↓
   admin.html form inputs
   ├─ Game name: "Cyber Quest"
   ├─ Developer: "Tech Studios"
   ├─ Genre: "action"
   ├─ Price: 49.99
   └─ ... other fields

2. User clicks "Add Game"
   ↓
   admin.js::handleAddGame()
   ├─ Collect form data
   ├─ Validate all fields
   └─ Call addGame() from script.js

3. Game added to database
   ↓
   script.js::addGame()
   ├─ Create unique ID
   ├─ Add to games array
   └─ Save to localStorage

4. UI Updated
   ↓
   admin.js::handleAddGame()
   ├─ Clear form
   ├─ Show success notification
   └─ Game appears in manage games

5. User sees on store
   ↓
   index.html loads games
   └─ New game displayed with others
```

---

## 🔒 Security Layers

```
Layer 1: INPUT VALIDATION
         ├─ Email format check
         ├─ Password length check
         ├─ 6-digit code validation
         └─ Attempt limiting (5 max)

Layer 2: CRYPTOGRAPHIC VERIFICATION
         ├─ HMAC-SHA256 based TOTP
         ├─ Time-window validation (±1 window)
         ├─ Code freshness checks
         └─ Session expiry enforcement

Layer 3: SESSION MANAGEMENT
         ├─ Session ID generation (16 bytes)
         ├─ Token generation (32 bytes)
         ├─ Expiry enforcement (5min + 24hr)
         └─ Token revocation (logout)

Layer 4: EMAIL VERIFICATION
         ├─ SendGrid authentication
         ├─ Email delivery confirmation
         ├─ Code in secure template
         └─ One-time code usage
```

---

## 📱 Game Management Interface

```
ADMIN DASHBOARD
┌──────────────────────────────────────────────────────┐
│ Sidebar                          Main Content         │
├──────────────────────┬───────────────────────────────┤
│ ✅ Add New Game      │ 📝 Add New Game              │
│                      │ ┌─────────────────────────┐  │
│ Manage Games         │ │ Game Title: [______]    │  │
│                      │ │ Developer: [________]   │  │
│ Game Statistics      │ │ Genre: [Action ▼]      │  │
│                      │ │ Price: [49.99]         │  │
│ Settings             │ │ Rating: [4.5]          │  │
│                      │ │ Description: [______]  │  │
│                      │ │ Image URL: [______]    │  │
│                      │ │ Download: [______]     │  │
│                      │ │ [Add Game] [Clear]     │  │
│                      │ └─────────────────────────┘  │
└──────────────────────┴───────────────────────────────┘

TAB: MANAGE GAMES
┌──────────────────────────────────────────────────────┐
│ Title         │ Genre    │ Price  │ Rating │ Actions│
├───────────────┼──────────┼────────┼────────┼────────┤
│ Game 1        │ Action   │ $29.99 │ ★★★★☆ │ [Edit] │
│ Game 2        │ RPG      │ $39.99 │ ★★★★★ │[Delete]│
│ Game 3        │ Adventure│ $24.99 │ ★★★☆☆ │ [Edit] │
└──────────────────────────────────────────────────────┘

TAB: STATISTICS
┌──────────────────────────────────────────────────────┐
│ [🎮 Total: 25] [💰 Avg: $34.99] [⭐ Avg: 4.2]      │
│ [🏷️ Genres: 7]                                     │
│                                                      │
│ Games by Genre:                                      │
│ Action    [████████░░░░░] 5 games (20%)             │
│ RPG       [███████░░░░░░] 4 games (16%)             │
│ Adventure [██████░░░░░░░░] 3 games (12%)            │
└──────────────────────────────────────────────────────┘

TAB: SETTINGS
┌──────────────────────────────────────────────────────┐
│ Data Management                                      │
│ [⬇️ Export Games] [⬆️ Import Games]                 │
│                                                      │
│ Reset Options                                        │
│ [⟳ Reset to Default Games]                         │
│ ⚠️ Warning: Custom games will be lost              │
└──────────────────────────────────────────────────────┘
```

---

## ⏰ Time-Based Code Generation

```
Time Window 1 (00:00 - 00:30)
├─ Time counter: 1
├─ HMAC-SHA256(secret, "1") 
├─ Result: a7f3d2b...
├─ 6-digit code: 823456
└─ Display: 823456

Time Window 2 (00:30 - 01:00)     [±1 WINDOW]
├─ Time counter: 2               Valid codes:
├─ HMAC-SHA256(secret, "2")       - 823456 (window 1)
├─ Result: c9e2f1b...           - 456789 (window 2) ✅
├─ 6-digit code: 456789           - 234512 (window 3)
└─ Display: 456789

Time Window 3 (01:00 - 01:30)
├─ Time counter: 3
├─ HMAC-SHA256(secret, "3")
├─ Result: e4b8a9c...
├─ 6-digit code: 234512
└─ Display: 234512


Example Timeline:
00:00 ──────────┬──────────┬──────────→ time
Code: 823456    Code: 456789    Code: 234512
      ↑valid    ↑valid only in   ↑valid
      for ~30sec middle window
```

---

## 📈 Database Schema (localStorage)

```javascript
// Games Storage
{
  "games": [
    {
      "id": 1,
      "name": "Cyber Quest",
      "developer": "Tech Studios",
      "genre": "action",
      "price": 49.99,
      "rating": 4.5,
      "description": "An epic sci-fi adventure...",
      "image": "https://...",
      "downloadLink": "https://...",
      "releaseDate": "2024-01-15"
    }
  ]
}

// Admin Token Storage
{
  "adminToken": "a1b2c3d4e5f6g7h8..."
}

// Active Sessions (Server-side in-memory)
{
  "sessionId_xyz": {
    "code": "123456",
    "email": "admin@example.com",
    "expiresAt": 1711000000000,
    "attempts": 0,
    "verified": false
  },
  
  "adminToken_abc": {
    "email": "admin@example.com",
    "isAdmin": true,
    "createdAt": 1710900000000,
    "expiresAt": 1711000000000
  }
}
```

---

## 🚦 State Transitions

```
┌─────────────────────────────────────────────────┐
│         LOGIN STATE MACHINE                     │
└─────────────────────────────────────────────────┘

[Initial State]
    ↓
[No Token] ─────→ Redirect to /admin-login
    ↓
[Stage 1: Credentials]
    │
    ├─ Invalid ──→ Show error ──→ [Stage 1]
    │
    ├─ Valid ──→ Send code ──→ [Stage 2]
    │
    └─ Error ──→ Show error ──→ [Stage 1]

[Stage 2: Code Verification]
    │
    ├─ Invalid code ──→ Decrement attempts
    │   ↓
    │   └─ Attempts > 0 ──→ Show error ──→ [Stage 2]
    │   └─ Attempts = 0 ──→ Lock session ──→ [Stage 1]
    │
    ├─ Expired ──→ Session timeout ──→ [Stage 1]
    │
    ├─ Valid ──→ Create token ──→ [Stage 3]
    │
    └─ Valid (window ±1) ──→ Create token ──→ [Stage 3]

[Stage 3: Success]
    │
    ├─ Store token ──→ [Admin Dashboard]
    │
    └─ Redirect ──→ /admin.html

[Admin Dashboard]
    │
    ├─ Token valid ──→ Show dashboard
    │
    ├─ Token expired ──→ Remove token ──→ [No Token]
    │
    └─ Logout clicked ──→ Invalidate token ──→ [No Token]
```

---

## 🔔 Error Handling Flow

```
User Action
    ↓
Try: Execute operation
    │
    ├─ Success ──→ ✅ Show success message
    │                Proceed to next stage
    │
    └─ Error:
        ├─ Invalid credentials
        │  └─→ ❌ "Invalid email or password"
        │
        ├─ Expired session
        │  └─→ ❌ "Code expired. Request new code."
        │
        ├─ Invalid code
        │  └─→ ❌ "Invalid code" + attempts remaining
        │
        ├─ Max attempts
        │  └─→ ❌ "Too many attempts. Request new code."
        │
        ├─ Network error
        │  └─→ ❌ "Network error. Please try again."
        │
        └─ Server error
           └─→ ❌ "Server error. Contact support."
```

---

## 📊 Session Timeline

```
User Initiates Login
↓
T+0:00 → Admin requests code
         Session created: expires at T+5:00
         Email sent with code
         Code valid for: T+0:00 to T+1:00 (exact window)
                        T+0:30 to T+1:30 (±1 window)

T+1:30 → Code expires for verification
         Previous code no longer works
         New code now being generated every 30 seconds

T+4:00 → Admin enters new code
         Code is valid (different time window)
         Verification succeeds
         Admin token created: expires at T+4:00 + 24hr

T+5:00 → Session expires (no longer used)
         Email code invalid

T+28:00 → User still has valid admin token
          Dashboard still accessible
          No additional auth needed

T+4:00+24hr → Admin token expires
             Auto-logout triggered
             Returned to login page
```

---

## 💻 Environment Setup Checklist

```
✅ Node.js installed
✅ npm dependencies installed
   └─ express, nodemailer, etc.

✅ .env file created with:
   ├─ SENDGRID_API_KEY
   ├─ OWNER_EMAIL
   ├─ ADMIN_EMAIL
   ├─ ADMIN_PASSWORD
   └─ TOTP_SECRET

✅ SendGrid API key obtained
   └─ From https://sendgrid.com

✅ All files created:
   ├─ routes/admin-2fa.js
   ├─ admin-login.html
   ├─ admin.html (updated)
   ├─ admin.js (updated)
   └─ server-complete.example.js (updated)

✅ Server routes registered
   └─ /api/admin/* endpoints
   └─ /admin-login, /admin routes

✅ Testing completed
   ├─ Login flow
   ├─ Code verification
   ├─ Game management
   └─ Logout functionality
```

---

## 🎯 Quick Reference

| Element | Purpose | Duration |
|---------|---------|----------|
| **Session** | Code verification window | 5 minutes |
| **Code** | TOTP verification code | ±1 time window (~2-3 min) |
| **Attempt** | Failed code entry | 5 max attempts |
| **Token** | Admin access credential | 24 hours |
| **Window** | TOTP generation period | 30 seconds |

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/admin/request-2fa` | POST | Request auth code |
| `/api/admin/verify-2fa` | POST | Verify code |
| `/api/admin/verify-token` | POST | Check token |
| `/api/admin/logout` | POST | Invalidate session |

---

*Last Updated: March 2026*
