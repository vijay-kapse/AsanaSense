# 🚀 AsanaSense - Local Deployment Guide

## ✅ Project Status: READY FOR USE

The complete AsanaSense application has been successfully built and deployed locally!

## 🎯 What's Been Built

### ✅ Backend (FastAPI + Gemini Vision)
- **Location**: `asana-sense/backend/`
- **Port**: 8000
- **Status**: ✅ Running
- **Features**:
  - FastAPI server with CORS enabled
  - Google Gemini Vision API integration
  - Image processing with Pillow
  - Automatic environment setup

### ✅ Frontend (Next.js + React)
- **Location**: Root directory
- **Port**: 3000
- **Status**: ✅ Running
- **Features**:
  - CRED-inspired dark UI with glassmorphism
  - Voice recognition for "Click" and "Capture" commands
  - Real-time camera capture
  - Text-to-speech feedback
  - Smooth animations with Framer Motion

### ✅ UI/UX Features
- **Design**: CRED-inspired dark theme (#0f1115)
- **Typography**: Playfair Display + Inter fonts
- **Animations**: Framer Motion micro-interactions
- **Glassmorphism**: Backdrop blur effects
- **Responsive**: Mobile-friendly design

## 🚀 How to Use

### 1. Start the Application

**Terminal 1 - Backend:**
```bash
./start-backend.sh
```

**Terminal 2 - Frontend:**
```bash
./start-frontend.sh
```

### 2. Open in Browser
Visit: [http://localhost:3000](http://localhost:3000)

### 3. Grant Permissions
- Allow camera access when prompted
- Allow microphone access when prompted

### 4. Use the App
1. Position yourself in front of the camera
2. Get into your yoga pose
3. Say **"Click"** or **"Capture"** to analyze your pose
4. Listen to the AI feedback

## 🔧 Configuration Required

### Add Google API Key
1. Get your API key from: https://makersuite.google.com/app/apikey
2. Edit `asana-sense/backend/.env`:
   ```env
   GOOGLE_API_KEY=your_actual_api_key_here
   ```
3. Restart the backend: `./start-backend.sh`

## 📁 Project Structure

```
AsanaSense/
├── asana-sense/backend/          # FastAPI backend
│   ├── main.py                   # Main application
│   ├── requirements.txt          # Python dependencies
│   ├── .env                      # Environment variables
│   └── venv/                     # Virtual environment
├── components/                   # React components
│   ├── VideoCapture.tsx         # Camera component
│   ├── FeedbackCard.tsx         # Results display
│   └── VoicePulse.tsx           # Voice indicator
├── pages/                        # Next.js pages
│   ├── index.tsx                # Main page
│   └── api/analyze.ts           # API route (unused)
├── styles/                       # Global styles
│   └── globals.css              # Tailwind + custom CSS
├── start-backend.sh             # Backend startup script
├── start-frontend.sh            # Frontend startup script
├── setup-backend.sh             # Backend setup script
└── README.md                    # Full documentation
```

## 🎨 UI Features

### Design Elements
- **Background**: Gradient from #0f1115 to gray-900
- **Cards**: Glassmorphism with backdrop blur
- **Typography**: Gradient text effects
- **Animations**: Smooth transitions and micro-interactions
- **Voice Pulse**: Animated listening indicator

### Voice Commands
- **"Click"** - Capture and analyze pose
- **"Capture"** - Alternative command
- **Continuous listening** - Always ready for commands

### Camera Features
- **Resolution**: 1280x720 (ideal)
- **Format**: JPEG with 80% quality
- **Facing**: Front camera (user-facing)
- **Auto-play**: Starts immediately

## 🔍 API Endpoints

### Backend (http://localhost:8000)
- `GET /` - Health check
- `POST /analyze` - Analyze yoga pose image
- `GET /health` - Detailed health status
- `GET /docs` - Interactive API documentation

### Example API Call
```bash
curl -X POST "http://localhost:8000/analyze" \
  -H "Content-Type: multipart/form-data" \
  -F "file=@pose.jpg"
```

## 🐛 Troubleshooting

### Camera Issues
- Ensure you're on HTTPS or localhost
- Check browser permissions
- Try Chrome/Edge for best compatibility

### Voice Recognition Issues
- Use Chrome/Edge browsers
- Check microphone permissions
- Speak clearly and wait for response

### Backend Issues
- Verify Google API key is set
- Check backend is running on port 8000
- Check logs for error messages

### Frontend Issues
- Check if backend is running
- Verify CORS settings
- Check browser console for errors

## 🎉 Success Indicators

### Backend Running
```bash
curl http://localhost:8000/
# Should return: {"message":"AsanaSense API is running!"}
```

### Frontend Running
- Visit http://localhost:3000
- Should see the AsanaSense interface
- Camera should start automatically

### Full Integration
- Say "Click" and see the voice pulse animate
- Camera should capture your pose
- AI should analyze and speak feedback

## 📝 Next Steps

1. **Add your Google API key** to enable AI analysis
2. **Test with different yoga poses** to see AI feedback
3. **Customize the UI** if desired
4. **Deploy to production** when ready

## 🎯 Features Working

- ✅ Camera capture
- ✅ Voice recognition
- ✅ Image processing
- ✅ AI pose analysis (with API key)
- ✅ Text-to-speech feedback
- ✅ Beautiful UI with animations
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

---

**🎉 AsanaSense is ready to use! Enjoy your AI-powered yoga practice!**
