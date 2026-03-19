# GameHub Configuration

## Payment Configuration

This file contains all payment method configurations. Update with your actual API keys and settings.

### Stripe Configuration
```
STRIPE_PUBLIC_KEY: pk_test_YOUR_STRIPE_KEY_HERE
STRIPE_SECRET_KEY: sk_test_YOUR_STRIPE_SECRET_HERE
STRIPE_WEBHOOK_SECRET: whsec_YOUR_WEBHOOK_SECRET
```

### PayPal Configuration
```
PAYPAL_CLIENT_ID: YOUR_PAYPAL_CLIENT_ID
PAYPAL_SECRET: YOUR_PAYPAL_SECRET
PAYPAL_MODE: sandbox (for testing) or live (for production)
```

### General Payment Settings
```
CURRENCY: USD
TAX_RATE: 0.08 (8%)
SUPPORTED_PAYMENT_METHODS:
  - Stripe (Credit/Debit Cards)
  - PayPal
  - Crypto (Bitcoin, Ethereum - coming soon)
```

## Environment Variables (Create .env file)

```env
# Stripe
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY

# PayPal
PAYPAL_CLIENT_ID=YOUR_CLIENT_ID
PAYPAL_SECRET=YOUR_SECRET

# General
NODE_ENV=development
PORT=3000
```

## Installation & Setup

### 1. Stripe Setup
1. Create account at https://stripe.com
2. Get your API keys from the Stripe Dashboard
3. Update the `STRIPE_PUBLIC_KEY` in `script.js` (line ~270)
4. For backend integration, use the Secret Key securely

### 2. PayPal Setup
1. Create account at https://www.paypal.com/developers
2. Create an app to get Client ID
3. Add payment button handlers in `script.js`

### 3. SSL/HTTPS
- Stripe requires HTTPS in production
- Use Let's Encrypt for free SSL certificates
- Update payment processing code accordingly

## Payment Flow

1. User adds games to cart
2. User clicks "Checkout"
3. User enters payment information
4. Payment is processed via Stripe/PayPal
5. User receives download links via email
6. Games stored in user account library

## Security Notes

- Never commit .env files with real API keys
- Use environment variables for sensitive data
- Implement server-side payment verification
- Enable webhook verification for payment confirmation
- Store payment info securely (PCI compliance)

## Testing

### Stripe Test Cards
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002
- Requires auth: 4000 0025 0000 3155
- Expiry: Any future date (MM/YY)
- CVC: Any 3 digits

## Production Deployment

1. Update all configuration for production environment
2. Switch Stripe keys from test to live
3. Enable HTTPS/SSL
4. Set up proper database for user accounts
5. Implement order tracking and download link generation
6. Set up email notifications
7. Enable payment webhooks
8. Test thoroughly with small transactions first

## Support

For payment integration issues:
- Stripe Support: https://support.stripe.com
- PayPal Support: https://developer.paypal.com/support
