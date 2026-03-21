#!/bin/bash

# 🎮 TARIQ SMILE GAME HUB - STARTUP SCRIPT
# Quick setup and verification script
# Run this to get your game hub running!

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║                                                                ║"
echo "║     🎮 TARIQ SMILE GAME HUB - STARTUP SCRIPT 🎮              ║"
echo "║                                                                ║"
echo "║     Status: PRODUCTION READY                                  ║"
echo "║     Owner: Erick Ibrahim                                      ║"
echo "║     Email: ericmosha676@gmail.com                             ║"
echo "║                                                                ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""
echo "⏱️  Time needed: 5-10 minutes"
echo ""

# Step 1: Check Node.js
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 STEP 1: Checking Node.js Installation"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found!"
    echo "📥 Install from: https://nodejs.org/ (v14 or higher)"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js version: $NODE_VERSION"

if ! command -v npm &> /dev/null; then
    echo "❌ npm not found!"
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm version: $NPM_VERSION"
echo ""

# Step 2: Install dependencies
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 STEP 2: Installing Dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -d "node_modules" ]; then
    echo "ℹ️  node_modules already exists"
    read -p "Reinstall dependencies? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npm install --legacy-peer-deps
    else
        echo "✅ Skipping npm install"
    fi
else
    echo "⏳ Installing dependencies (this may take 1-2 minutes)..."
    npm install --legacy-peer-deps
    if [ $? -eq 0 ]; then
        echo "✅ Dependencies installed successfully"
    else
        echo "❌ Installation failed"
        exit 1
    fi
fi
echo ""

# Step 3: Check .env.local
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚙️  STEP 3: Environment Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found!"
    echo "📄 Creating .env.local..."
    
    cat > .env.local << 'EOF'
# Environment Variables - NEVER COMMIT THIS FILE
# This is for development/testing only

# Node Environment
NODE_ENV=development
PORT=3000
HOST=localhost

# Stripe Configuration - ADD YOUR KEYS
STRIPE_PUBLIC_KEY=pk_test_PLACEHOLDER_DO_NOT_USE
STRIPE_SECRET_KEY=sk_test_PLACEHOLDER_DO_NOT_USE
STRIPE_WEBHOOK_SECRET=whsec_PLACEHOLDER_DO_NOT_USE

# Email Configuration - ADD YOUR KEYS
SENDGRID_API_KEY=SG.PLACEHOLDER_DO_NOT_USE
OWNER_EMAIL=ericmosha676@gmail.com

# Database (Optional)
DB_HOST=localhost
DB_PORT=27017
DB_NAME=gamehub

# Session Secret
SESSION_SECRET=your_dev_session_secret_random_string_here

# API Base URL
BASE_URL=http://localhost:3000
EOF
    
    echo "✅ .env.local created"
fi

echo "ℹ️  Configuration file exists at: ./.env.local"
echo ""
echo "⚠️  NEXT: Add your API keys to .env.local"
echo ""
echo "Need API keys? Get them from:"
echo "  • Stripe:   https://dashboard.stripe.com/apikeys"
echo "  • SendGrid: https://app.sendgrid.com/settings/api_keys"
echo ""

# Step 4: Verify files
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✔️  STEP 4: Verifying Project Files"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

FILES_OK=true

# Check critical files
check_file() {
    if [ -f "$1" ]; then
        echo "✅ $1"
    else
        echo "❌ $1 - NOT FOUND"
        FILES_OK=false
    fi
}

echo "Server files:"
check_file "server.js"
check_file "package.json"

echo ""
echo "Frontend files:"
check_file "index.html"
check_file "admin.html"
check_file "script.js"
check_file "styles.css"

echo ""
echo "Route files:"
check_file "routes/checkout.js"
check_file "routes/emails.js"
check_file "routes/payment.js"

echo ""

if [ "$FILES_OK" = true ]; then
    echo "✅ All critical files present"
else
    echo "⚠️  Some files are missing"
fi
echo ""

# Step 5: Ready to start
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 STEP 5: Ready to Start"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ Setup complete!"
echo ""
echo "📍 Next steps:"
echo ""
echo "1. Edit .env.local and add your API keys:"
echo "   nano .env.local"
echo ""
echo "2. Start the development server:"
echo "   npm start"
echo ""
echo "   OR with auto-reload:"
echo "   npm run dev"
echo ""
echo "3. Open in your browser:"
echo "   http://localhost:3000"
echo ""
echo "4. Access admin panel:"
echo "   http://localhost:3000/admin-login"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📚 Documentation:"
echo "   • Quick start (5 min):     QUICK_START_5MINS.md"
echo "   • Full setup (30 min):     COMPLETE_SETUP_AND_DEPLOYMENT.md"
echo "   • Project overview:        PROJECT_ASSESSMENT_REPORT.md"
echo "   • All documentation:       DOCUMENTATION_GUIDE.md"
echo ""
echo "❓ Questions? See COMPLETE_SETUP_AND_DEPLOYMENT.md → Troubleshooting"
echo ""
echo "📞 Contact: ericmosha676@gmail.com"
echo ""
echo "🎮 Happy gaming! 🚀"
echo ""
