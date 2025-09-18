# 🧘 AsanaSense

A modern, AI-powered yoga pose feedback web app that uses voice commands to capture camera input, runs pose recognition and posture correction via Google Gemini Vision API, and speaks real-time feedback back to the user.

## ✨ Features

- **Voice-Controlled**: Say "Click" or "Capture" to analyze your pose
- **Real-time Camera**: Live video feed with high-quality capture
- **AI-Powered Analysis**: Google Gemini Vision API for pose recognition
- **Voice Feedback**: Text-to-speech feedback with natural voices
- **Beautiful UI**: CRED-inspired design with glassmorphism and animations
- **Browser-Based**: No app installation required, works entirely in the browser

## 🎨 Design Philosophy

Inspired by CRED's UI philosophy:
- Elegant dark theme with `#0f1115` base color
- Glassmorphism elements with backdrop blur
- Typography: Playfair Display (headings) + Inter (body)
- Micro-interactions and smooth animations
- Minimal, center-focused layout

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling with custom design system
- **Framer Motion** - Smooth animations
- **Web APIs** - Camera, Speech Recognition, Text-to-Speech

### Backend
- **FastAPI** - Python web framework
- **Google Gemini Vision** - AI pose analysis
- **Pillow** - Image processing
- **Uvicorn** - ASGI server

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Python 3.10+
- Google API Key for Gemini Vision

### 1. Clone and Setup

```bash
git clone <repository-url>
cd AsanaSense
```

### 2. Setup Backend

```bash
# Make scripts executable
chmod +x *.sh

# Setup Python backend
./setup-backend.sh

# Add your Google API key to asana-sense/backend/.env
# Get your key from: https://makersuite.google.com/app/apikey
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

### 4. Open in Browser

Visit [http://localhost:3000](http://localhost:3000)

## 📱 How to Use

1. **Allow Camera Access**: Grant permission when prompted
2. **Allow Microphone Access**: For voice commands
3. **Position Yourself**: Get in your yoga pose in front of the camera
4. **Say "Click"**: Voice command to capture and analyze your pose
5. **Listen to Feedback**: AI will speak detailed posture feedback

## 🔧 Configuration

### Environment Variables

Create `asana-sense/backend/.env`:
```env
GOOGLE_API_KEY=your_google_api_key_here
```

### Voice Commands

The app listens for:
- "Click" - Capture and analyze pose
- "Capture" - Alternative command

### Camera Settings

- Resolution: 1280x720 (ideal)
- Facing: Front camera (user-facing)
- Format: JPEG with 80% quality

## 🎯 API Endpoints

### Backend (FastAPI)

- `GET /` - Health check
- `POST /analyze` - Analyze yoga pose image
- `GET /health` - Detailed health status
- `GET /docs` - Interactive API documentation

### Request Format

```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@pose.jpg"
```

### Response Format

```json
{
  "feedback": "You are doing Warrior II pose. Your alignment looks good, but try to raise your back arm higher and engage your core more..."
}
```

## 🎨 Customization

### Colors
- Primary: `#0f1115` (CRED dark)
- Glass: `rgba(255, 255, 255, 0.05)`
- Accent: Blue/Purple gradients

### Typography
- Headings: Playfair Display
- Body: Inter
- Sizes: Responsive scaling

### Animations
- Framer Motion for smooth transitions
- Custom CSS animations for micro-interactions
- Voice pulse effects

## 🐛 Troubleshooting

### Camera Issues
- Ensure HTTPS or localhost
- Check browser permissions
- Try different browsers (Chrome recommended)

### Voice Recognition Issues
- Use Chrome/Edge (best support)
- Check microphone permissions
- Speak clearly and wait for response

### API Issues
- Verify Google API key is correct
- Check backend is running on port 8000
- Check network connectivity

## 📝 Development

### Project Structure
```
AsanaSense/
├── asana-sense/backend/     # FastAPI backend
│   ├── main.py             # Main application
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Virtual environment
├── components/             # React components
├── pages/                  # Next.js pages
├── styles/                 # Global styles
└── public/                 # Static assets
```

### Adding New Features

1. **New Voice Commands**: Edit `pages/index.tsx` recognition logic
2. **UI Components**: Add to `components/` directory
3. **API Endpoints**: Extend `asana-sense/backend/main.py`
4. **Styling**: Update `tailwind.config.js` and `styles/globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Google Gemini Vision API for AI capabilities
- CRED for design inspiration
- Next.js and FastAPI communities
- Open source contributors

---

**Built with ❤️ for the yoga community**