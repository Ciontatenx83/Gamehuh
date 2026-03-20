# Email Integration Checklist

Use this checklist to verify your email service is properly configured and working.

---

## Pre-Setup Checklist

- [ ] Node.js 14+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Have email account credentials ready (Gmail app password or SMTP credentials)
- [ ] Workspace files extracted to `/workspaces/Gamehuh`

---

## Setup Checklist

### Installation

- [ ] Navigate to workspace: `cd /workspaces/Gamehuh`
- [ ] Install dependencies: `npm install`
- [ ] Verify `node_modules` folder created
- [ ] Verify no error messages during install

### Configuration

- [ ] Created `.env` file in root directory
- [ ] `.env` contains `ADMIN_EMAIL`
- [ ] `.env` contains `ADMIN_EMAIL_PASSWORD` (Gmail app password or SMTP password)
- [ ] `.env` contains `PORT=3000`
- [ ] `.env` contains `NODE_ENV=development`
- [ ] Verified `.env` is NOT committed to git (check `.gitignore`)

### Server Startup

- [ ] Started server with `npm run dev` or `npm start`
- [ ] See message: `Email service running on port 3000`
- [ ] No error messages in terminal
- [ ] Server is listening and responding

---

## Functionality Checklist

### Health Check

- [ ] Run: `curl http://localhost:3000/api/health`
- [ ] Response shows: `{"status":"operational"}`
- [ ] Server is responding to requests

### Frontend Form

- [ ] Open `admin.html` in browser
- [ ] Navigate to **Settings** tab
- [ ] See section titled "Send License Code"
- [ ] Form has these fields:
  - [ ] "Customer Email" input field
  - [ ] "Game" dropdown selector
  - [ ] "License Code" input with "Generate" button
  - [ ] "Custom Message" text area
  - [ ] "Send License Code" button

### License Code Generation

- [ ] Click "Generate" button in License Code field
- [ ] A code appears in format: `AUTO-XXXX-XXXX-XXXX`
- [ ] Each click generates a different code
- [ ] See notification: "✓ License code generated!"

### Email Sending (Test)

- [ ] Fill in "Customer Email" with a valid test email (your own email)
- [ ] Select a game from the "Game" dropdown
- [ ] Click "Generate" button to create a license code
- [ ] Optionally add a message in "Custom Message"
- [ ] Click "Send License Code" button
- [ ] See notification indicating success/error
- [ ] Check email inbox for the license code email (wait 1-2 minutes)
- [ ] Email contains:
  - [ ] Game title and price
  - [ ] Large, clearly visible license code
  - [ ] 5-step activation instructions
  - [ ] Professional formatting with logo
  - [ ] Your custom message (if provided)

### Email Verification

- [ ] Email from address is correct (from your configured email)
- [ ] Email subject contains game name
- [ ] Email opens properly in mail client
- [ ] License code is clearly displayed
- [ ] Instructions are clear and actionable

---

## API Testing Checklist

### Test POST /api/send-license-code

- [ ] Run test curl command (see EMAIL_SETUP.md)
- [ ] Response status is 200 OK
- [ ] Response includes `"success": true`
- [ ] Response includes `"codeId"` (unique identifier)
- [ ] Response includes `"sentAt"` (timestamp)

### Test GET /api/license-codes

- [ ] Run: `curl http://localhost:3000/api/license-codes`
- [ ] Response is JSON array
- [ ] Each code object includes: email, game, licenseCode, createdAt, status, usageCount

### Test POST /api/verify-license-code

- [ ] Run verification with valid code and email
- [ ] Response shows `"valid": true`
- [ ] Response shows usage count and remaining uses
- [ ] Run verification with invalid code
- [ ] Response shows `"valid": false`

---

## Production Readiness Checklist

- [ ] Email sending works reliably in development
- [ ] All test emails arrive within 2 minutes
- [ ] No credentials hardcoded in source files
- [ ] All credentials in `.env` file (not in git)
- [ ] Tested with multiple games
- [ ] Tested with multiple email addresses
- [ ] Verified email format and HTML rendering
- [ ] Considered rate limiting for production
- [ ] Considered authentication for API endpoints
- [ ] Considered database persistence for codes
- [ ] Have backup plan for email service failure

---

## Troubleshooting Reference

| Issue | Check | Solution |
|-------|-------|----------|
| Server won't start | Does `.env` exist? | Create `.env` with required vars |
| "Cannot find module" | Dependencies installed? | Run `npm install` |
| "Invalid login" | Credentials correct? | Verify email & app password in `.env` |
| Email not sending | Error in terminal? | Check error message, see EMAIL_SETUP.md |
| Connection refused | Is server running? | Run `npm run dev` in terminal |
| Form not responsive | Browser cached? | Hard refresh (Ctrl+Shift+R) |
| License code not generating | Console errors? | Open DevTools (F12), check JS errors |

---

## Sign-Off

When all checkboxes are complete, you have a fully functional email system!

**Completed Date**: _______________

**Tested By**: _______________

**Next Steps**:
1. Review SECURITY_AND_DEPLOYMENT.md for production guidance
2. Set up database persistence if needed
3. Plan deployment to production server

---

**Reference Files**:
- **EMAIL_SETUP.md** - Detailed configuration guide
- **QUICK_EMAIL_START.md** - Fast 5-minute setup
- **server-email.js** - Backend implementation
- **admin.html** - Admin panel with email form
- **admin.js** - Client-side form handling

---

**Last Updated**: January 2024  
**Version**: 1.0
