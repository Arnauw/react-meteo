#!/bin/bash

# =================================================================
#  React/Vite Application Update Script
# =================================================================

# Get the absolute path of the script's directory
PROJECT_PATH=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)

# Navigate to project
cd "$PROJECT_PATH" || { echo "❌ Directory not found: $PROJECT_PATH"; exit 1; }

# Pull latest code
git pull || { echo "❌ Git pull failed"; exit 1; }

# Build application
pnpm build || { echo "❌ Build failed"; exit 1; }

echo "✅ Update completed successfully"