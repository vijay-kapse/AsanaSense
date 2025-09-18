import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoCapture from '../components/VideoCapture'
import FeedbackCard from '../components/FeedbackCard'
import VoicePulse from '../components/VoicePulse'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [feedback, setFeedback] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [recognition, setRecognition] = useState<any>(null)

  useEffect(() => {
    // Initialize camera
    navigator.mediaDevices.getUserMedia({ 
      video: { 
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      } 
    }).then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    }).catch((err) => {
      console.error('Error accessing camera:', err)
    })

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      const speechRecognition = new (window as any).webkitSpeechRecognition()
      speechRecognition.continuous = true
      speechRecognition.interimResults = false
      speechRecognition.lang = 'en-US'

      speechRecognition.onstart = () => {
        setIsListening(true)
      }

      speechRecognition.onresult = (e: any) => {
        const text = e.results[e.results.length - 1][0].transcript.toLowerCase()
        console.log('Heard:', text)
        if (text.includes("analyze") || text.includes("click") || text.includes("capture")) {
          captureFrame()
        }
      }

      speechRecognition.onerror = (e: any) => {
        console.error('Speech recognition error:', e.error)
        setIsListening(false)
      }

      speechRecognition.onend = () => {
        setIsListening(false)
        // Restart recognition after a short delay
        setTimeout(() => {
          if (speechRecognition) {
            speechRecognition.start()
          }
        }, 100)
      }

      setRecognition(speechRecognition)
      speechRecognition.start()
    }

    return () => {
      if (recognition) {
        recognition.stop()
      }
    }
  }, [])

  async function captureFrame() {
    if (!videoRef.current || isProcessing) return
    
    setIsProcessing(true)
    
    try {
      const canvas = document.createElement("canvas")
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(video, 0, 0)

      canvas.toBlob(async (blob) => {
        if (!blob) return

        const formData = new FormData()
        formData.append("file", blob, "pose.jpg")
        
        try {
          // Use local backend instead of Next.js API
          const res = await fetch("http://localhost:8000/analyze", { 
            method: "POST", 
            body: formData 
          })
          
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          
          const data = await res.json()
          speak(data.feedback)
          setFeedback(data.feedback)
        } catch (error) {
          console.error('Error analyzing pose:', error)
          const errorMessage = "Sorry, I couldn't analyze your pose right now. Please try again."
          speak(errorMessage)
          setFeedback(errorMessage)
        } finally {
          setIsProcessing(false)
        }
      }, 'image/jpeg', 0.8)
    } catch (error) {
      console.error('Error capturing frame:', error)
      setIsProcessing(false)
    }
  }

  function speak(text: string) {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel()
      
      const speech = new SpeechSynthesisUtterance(text)
      speech.rate = 0.9
      speech.pitch = 1.0
      speech.volume = 0.8
      
      // Try to use a more natural voice if available
      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Google') || 
        voice.name.includes('Samantha') ||
        voice.name.includes('Alex')
      )
      if (preferredVoice) {
        speech.voice = preferredVoice
      }
      
      window.speechSynthesis.speak(speech)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background with subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-gray-900/20 to-transparent"></div>
      
      {/* Floating glass orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Premium Header */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-16 pb-8 px-6"
        >
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-xl">🧘</span>
                </div>
                <span className="text-2xl font-bold tracking-tight">AsanaSense</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-sm text-gray-400"
              >
                AI-Powered Yoga Coach
              </motion.div>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column - Hero Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
                  >
                    <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                      Perfect
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                      Your Pose
                    </span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xl text-gray-400 leading-relaxed max-w-lg"
                  >
                    AI-powered yoga coaching that listens, watches, and guides you to perfect form with real-time feedback.
                  </motion.p>
                </div>

                {/* Premium CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl border border-cyan-500/30 flex items-center justify-center">
                      <span className="text-2xl">🎤</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Voice Activated</p>
                      <p className="text-xs text-gray-500">Say "analyze" to start</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 flex items-center justify-center">
                      <span className="text-2xl">📹</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-300">Real-time Analysis</p>
                      <p className="text-xs text-gray-500">Instant pose feedback</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Column - Video Interface */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                className="relative"
              >
                <VideoCapture videoRef={videoRef} />
                
                {/* Voice Status Overlay */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -bottom-16 left-1/2 transform -translate-x-1/2"
                >
                  <VoicePulse isListening={isListening} isProcessing={isProcessing} />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>

        {/* Status Messages */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-4 flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm font-medium text-white">Analyzing your pose...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback Card */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl w-full px-6"
            >
              <FeedbackCard feedback={feedback} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
