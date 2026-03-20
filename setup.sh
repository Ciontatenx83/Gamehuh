#!/bin/bash
# setup.sh - Automated setup script for subscription system

echo "🚀 Tariq Smile Game Hub - Subscription System Setup"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js found: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm -v)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install stripe@latest nodemailer@latest dotenv@latest

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Check if .env.local exists
echo ""
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found. Creating template..."
    cat > .env.local << 'EOF'
# Stripe Keys (Get these from dashboard.stripe.com/apikeys)
STRIPE_PUBLIC_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE

# Email (SendGrid)
SENDGRID_API_KEY=SG.YOUR_KEY_HERE
OWNER_EMAIL=ericmosha676@gmail.com

# Site Info
NEXT_PUBLIC_OWNER_NAME="Erick Vicent Ibrahim"
NEXT_PUBLIC_OWNER_PHONE="+255762679099"

# Server
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOF
    echo "✅ Template .env.local created - please update with your API keys"
else
    echo "✅ .env.local already exists"
fi

# Check if directories exist
if [ ! -d "routes" ]; then
    echo "📁 Creating routes directory..."
    mkdir -p routes
fi

if [ ! -d "public" ]; then
    echo "📁 Creating public directory..."
    mkdir -p public
fi

# Check if routes exist
if [ ! -f "routes/checkout.js" ]; then
    echo "⚠️  routes/checkout.js not found"
else
    echo "✅ routes/checkout.js found"
fi

if [ ! -f "routes/emails.js" ]; then
    echo "⚠️  routes/emails.js not found"
else
    echo "✅ routes/emails.js found"
fi

# Success message
echo ""
echo "=================================================="
echo "✅ Setup completed!"
echo "=================================================="
echo ""
echo "📋 Next Steps:"
echo "1. Update .env.local with your Stripe & SendGrid keys"
echo "2. Read QUICK_START.md for detailed instructions"
echo "3. Create Stripe products and copy Price IDs"
echo "4. Test with: npm run dev"
echo ""
echo "📖 Documentation:"
echo "   - QUICK_START.md (Start here!)"
echo "   - SECURITY_AND_DEPLOYMENT.md"
echo "   - IMPLEMENTATION_SUMMARY.md"
echo ""
echo "🎮 Visit: http://localhost:3000 to test"
