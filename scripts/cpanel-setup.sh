#!/bin/bash

# cPanel Node.js Setup Script
# Run this after creating the Node.js application in cPanel
# Usage: bash ./scripts/cpanel-setup.sh

set -e

echo "🚀 Portfolio Server - cPanel Setup Script"
echo "=========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "📦 Step 1: Installing dependencies..."
pnpm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

echo "🔨 Step 2: Building TypeScript..."
pnpm build

if [ $? -ne 0 ]; then
    echo "❌ Failed to build TypeScript"
    exit 1
fi
echo "✅ Build successful"
echo ""

echo "🗄️  Step 3: Generating Prisma Client..."
pnpm prisma:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma client"
    exit 1
fi
echo "✅ Prisma client generated"
echo ""

echo "🔄 Step 4: Running database migrations..."
pnpm prisma:migrate

if [ $? -ne 0 ]; then
    echo "❌ Failed to run migrations"
    echo "⚠️  Make sure DATABASE_URL is set in cPanel environment"
    exit 1
fi
echo "✅ Database migrations complete"
echo ""

echo "=========================================="
echo "✅ Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Go to cPanel Node.js Manager"
echo "2. Click 'Start Application' for portfolio-api"
echo "3. Wait for status to show 'Running'"
echo "4. Test: curl https://express.ousadbazar.com/"
echo ""
