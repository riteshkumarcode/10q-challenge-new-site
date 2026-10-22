#!/usr/bin/env bash
# ==============================================================================
# 10Q Challenge Platform - Hostinger Automated Deployment Script
# Usage:
#   chmod +x deploy-hostinger.sh
#   ./deploy-hostinger.sh
# ==============================================================================

set -e

echo "🚀 [10Q Challenge] Starting Hostinger deployment..."

# Step 1: Check Node.js version
NODE_VERSION=$(node -v 2>/dev/null || echo "not-found")
if [[ "$NODE_VERSION" == "not-found" ]]; then
    echo "❌ Node.js is not installed or not in PATH."
    exit 1
fi
echo "✅ Node.js detected: $NODE_VERSION"

# Step 2: Pull latest changes (if running in a git repository)
if [ -d ".git" ]; then
    echo "📥 Pulling latest changes from git..."
    git pull origin main || echo "⚠️ Git pull skipped or failed, continuing..."
fi

# Step 3: Install root and frontend dependencies
echo "📦 Installing npm dependencies..."
npm install --production=false

# Step 4: Build Next.js production bundle
echo "🔨 Building Next.js production bundle..."
npm run build

# Step 5: Check if PM2 is running
if command -v pm2 &> /dev/null; then
    echo "🔄 Reloading PM2 process..."
    pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production
    pm2 save
    echo "✅ PM2 process restarted successfully!"
else
    echo "ℹ️ PM2 is not installed globally."
    echo "👉 If using Hostinger hPanel: Click 'Restart' in the Node.js menu."
    echo "👉 If using PM2: Run 'npx pm2 reload ecosystem.config.js --env production'"
fi

echo "🎉 [10Q Challenge] Deployment complete!"
