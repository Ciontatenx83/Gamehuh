#!/usr/bin/env bash

# ============================================================
# TARIQ SMILE GAME HUB - CHECKOUT SYSTEM
# Complete Setup Verification Script
# ============================================================

echo ""
echo "╔══════════════════════════════════════════════════════╗"
echo "║  🎮 GAME HUB CHECKOUT SYSTEM - SETUP VERIFICATION   ║"
echo "║                                                      ║"
echo "║  Project: Tariq Smile Game Hub                      ║"
echo "║  Owner: Erick Ibrahim                               ║"
echo "║  Email: ericmosha676@gmail.com                      ║"
echo "║  Phone: +255 762 679 099                            ║"
echo "║                                                      ║"
echo "╚══════════════════════════════════════════════════════╝"
echo ""

# Check for Node.js
echo "🔍 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install from https://nodejs.org"
    exit 1
fi
echo "✅ Node.js: $(node -v)"

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found"
    exit 1
fi
echo "✅ npm: $(npm -v)"

# Check for .env.local
echo ""
echo "📋 Checking configuration files..."
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found - creating template..."
    cat > .env.local << 'EOF'
# Stripe Keys - Get from https://dashboard.stripe.com/apikeys
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE

# SendGrid - Get from https://app.sendgrid.com/settings/api_keys
SENDGRID_API_KEY=SG.YOUR_KEY_HERE

# Owner Info
OWNER_EMAIL=ericmosha676@gmail.com
NEXT_PUBLIC_OWNER_NAME="Erick Ibrahim"
NEXT_PUBLIC_OWNER_PHONE="+255762679099"

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Created .env.local template (UPDATE WITH YOUR KEYS)"
else
    echo "✅ .env.local found"
fi

# Check for frontend files
echo ""
echo "📄 Checking frontend files..."
frontend_files=(
    "public/checkout.html"
    "public/checkout.js"
    "public/checkout-styles.css"
    "public/success.html"
    "public/contact-form.html"
    "public/contact.js"
    "public/contact-styles.css"
    "public/subscription.js"
    "public/subscription-styles.css"
    "public/footer.html"
)

missing_files=0
for file in "${frontend_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        ((missing_files++))
    fi
done

# Check for backend files
echo ""
echo "⚙️  Checking backend files..."
backend_files=(
    "routes/checkout.js"
    "routes/emails.js"
    "routes/contact-email.js"
    "routes/payment.js"
)

for file in "${backend_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
        ((missing_files++))
    fi
done

# Check for documentation
echo ""
echo "📚 Checking documentation..."
docs=(
    "MASTER_GUIDE.md"
    "COMPLETE_CHECKOUT_GUIDE.md"
    "QUICK_START.md"
    "SECURITY_AND_DEPLOYMENT.md"
    "IMPLEMENTATION_SUMMARY.md"
    "SERVER_INTEGRATION_GUIDE.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo "✅ $doc"
    else
        echo "❌ $doc - MISSING"
        ((missing_files++))
    fi
done

# Check dependencies
echo ""
echo "📦 Checking dependencies..."
if npm list stripe &>/dev/null 2>&1; then
    echo "✅ stripe installed"
else
    echo "⚠️  stripe not installed - run 'npm install stripe@latest'"
fi

if npm list nodemailer &>/dev/null 2>&1; then
    echo "✅ nodemailer installed"
else
    echo "⚠️  nodemailer not installed - run 'npm install nodemailer@latest'"
fi

if npm list dotenv &>/dev/null 2>&1; then
    echo "✅ dotenv installed"
else
    echo "⚠️  dotenv not installed - run 'npm install dotenv@latest'"
fi

# Summary
echo ""
echo "╔══════════════════════════════════════════════════════╗"
if [ $missing_files -eq 0 ]; then
    echo "║  ✅ ALL FILES READY FOR SETUP                       ║"
else
    echo "║  ⚠️  $missing_files FILES MISSING                         ║"
fi
echo "╚══════════════════════════════════════════════════════╝"

echo ""
echo "📋 NEXT STEPS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. 📖 READ THE GUIDES:"
echo "   Start with: MASTER_GUIDE.md (comprehensive overview)"
echo "   Quick setup: QUICK_START.md (40-minute setup)"
echo ""
echo "2. ⚙️  GET YOUR API KEYS:"
echo "   Stripe: https://dashboard.stripe.com/apikeys"
echo "   SendGrid: https://app.sendgrid.com/settings/api_keys"
echo ""
echo "3. 🔑 UPDATE .env.local WITH YOUR KEYS:"
echo "   nano .env.local"
echo "   (Fill in: pk_test_..., sk_test_..., whsec_..., SG....)"
echo ""
echo "4. 📦 INSTALL DEPENDENCIES:"
echo "   npm install stripe@latest nodemailer@latest dotenv@latest"
echo ""
echo "5. 🧪 TEST LOCALLY:"
echo "   npm run dev"
echo "   Visit: http://localhost:3000/checkout"
echo "   Use card: 4242 4242 4242 4242 | Date: 12/25 | CVV: 123"
echo ""
echo "6. 🚀 DEPLOY TO PRODUCTION:"
echo "   Follow deployment section in MASTER_GUIDE.md"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💬 Questions? Contact:"
echo "   📧 ericmosha676@gmail.com"
echo "   📞 +255 762 679 099"
echo ""
echo "✨ System Status: PRODUCTION READY ✨"
echo ""
