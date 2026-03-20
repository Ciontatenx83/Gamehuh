// ========================================
// TARIQ SMILE GAME HUB - BACKEND SERVER
// Email & License Code Management
// ========================================

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static(path.join(__dirname)));

// ========================================
// EMAIL CONFIGURATION
// ========================================

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email service
    auth: {
        user: process.env.ADMIN_EMAIL || 'your-email@gmail.com',
        pass: process.env.ADMIN_EMAIL_PASSWORD || 'your-app-password' // Use app-specific password for Gmail
    }
});

// Test email configuration
transporter.verify((error, success) => {
    if (error) {
        console.log('❌ Email configuration error:', error);
    } else {
        console.log('✓ Email service is ready');
    }
});

// ========================================
// LICENSE CODE DATABASE (In-Memory)
// In production, use a real database like MongoDB
// ========================================

const licenseCodeDatabase = {
    codes: []
};

// ========================================
// API ENDPOINTS
// ========================================

/**
 * POST /api/send-license-code
 * Send license code to customer email
 */
app.post('/api/send-license-code', async (req, res) => {
    try {
        const { to, subject, game, price, licenseCode, customMessage, timestamp } = req.body;

        // Validation
        if (!to || !game || !licenseCode) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: to, game, licenseCode'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(to)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email address'
            });
        }

        // Store license code in database
        licenseCodeDatabase.codes.push({
            email: to,
            game: game,
            licenseCode: licenseCode,
            createdAt: new Date(timestamp),
            status: 'active',
            usageCount: 0
        });

        // Prepare email content
        const emailContent = generateEmailHTML(game, price, licenseCode, customMessage);

        // Send email
        const mailOptions = {
            from: `"Tariq Smile Game Hub" <${process.env.ADMIN_EMAIL}>`,
            to: to,
            subject: subject,
            html: emailContent,
            replyTo: process.env.ADMIN_EMAIL
        };

        await transporter.sendMail(mailOptions);

        // Log the transaction
        console.log(`✓ License code sent to ${to} for ${game}`);

        res.json({
            success: true,
            message: 'License code sent successfully',
            codeId: licenseCodeDatabase.codes.length - 1,
            email: to,
            game: game,
            sentAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error sending license code:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send license code',
            error: error.message
        });
    }
});

/**
 * POST /api/verify-license-code
 * Verify a license code for game activation
 */
