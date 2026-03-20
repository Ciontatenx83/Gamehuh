// routes/contact-email.js
const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Configure email transporter (using SendGrid)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

/**
 * POST /api/send-contact-email
 * Sends user's contact form message directly to owner's email
 * @param {string} name - Sender's name
 * @param {string} email - Sender's email
 * @param {string} subject - Message subject
 * @param {string} message - Message content
 */
router.post('/api/send-contact-email', async (req, res) => {
  try {
    const { name, email, subject, message, timestamp } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Prepare email to owner
    const ownerMailOptions = {
      from: process.env.OWNER_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: `📧 New Contact Form Submission: ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #000; margin: 0;">New Contact Form Message</h2>
          </div>
          
          <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Date:</strong> ${new Date(timestamp).toLocaleString()}</p>
            
            <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
            
            <div style="background: white; padding: 15px; border-left: 4px solid #ffd700; border-radius: 4px;">
              <p style="white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(message)}</p>
            </div>
            
            <hr style="border: none; border-top: 2px solid #ddd; margin: 20px 0;">
            
            <p style="color: #999; font-size: 12px;">
              Reply directly to this email to respond to the sender.
            </p>
          </div>
        </div>
      `,
    };

    // Prepare auto-reply email to user
    const autoReplyMailOptions = {
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: 'Thank you for contacting Tariq Smile Game Hub',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea, #764ba2); padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
            <h2 style="color: white; margin: 0;">Thank You!</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
            <p>Hi ${name},</p>
            
            <p>Thank you for reaching out to us! We've received your message and appreciate you taking the time to contact us.</p>
            
            <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Your message summary:</strong></p>
              <p><strong>Subject:</strong> ${subject}</p>
              <p style="color: #666; white-space: pre-wrap; word-wrap: break-word;">${escapeHtml(message).substring(0, 200)}...</p>
            </div>
            
            <p>We typically respond to all inquiries within 24-48 hours. If your matter is urgent, you can reach us at:</p>
            <ul style="color: #667eea;">
              <li>📧 <a href="mailto:ericmosha676@gmail.com" style="color: #667eea; text-decoration: none;">ericmosha676@gmail.com</a></li>
              <li>📞 <a href="tel:+255762679099" style="color: #667eea; text-decoration: none;">+255 762 679 099</a></li>
            </ul>
            
            <p>Best regards,<br><strong>${process.env.NEXT_PUBLIC_OWNER_NAME}</strong><br>Tariq Smile Game Hub</p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px;">
            <p>Follow us on social media:</p>
            <p>
              <a href="https://www.instagram.com/bee_thevillan?igsh=NDF3N2hhZDYwMmF2&utm_source=qr" style="color: #667eea; margin: 0 10px;">Instagram</a>
              <a href="https://www.tiktok.com/@thecaptaintrq" style="color: #667eea; margin: 0 10px;">TikTok</a>
              <a href="https://www.facebook.com/share/1FgEX3sSvg/?mibextid=wwXIfr" style="color: #667eea; margin: 0 10px;">Facebook</a>
            </p>
          </div>
        </div>
      `,
    };

    // Send emails
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(autoReplyMailOptions);

    console.log(`✅ Contact email sent from ${name} (${email})`);
    res.json({ 
      success: true, 
      message: 'Your message has been sent successfully. We will get back to you soon!' 
    });

  } catch (error) {
    console.error('Contact email error:', error.message);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// Helper function to escape HTML
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

module.exports = router;
