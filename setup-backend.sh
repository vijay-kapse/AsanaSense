#!/bin/bash

# AsanaSense Backend Setup Script
echo "🧘 Setting up AsanaSense Backend..."

# Navigate to backend directory
cd asana-sense/backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "🔧 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "📦 Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "⚠️  Please edit .env file and add your GOOGLE_API_KEY"
    echo "   You can get your API key from: https://makersuite.google.com/app/apikey"
fi

echo "✅ Backend setup complete!"
echo "🚀 Run './start-backend.sh' to start the server"
