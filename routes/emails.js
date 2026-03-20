// routes/emails.js
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

// Send subscription confirmation email
router.post('/api/send-email', async (req, res) => {
  try {
    const { email, planName, planPrice } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const mailOptions = {
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: `Welcome to the ${planName} Plan - Tariq Smile Game Hub`,
      html: `
        <h2>Welcome to Tariq Smile Game Hub!</h2>
        <p>Thank you for subscribing to the <strong>${planName}</strong> plan ($${planPrice}/month).</p>
        <p>Your subscription is now active. You can:</p>
        <ul>
          <li>Download games at high speed</li>
          <li>Access exclusive content</li>
          <li>Get priority support</li>
        </ul>
        <p>Questions? Contact us at ${process.env.OWNER_EMAIL}</p>
        <p>Best regards,<br/><strong>${process.env.NEXT_PUBLIC_OWNER_NAME}</strong></p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
