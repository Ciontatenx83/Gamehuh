// routes/payment.js
const express = require('express');
const nodemailer = require('nodemailer');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2023-10-16' });

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY,
  },
});

/**
 * POST /api/process-payment
 * Processes payment and sends secure confirmation
 * IMPORTANT: CVV is never stored or logged
 * Card number is only shown last 4 digits
 */
router.post('/api/process-payment', async (req, res) => {
  try {
    const { fullName, email, cardType, cardLast4, expiryDate, amount, timestamp } = req.body;

    // Validate input
    if (!fullName || !email || !cardType || !cardLast4 || !expiryDate || !amount) {
      return res.status(400).json({ error: 'Missing required payment information' });
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Log transaction (cardLast4 only, never full card or CVV)
    console.log(`💳 Payment Processed:
    Transaction ID: ${transactionId}
    Customer: ${fullName} (${email})
    Amount: ${amount}
    Card Type: ${cardType}
    Card Last 4: ${cardLast4}
    Timestamp: ${timestamp}`);

    // In production, this would be sent to your bank via a secure API
    // For now, we're logging it and sending confirmation emails

    // Send payment confirmation to customer
    const customerEmailOptions = {
      from: process.env.OWNER_EMAIL,
      to: email,
      subject: `Payment Confirmation - Transaction #${transactionId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #28a745, #20c997); padding: 30px; border-radius: 8px 8px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0;">✓ Payment Successful</h1>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #e0e0e0;">
            <p>Dear ${fullName},</p>
            
            <p>Thank you for your purchase! Your payment has been processed successfully.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
              <h3 style="margin-top: 0; color: #333;">Transaction Details</h3>
              <table style="width: 100%; color: #333;">
                <tr>
                  <td style="padding: 8px 0;"><strong>Transaction ID:</strong></td>
                  <td style="padding: 8px 0; text-align: right; font-family: monospace; color: #28a745;">${transactionId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Amount:</strong></td>
                  <td style="padding: 8px 0; text-align: right;">${amount}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Payment Method:</strong></td>
                  <td style="padding: 8px 0; text-align: right;">${cardType} ending in ${cardLast4}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0;"><strong>Date & Time:</strong></td>
                  <td style="padding: 8px 0; text-align: right;">${new Date(timestamp).toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;">
                <strong>🔒 Security Notice:</strong> We do not store your full card details. Only the last 4 digits are retained in our system for your records.
              </p>
            </div>
            
            <h3>Next Steps</h3>
            <ul>
              <li>Your subscription is now active</li>
              <li>You can access all premium features immediately</li>
              <li>A copy of this receipt has been sent to your email</li>
              <li>Keep this transaction ID for your records</li>
            </ul>
            
            <p>If you have any questions about your purchase, please contact us at:</p>
            <p>
              📧 <a href="mailto:ericmosha676@gmail.com" style="color: #28a745; text-decoration: none;">ericmosha676@gmail.com</a><br>
              📞 <a href="tel:+255762679099" style="color: #28a745; text-decoration: none;">+255 762 679 099</a>
            </p>
            
            <p>Thank you for your business!<br>
            <strong>${process.env.NEXT_PUBLIC_OWNER_NAME}</strong><br>
            Tariq Smile Game Hub</p>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #999; font-size: 12px; border-top: 1px solid #e0e0e0;">
            <p>This is an automated message. Please do not reply with sensitive information.</p>
          </div>
        </div>
      `,
    };

    // Send payment notification to owner
    const ownerEmailOptions = {
      from: process.env.OWNER_EMAIL,
      to: process.env.OWNER_EMAIL,
      subject: `💰 New Payment Received - ${amount}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ffd700, #ffed4e); padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #000; margin: 0;">🎉 New Payment Received</h2>
          </div>
          
          <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px; border: 1px solid #ddd;">
            <table style="width: 100%; color: #333;">
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0;"><strong>Transaction ID:</strong></td>
                <td style="padding: 10px 0; text-align: right; font-family: monospace; font-weight: bold;">${transactionId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0;"><strong>Customer:</strong></td>
                <td style="padding: 10px 0; text-align: right;">${fullName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; text-align: right;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0;"><strong>Amount:</strong></td>
                <td style="padding: 10px 0; text-align: right; font-size: 1.2rem; color: #28a745; font-weight: bold;">${amount}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0;"><strong>Card Type:</strong></td>
                <td style="padding: 10px 0; text-align: right;">${cardType} ••••${cardLast4}</td>
              </tr>
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 10px 0;"><strong>Timestamp:</strong></td>
                <td style="padding: 10px 0; text-align: right;">${new Date(timestamp).toLocaleString()}</td>
              </tr>
            </table>
            
            <div style="background: #f0f4ff; padding: 15px; border-radius: 8px; margin: 20px 0; color: #667eea;">
              <p style="margin: 0;">
                <strong>💡 Note:</strong> Full payment details have been recorded in your payment system. 
                Customer's CVV and full card number are never stored for security compliance.
              </p>
            </div>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(customerEmailOptions);
    await transporter.sendMail(ownerEmailOptions);

    // Return success response with transaction ID
    res.json({
      success: true,
      transactionId: transactionId,
      message: 'Payment processed successfully. Confirmation sent to your email.',
    });

  } catch (error) {
    console.error('Payment processing error:', error.message);
    res.status(500).json({ error: 'Payment processing failed. Please try again.' });
  }
});

/**
 * POST /api/webhook/payment
 * Handles Stripe webhook events
 */
router.post('/api/webhook/payment', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed':
        console.log('✅ Stripe Checkout Completed:', event.data.object.id);
        // TODO: Update subscription status in database
        break;

      case 'payment_intent.succeeded':
        console.log('✅ Payment Intent Succeeded:', event.data.object.id);
        // TODO: Log successful payment
        break;

      case 'payment_intent.payment_failed':
        console.log('❌ Payment Failed:', event.data.object.id);
        // TODO: Handle payment failure
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

/**
 * Generate unique transaction ID
 */
function generateTransactionId() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN-${timestamp}-${random}`;
}

module.exports = router;
