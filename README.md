# GameHub - Premium Game Download Platform

A modern, attractive gaming website where users can browse, download premium games, and make secure payments. Built with Bootstrap 5 for responsive design and Stripe integration for payment processing.

## Features

### ✨ Core Features
- **Modern, Attractive UI** - Dark theme with gradient backgrounds and smooth animations
- **Game Catalog** - Browse hundreds of games across multiple categories
- **Search & Filter** - Find games by name or category
- **Game Details Modal** - View detailed information about each game
- **Shopping Cart** - Add games to cart and manage purchases
- **Secure Payments** - Stripe integration for credit card processing
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🎮 Game Categories
- Action
- Adventure
- RPG (Role-Playing Games)
- Puzzle
- Sports
- Horror

### 💳 Payment Methods
- Credit/Debit Cards (via Stripe)
- PayPal (ready for integration)
- Subscription Plans (Basic, Premium, Pro)

### 📱 User Experience
- Instant game downloads after purchase
- Cart persistence (using localStorage)
- Smooth scroll navigation
- Toast notifications for actions
- Mobile-friendly interface

## Project Structure

```
GameHub/
├── index.html              # Main HTML file with all sections
├── styles.css              # Modern CSS styling
├── script.js               # JavaScript functionality
├── PAYMENT_CONFIG.md       # Payment method configuration guide
├── README.md              # This file
└── .env.example           # Environment variables template
```

## Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- For backend integration: Node.js and npm
- Stripe account (create at https://stripe.com)

### Quick Start (Static Hosting)

1. **Clone or download the repository**
```bash
git clone https://github.com/yourusername/gamehub.git
cd gamehub
```

2. **Open in browser**
```bash
# Simple HTTP server (Python)
python -m http.server 8000

# Or use Node.js http-server
npx http-server
```

3. **Access the website**
```
http://localhost:8000
```

## Configuration

### 1. Update Stripe Key
Edit `script.js` line 270:
```javascript
const stripe = Stripe('pk_test_YOUR_STRIPE_KEY_HERE');
```

Replace with your actual Stripe public key from https://dashboard.stripe.com/apikeys

### 2. Add Your Games
Edit the `games` array in `script.js` (starting at line 2):
```javascript
const games = [
    {
        id: 1,
        name: 'Your Game Name',
        category: 'action',
        price: 29.99,
        rating: 4.8,
        image: 'gameimage.jpg',
        developer: 'Your Studio',
        description: 'Game description here'
    },
    // Add more games...
];
```

### 3. Customize Branding
- Edit the logo/brand name in `index.html` navbar
- Change colors in `styles.css` (CSS variables at top)
- Update footer information
- Add your actual company information

## Features Explained

### Shopping Cart
- **Add to Cart**: Click on any game card, then "Add to Cart"
- **View Cart**: Click the cart icon in navigation
- **Remove Items**: Click trash icon in cart modal
- **Persistent Storage**: Cart saved to browser's localStorage

### Search & Filter
- **Search**: Type in search box to find games by name or description
- **Filter by Category**: Select category from dropdown
- **Real-time Results**: Results update instantly

### Payment Process
1. Add games to cart
2. Click "Checkout"
3. Enter payment information
4. Click "Pay" to process payment
5. Receive confirmation with download links

### Subscription Plans
- **Basic (Free)**: Free games, basic support
- **Premium ($9.99/month)**: All premium games, priority support, discounts
- **Pro ($19.99/month)**: Everything + early access, VIP support, bonus games

## Customization Guide

### Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0d6efd;
    --secondary-color: #6c757d;
    --dark-bg: #0f172a;
    --card-bg: #1e293b;
    --accent-color: #f59e0b;
    --success-color: #10b981;
    --danger-color: #ef4444;
}
```

### Adding Sections
Add new HTML sections to `index.html` between sections:
```html
<section id="newsection" class="py-5">
    <div class="container">
        <!-- Your content here -->
    </div>
</section>
```

### Changing Fonts
Update font-family in `styles.css`:
```css
body {
    font-family: 'Your Font Here', sans-serif;
}
```

## Backend Integration (Node.js/Express)

For production deployment, you'll need a backend to:
1. Handle payment processing securely
2. Generate download tokens
3. Manage user accounts
4. Send confirmation emails
5. Track orders and licenses

### Recommended Stack
- **Backend**: Node.js with Express
- **Database**: MongoDB or PostgreSQL
- **Payment**: Stripe API
- **Storage**: AWS S3 or similar for game files
- **Email**: SendGrid or AWS SES

## Deployment

### Deploy to GitHub Pages (Static)
```bash
# Push to gh-pages branch
git subtree push --prefix . origin gh-pages
```

### Deploy to Netlify
1. Connect your GitHub repository
2. Set build command: (none needed for static)
3. Set publish directory: `/`
4. Deploy!

### Deploy to Vercel
1. Import repository from GitHub
2. Vercel will auto-detect static site
3. Click Deploy!

### Deploy to AWS Amplify
1. Connect to GitHub
2. Build settings: (leave empty for static)
3. Deploy!

## Payment Security

### Important Security Notes
⚠️ **Never commit sensitive keys to version control**
- Use environment variables (.env file)
- Add .env to .gitignore
- For production, use secure secret management

### PCI Compliance
- Stripe handles PCI compliance for card processing
- Never store credit card numbers yourself
- Use Stripe's pre-built payment forms
- Implement HTTPS for all transactions

### Testing
Use Stripe's test cards (see PAYMENT_CONFIG.md):
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002

## Troubleshooting

### Games Not Displaying
- Check browser console (F12) for errors
- Verify `games` array in `script.js`
- Check image URLs are accessible

### Cart Not Persisting
- Check browser allows localStorage
- Clear cache and reload
- Check console for JavaScript errors

### Payment Not Processing
- Verify Stripe key is correct
- Check browser console for errors
- Ensure HTTPS in production
- Update Stripe API version if needed

### Styling Issues
- Clear browser cache (Ctrl+Shift+Del)
- Check CSS file is loading (F12 Network tab)
- Verify Bootstrap CDN is accessible

## Browser Support

✅ Works on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

### Tips for Better Performance
1. Optimize game cover images (use WebP format)
2. Use lazy loading for images
3. Implement CDN for static assets
4. Minify CSS and JavaScript for production
5. Enable gzip compression on server
6. Use service workers for offline support

## Analytics & Tracking

Add Google Analytics:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## API Endpoints (Backend Required)

When implementing backend:
```
POST /api/games           - Get games list
POST /api/cart           - Manage cart
POST /api/checkout       - Process payment
POST /api/download       - Generate download link
POST /api/account        - User account management
GET  /api/orders         - Get user orders
```

## Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support & Contact

- **Email**: support@gamehub.com
- **Website**: www.gamehub.com
- **GitHub Issues**: [Report bugs here]
- **Twitter**: @GameHubOfficial

## Roadmap

- [ ] User accounts and profiles
- [ ] Wishlist feature
- [ ] Game reviews and ratings
- [ ] Multiplayer functionality
- [ ] Mobile app (iOS/Android)
- [ ] DLC and in-game purchases
- [ ] Game streaming integration
- [ ] Cryptocurrency payments
- [ ] Social features (friend lists, gifting)
- [ ] Achievement system

## Credits

Built with:
- [Bootstrap 5](https://getbootstrap.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- [Stripe](https://stripe.com/)
- Love ❤️

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: ✅ Ready for Deployment
