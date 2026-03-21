# ⚡ Quick Start Guide - 5 Minutes

**For:** Developers who want to get Gamehuh running NOW

---

## One-Time Setup (5 min)

```bash
# 1. Install dependencies
npm install

# 2. Edit configuration
# Open .env.local and add your Stripe & SendGrid keys
# (Already created, just needs keys added)

cat .env.local  # View current config
```

---

## Running the Server (Every time)

```bash
# Option A: Simple start
npm start

# Option B: Auto-reload on changes (better for development)
npm run dev
```

**Wait for this message:**
```
✅ Route handlers loaded successfully
🎮 TARIQ SMILE GAME HUB - SERVER STARTED 🎮
🌐 Server running at: http://localhost:3000
```

---

## Testing Immediately

| What | URL | Login |
|------|-----|-------|
| **Browse Games** | http://localhost:3000 | None needed |
| **Admin Panel** | http://localhost:3000/admin | Click padlock icon |
| **Server Health** | http://localhost:3000/api/health | None needed |
| **Checkout** | http://localhost:3000/checkout | None needed |

---

## Project Structure (30 seconds)

```
Server Files:
  └─ server.js (main file)
  └─ routes/ (API endpoints)

Frontend:
  └─ index.html + script.js + styles.css (game store)
  └─ admin.html + admin.js + admin-styles.css (admin panel)
  └─ public/ (checkout, contact, subscription pages)

Config:
  └─ .env.local (YOUR API KEYS GO HERE!)
  └─ package.json (dependencies)

Docs:
  └─ COMPLETE_SETUP_AND_DEPLOYMENT.md (full guide)
  └─ PROJECT_ASSESSMENT_REPORT.md (detailed report)
```

---

## If Something Breaks

```bash
# Server won't start?
# 1. Check npm start output for errors
# 2. Kill any process on port 3000
lsof -ti:3000 | xargs kill -9

# 3. Check .env.local exists
ls -la .env.local

# 4. Clear npm cache and reinstall
npm cache clean --force && npm install

# Still broken? 
# 5. Check Node.js version (needs v14+)
node --version

# Games not showing?
# 1. Check browser console (F12)
# 2. Clear localStorage: localStorage.clear()
# 3. Try incognito mode

# Admin won't load?
# 1. Clear localStorage: localStorage.clear()
# 2. Check admin.js is loaded in DevTools Network tab
# 3. Check admin.html exists
```

---

## Next Steps

1. ✅ Run `npm install` (one time)
2. ✅ Add API keys to `.env.local` (required)
3. ✅ Run `npm start`
4. ✅ Visit http://localhost:3000
5. ✅ Read COMPLETE_SETUP_AND_DEPLOYMENT.md for details

---

## API Keys You Need

Get from:
- **Stripe:** https://dashboard.stripe.com/apikeys
- **SendGrid:** https://app.sendgrid.com/settings/api_keys

Add to `.env.local`:
```env
STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
SENDGRID_API_KEY=SG.your_key_here
```

---

**Questions?** See COMPLETE_SETUP_AND_DEPLOYMENT.md or contact ericmosha676@gmail.com
