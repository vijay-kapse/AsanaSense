# 🧘 AsanaSense - AI-Powered Yoga Pose Feedback

[![GitHub](https://img.shields.io/badge/GitHub-vijay--kapse%2FAsanaSense-blue?style=flat-square&logo=github)](https://github.com/vijay-kapse/AsanaSense)
[![Next.js](https://img.shields.io/badge/Next.js-14.0.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116.2-green?style=flat-square&logo=fastapi)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

A premium, AI-powered yoga pose feedback application that uses voice commands to capture camera input, runs pose recognition via Google Gemini Vision API, and provides real-time feedback through a sophisticated CRED-inspired interface.

## ✨ Features

### 🎯 Core Functionality
- **Voice Recognition**: Say "analyze" to capture and analyze your pose
- **Real-time Camera**: High-quality video capture with automatic focus
- **AI Pose Analysis**: Google Gemini Vision API for intelligent pose recognition
- **Text-to-Speech**: Natural voice feedback with premium voice selection
- **Instant Feedback**: Real-time pose correction and improvement suggestions

### 🎨 Premium Design
- **CRED-Inspired UI**: Sophisticated dark theme with glassmorphism
- **Cinematic Animations**: Smooth, elegant transitions and micro-interactions
- **Premium Typography**: Inter + Space Grotesk fonts with gradient text effects
- **Luxury Color Palette**: Cyan, blue, and purple gradients with metallic accents
- **Glassmorphism**: Advanced backdrop blur effects and layered transparency

### 🚀 Technical Excellence
- **Modern Stack**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend API**: FastAPI with Python for robust pose analysis
- **Voice Integration**: Web Speech Recognition and Synthesis APIs
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Performance**: Optimized animations and efficient rendering

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **APIs**: Web Speech Recognition, Text-to-Speech, Camera API

### Backend
- **Framework**: FastAPI (Python)
- **AI Integration**: Google Gemini Vision API
- **Image Processing**: Pillow (PIL)
- **Server**: Uvicorn ASGI server
- **Environment**: Python virtual environment

### Design System
- **Typography**: Inter (body) + Space Grotesk (display)
- **Colors**: Black base with cyan/blue/purple gradients
- **Effects**: Glassmorphism, backdrop blur, glow effects
- **Animations**: Float, glow, shimmer, scale transitions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- Google API Key for Gemini Vision

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vijay-kapse/AsanaSense.git
   cd AsanaSense
   ```

2. **Setup Backend**
   ```bash
   chmod +x *.sh
   ./setup-backend.sh
   ```

3. **Add API Key**
   ```bash
   # Edit asana-sense/backend/.env
   GOOGLE_API_KEY=your_google_api_key_here
   ```

4. **Start the Application**
   ```bash
   # Terminal 1 - Backend
   ./start-backend.sh
   
   # Terminal 2 - Frontend
   ./start-frontend.sh
   ```

5. **Open in Browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 📱 How to Use

1. **Allow Permissions**: Grant camera and microphone access
2. **Position Yourself**: Get into your yoga pose in front of the camera
3. **Voice Command**: Say "analyze" to capture and analyze your pose
4. **Listen to Feedback**: AI will speak detailed posture feedback
5. **Continue Practicing**: Repeat for more detailed feedback

## 🎨 Design Philosophy

### CRED-Inspired Principles
- **Minimalism**: Clean, uncluttered interface with generous spacing
- **Typography as Design**: Bold, confident text with gradient treatments
- **Premium Feel**: Glassmorphism, luxury colors, and sophisticated animations
- **Exclusive Experience**: Members-only club aesthetic with premium polish

### Key Design Elements
- **Dark Theme**: Pure black backgrounds with subtle gradients
- **Glassmorphism**: Advanced backdrop blur and transparency effects
- **Cinematic Motion**: Smooth, elegant animations with proper easing
- **Luxury Accents**: Metallic cyan, blue, and purple color palette

## 📁 Project Structure

```
AsanaSense/
├── asana-sense/backend/          # FastAPI backend
│   ├── main.py                   # Main application
│   ├── requirements.txt          # Python dependencies
│   ├── .env                      # Environment variables
│   └── venv/                     # Virtual environment
├── components/                   # React components
│   ├── VideoCapture.tsx         # Camera interface
│   ├── FeedbackCard.tsx         # Results display
│   └── VoicePulse.tsx           # Voice indicator
├── pages/                        # Next.js pages
│   ├── index.tsx                # Main application page
│   └── api/analyze.ts           # API route
├── styles/                       # Global styles
│   └── globals.css              # Tailwind + custom CSS
├── scripts/                      # Setup and startup scripts
└── docs/                         # Documentation
```

## 🔧 Configuration

### Environment Variables
```env
GOOGLE_API_KEY=your_google_api_key_here
```

### Voice Commands
- "analyze" - Primary command for pose analysis
- "click" - Alternative command
- "capture" - Alternative command

### Camera Settings
- Resolution: 1280x720 (ideal)
- Format: JPEG with 80% quality
- Facing: Front camera (user-facing)

## 🎯 API Endpoints

### Backend (http://localhost:8000)
- `GET /` - Health check
- `POST /analyze` - Analyze yoga pose image
- `GET /health` - Detailed health status
- `GET /docs` - Interactive API documentation

## 🚀 Deployment

### Local Development
- Backend: `./start-backend.sh`
- Frontend: `./start-frontend.sh`

### Production
- Frontend: Deploy to Vercel/Netlify
- Backend: Deploy to Railway/Heroku/DigitalOcean

## 📊 Performance

- **Fast Loading**: Optimized Next.js build
- **Smooth Animations**: 60fps Framer Motion animations
- **Efficient Rendering**: React optimization techniques
- **Responsive**: Mobile-first design approach

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

[View on GitHub](https://github.com/vijay-kapse/AsanaSense) | [Live Demo](http://localhost:3000) | [Documentation](./README.md)
