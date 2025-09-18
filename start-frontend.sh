#!/bin/bash

# AsanaSense Frontend Startup Script
echo "🧘 Starting AsanaSense Frontend..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the Next.js development server
echo "🚀 Starting Next.js development server on http://localhost:3000"
echo "🛑 Press Ctrl+C to stop the server"
echo ""

npm run dev