app.post('/api/verify-license-code', (req, res) => {
    try {
        const { licenseCode, email } = req.body;

        if (!licenseCode || !email) {
            return res.status(400).json({
                success: false,
                message: 'License code and email are required'
            });
        }

        // Find license code
        const codeRecord = licenseCodeDatabase.codes.find(
            c => c.licenseCode === licenseCode && c.email === email && c.status === 'active'
        );

        if (!codeRecord) {
            return res.status(404).json({
                success: false,
                message: 'Invalid or expired license code'
            });
        }

        // Check if code has been used too many times
        if (codeRecord.usageCount >= 3) {
            return res.status(403).json({
                success: false,
                message: 'License code usage limit exceeded'
            });
        }

        // Increment usage count
        codeRecord.usageCount++;

        // Mark as used if limit reached
        if (codeRecord.usageCount >= 3) {
            codeRecord.status = 'limited';
        }

        res.json({
            success: true,
            message: 'License code verified',
            game: codeRecord.game,
            remainingUses: 3 - codeRecord.usageCount,
            verifiedAt: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error verifying license code:', error);
        res.status(500).json({
            success: false,
            message: 'Verification failed',
            error: error.message
        });
    }
});

/**
 * GET /api/license-codes
 * Get all license codes (admin only - add auth in production)
 */
app.get('/api/license-codes', (req, res) => {
    try {
        res.json({
            success: true,
            totalCodes: licenseCodeDatabase.codes.length,
            codes: licenseCodeDatabase.codes,
            generatedAt: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve license codes',
            error: error.message
        });
    }
});

/**
 * DELETE /api/license-codes/:codeId
 * Revoke a license code
 */
app.delete('/api/license-codes/:codeId', (req, res) => {
    try {
        const { codeId } = req.params;
        const index = parseInt(codeId);

        if (index < 0 || index >= licenseCodeDatabase.codes.length) {
            return res.status(404).json({
                success: false,
                message: 'License code not found'
            });
        }

        const revoked = licenseCodeDatabase.codes[index];
        licenseCodeDatabase.codes[index].status = 'revoked';

        res.json({
            success: true,
            message: 'License code revoked',
            revokedCode: revoked.licenseCode,
            revokedAt: new Date().toISOString()
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to revoke license code',
            error: error.message
        });
    }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
    res.json({
        status: 'online',
        service: 'Tariq Smile Game Hub Backend',
        timestamp: new Date().toISOString(),
        emailConfigured: !!process.env.ADMIN_EMAIL
    });
});

// ========================================
// SERVE FRONTEND
// ========================================

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// ========================================
// EMAIL TEMPLATE
// ========================================

function generateEmailHTML(game, price, licenseCode, customMessage = '') {
    const messageSection = customMessage ? `<p>${customMessage}</p>` : '';
    
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; }
                .email-container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 2rem; text-align: center; border-bottom: 3px solid #f59e0b; }
                .header h1 { margin: 0; font-size: 1.8rem; }
                .header p { margin: 0.5rem 0 0 0; opacity: 0.9; }
                .body { padding: 2rem; color: #333; }
                .game-info { background-color: #f9f9f9; padding: 1.5rem; border-left: 4px solid #f59e0b; margin: 1.5rem 0; border-radius: 4px; }
                .game-info h2 { margin: 0 0 0.5rem 0; color: #0d6efd; }
                .license-box { background-color: #0f172a; color: #f59e0b; padding: 1.5rem; border-radius: 8px; text-align: center; margin: 2rem 0; font-family: 'Courier New', monospace; }
                .license-box p { margin: 0.5rem 0; }
                .license-code { font-size: 1.3rem; font-weight: 700; letter-spacing: 2px; }
                .instructions { background-color: #e8f4f8; padding: 1rem; border-radius: 4px; margin: 1.5rem 0; }
                .footer { background-color: #f5f5f5; padding: 1.5rem; text-align: center; font-size: 0.9rem; color: #666; border-top: 1px solid #ddd; }
                .button { display: inline-block; background-color: #0d6efd; color: white; padding: 0.75rem 2rem; text-decoration: none; border-radius: 4px; margin: 1rem 0; }
                ul { padding-left: 1.5rem; }
                li { margin-bottom: 0.5rem; }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>🎮 Tariq Smile Game Hub</h1>
                    <p>Your Game License Activated</p>
                </div>

                <div class="body">
                    <p>Thank you for your purchase! Your game license is ready to activate.</p>

                    <div class="game-info">
                        <h2>${game}</h2>
                        <p><strong>Price:</strong> $${price || 'N/A'}</p>
                        <p><strong>License Status:</strong> <span style="color: #10b981;">✓ Active</span></p>
                    </div>

                    <h3 style="color: #0d6efd;">Your License Code:</h3>
                    <div class="license-box">
                        <p style="color: #94a3b8; margin: 0.25rem 0; font-size: 0.9rem;">LICENSE CODE</p>
                        <p class="license-code">${licenseCode}</p>
                        <p style="color: #94a3b8; margin: 0.25rem 0; font-size: 0.85rem;">Keep this code safe</p>
                    </div>

                    <div class="instructions">
                        <h4 style="margin-top: 0; color: #0d6efd;">How to activate your game:</h4>
                        <ol>
                            <li>Download your game from the provided link</li>
                            <li>Open the game launcher</li>
                            <li>Select "Activate License"</li>
                            <li>Enter your license code: <strong>${licenseCode}</strong></li>
                            <li>Click "Activate" and enjoy!</li>
                        </ol>
                    </div>

                    ${messageSection}

                    <p style="margin-top: 2rem; color: #666;">
                        <strong>Need help?</strong> Contact our support team at support@taraiqsmile.com
                    </p>
                </div>

                <div class="footer">
                    <p>&copy; 2024 Tariq Smile Game Hub. All rights reserved.</p>
                    <p>This is an automated message. Please do not reply directly.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}

// ========================================
// ERROR HANDLING
// ========================================

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error'
    });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════╗
║   🎮 TARIQ SMILE GAME HUB - BACKEND       ║
║   Server running on port ${PORT}              ║
║   http://localhost:${PORT}                  ║
╚════════════════════════════════════════════╝

📧 Email Service: ${process.env.ADMIN_EMAIL ? '✓ Configured' : '❌ Not Configured'}
💾 License Codes: ${licenseCodeDatabase.codes.length} active
⏰ Started at: ${new Date().toLocaleString()}
    `);
});

module.exports = app;
