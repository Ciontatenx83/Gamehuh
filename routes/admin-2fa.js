// routes/admin-2fa.js
// Two-Factor Authentication for Admin Access
// Uses Time-based One-Time Passwords (TOTP)

const express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const router = express.Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

// Store for active 2FA sessions (in production, use Redis or database)
const activeSessions = new Map();

// Admin email configuration
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@taruqsmile.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'; // Should be in .env

// ========================================
// GENERATE TIME-BASED 2FA CODE
// ========================================
function generateTOTPCode() {
  // Get current time window (changes every 30 seconds)
  const now = Date.now();
  const timeStep = 30000; // 30 seconds
  const timeCounter = Math.floor(now / timeStep);
  
  // Create HMAC-based code
  const secret = process.env.TOTP_SECRET || 'taruq-smile-game-hub-secret-key';
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(timeCounter.toString());
  
  // Generate 6-digit code
  const digest = hmac.digest('hex');
  const code = (parseInt(digest.substring(0, 8), 16) % 1000000)
    .toString()
    .padStart(6, '0');
  
  return code;
}

// ========================================
// VERIFY TOTP CODE (allows ±1 time window)
// ========================================
function verifyTOTPCode(code) {
  const secret = process.env.TOTP_SECRET || 'taruq-smile-game-hub-secret-key';
  const timeStep = 30000;
  const now = Date.now();
  
  // Check current time window and ±1 window
  for (let i = -1; i <= 1; i++) {
    const timeCounter = Math.floor(now / timeStep) + i;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(timeCounter.toString());
    
    const digest = hmac.digest('hex');
    const expectedCode = (parseInt(digest.substring(0, 8), 16) % 1000000)
      .toString()
      .padStart(6, '0');
    
    if (code === expectedCode) {
      return true;
    }
  }
  
  return false;
}

// ========================================
// REQUEST 2FA CODE
// ========================================
/**
 * POST /api/admin/request-2fa
 * Sends 2FA code to admin email
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 */
router.post('/api/admin/request-2fa', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Verify credentials (simple check - in production use bcrypt)
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate 2FA code
    const code = generateTOTPCode();
    const sessionId = crypto.randomBytes(16).toString('hex');
    const expiresAt = Date.now() + 5 * 60 * 1000; // Code valid for 5 minutes

    // Store session
    activeSessions.set(sessionId, {
      code,
      email,
      expiresAt,
      attempts: 0,
      verified: false
    });

    // Send email
    const mailOptions = {
      from: process.env.OWNER_EMAIL || 'noreply@taruqsmile.com',
      to: email,
      subject: '🔐 Your 2FA Code - Tariq Smile Admin Access',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">🔐 Two-Factor Authentication</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              Your admin access code is ready. This code <strong>expires in 5 minutes</strong>.
            </p>
            
            <div style="background: white; border: 2px solid #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
              <p style="color: #666; font-size: 14px; margin-bottom: 10px;">Enter this code:</p>
              <h1 style="color: #667eea; font-size: 48px; letter-spacing: 10px; margin: 0; font-family: 'Courier New', monospace;">
                ${code.split('').join('&nbsp;&nbsp;&nbsp;')}
              </h1>
            </div>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 10px;">
              ⏱️ <strong>Code expires in:</strong> 5 minutes
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              If you didn't request this code, please ignore this email. Your account is secure.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              Tariq Smile - Game Hub Admin Panel<br>
              ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: '2FA code sent to your email',
      sessionId,
      expiresIn: 300 // 5 minutes in seconds
    });

  } catch (error) {
    console.error('Error in request-2fa:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send 2FA code',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ========================================
// VERIFY 2FA CODE
// ========================================
/**
 * POST /api/admin/verify-2fa
 * Verifies the 2FA code and creates session
 * @param {string} sessionId - Session from request-2fa response
 * @param {string} code - 6-digit code from email
 */
router.post('/api/admin/verify-2fa', async (req, res) => {
  try {
    const { sessionId, code } = req.body;

    // Validate input
    if (!sessionId || !code) {
      return res.status(400).json({
        success: false,
        message: 'Session ID and code are required'
      });
    }

    // Get session
    const session = activeSessions.get(sessionId);

    if (!session) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired session. Please request a new code.'
      });
    }

    // Check if session expired
    if (Date.now() > session.expiresAt) {
      activeSessions.delete(sessionId);
      return res.status(400).json({
        success: false,
        message: 'Code expired. Please request a new code.'
      });
    }

    // Check attempts (max 5 attempts)
    if (session.attempts >= 5) {
      activeSessions.delete(sessionId);
      return res.status(429).json({
        success: false,
        message: 'Too many failed attempts. Please request a new code.'
      });
    }

    // Verify code (check both stored code and current TOTP)
    const isValid = code === session.code || verifyTOTPCode(code);

    if (!isValid) {
      session.attempts++;
      return res.status(401).json({
        success: false,
        message: 'Invalid code',
        attemptsRemaining: 5 - session.attempts
      });
    }

    // Code is valid - mark session as verified
    session.verified = true;
    const adminToken = crypto.randomBytes(32).toString('hex');
    const tokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Store admin token
    activeSessions.set(adminToken, {
      email: session.email,
      isAdmin: true,
      createdAt: Date.now(),
      expiresAt: tokenExpiresAt
    });

    // Delete old session
    activeSessions.delete(sessionId);

    res.status(200).json({
      success: true,
      message: '2FA verified successfully',
      adminToken,
      email: session.email,
      expiresIn: 24 * 60 * 60 // 24 hours in seconds
    });

  } catch (error) {
    console.error('Error in verify-2fa:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify code',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// ========================================
// VERIFY ADMIN TOKEN
// ========================================
/**
 * POST /api/admin/verify-token
 * Verifies if an admin token is valid
 */
router.post('/api/admin/verify-token', (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token is required'
      });
    }

    const session = activeSessions.get(token);

    if (!session || !session.isAdmin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      });
    }

    if (Date.now() > session.expiresAt) {
      activeSessions.delete(token);
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Token is valid',
      email: session.email,
      expiresAt: session.expiresAt
    });

  } catch (error) {
    console.error('Error in verify-token:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify token'
    });
  }
});

// ========================================
// LOGOUT (INVALIDATE TOKEN)
// ========================================
/**
 * POST /api/admin/logout
 * Invalidates admin token
 */
router.post('/api/admin/logout', (req, res) => {
  try {
    const { token } = req.body;

    if (token && activeSessions.has(token)) {
      activeSessions.delete(token);
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Error in logout:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to logout'
    });
  }
});

module.exports = router;
