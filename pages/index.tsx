import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoCapture from '../components/VideoCapture'
import FeedbackCard from '../components/FeedbackCard'
import VoicePulse from '../components/VoicePulse'

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [feedback, setFeedback] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const voiceEnabledRef = useRef(false)
  const isProcessingRef = useRef(false)

  const speak = useCallback((text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()

    const speech = new SpeechSynthesisUtterance(text)
    speech.rate = 0.9
    speech.pitch = 1.0
    speech.volume = 0.8

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
  }, [])

  const captureFrame = useCallback(async () => {
    const video = videoRef.current
    if (!video || isProcessingRef.current) return

    isProcessingRef.current = true
    setIsProcessing(true)

    try {
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        await new Promise<void>((resolve) => {
          const handleLoadedMetadata = () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata)
            resolve()
          }

          video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
        })
      }

      const canvas = document.createElement('canvas')
      const width = video.videoWidth || 1280
      const height = video.videoHeight || 720
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        throw new Error('Unable to access canvas context')
      }

      ctx.drawImage(video, 0, 0, width, height)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/jpeg', 0.8)
      )

      if (!blob) {
        throw new Error('Failed to capture image from video stream')
      }

      const formData = new FormData()
      formData.append('file', blob, 'pose.jpg')

      const res = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
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
      isProcessingRef.current = false
      setIsProcessing(false)
    }
  }, [speak])

  useEffect(() => {
    let isMounted = true
    navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        facingMode: 'user'
      }
    }).then((stream) => {
      if (isMounted && videoRef.current) {
        videoRef.current.srcObject = stream
      }
    }).catch((err) => {
      console.error('Error accessing camera:', err)
    })

    return () => {
      isMounted = false
      const stream = videoRef.current?.srcObject as MediaStream | null
      stream?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const SpeechRecognitionImpl = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition

    if (!SpeechRecognitionImpl) {
      console.warn('Speech recognition is not supported in this browser.')
      setSpeechSupported(false)
      return
    }

    const speechRecognition: SpeechRecognition = new SpeechRecognitionImpl()
    setSpeechSupported(true)
    speechRecognition.continuous = true
    speechRecognition.interimResults = false
    speechRecognition.lang = 'en-US'

    speechRecognition.onstart = () => {
      setIsListening(true)
    }

    speechRecognition.onresult = (e: SpeechRecognitionEvent) => {
      const result = e.results[e.results.length - 1]
      if (!result) return
      const text = String(result[0].transcript || '').toLowerCase().trim()
      console.log('Heard:', text)
      if (
        text.includes('analyze') ||
        text.includes('analyse') ||
        text.includes('click') ||
        text.includes('capture') ||
        text.includes('take picture') ||
        text.includes('take photo')
      ) {
        captureFrame()
      }
    }

    speechRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event)
      setIsListening(false)
      voiceEnabledRef.current = false
      setVoiceEnabled(false)
    }

    speechRecognition.onend = () => {
      setIsListening(false)
      if (voiceEnabledRef.current) {
        try {
          speechRecognition.start()
        } catch (error) {
          console.error('Failed to restart speech recognition:', error)
        }
      }
    }

    recognitionRef.current = speechRecognition

    return () => {
      voiceEnabledRef.current = false
      recognitionRef.current = null
      try {
        speechRecognition.stop()
      } catch (error) {
        console.error('Error stopping speech recognition:', error)
      }
      speechRecognition.onstart = null
      speechRecognition.onresult = null
      speechRecognition.onerror = null
      speechRecognition.onend = null
    }
  }, [captureFrame])

  async function startListening() {
    try {
      // Request mic permission via user gesture
      await navigator.mediaDevices.getUserMedia({ audio: true })
      if (!speechSupported) {
        console.warn('Speech recognition is not available in this browser.')
        return
      }

      const recognition = recognitionRef.current

      if (!recognition) {
        console.warn('Speech recognition is not ready yet.')
        return
      }

      voiceEnabledRef.current = true
      setVoiceEnabled(true)

      try {
        recognition.stop()
      } catch (error) {
        // It's safe to ignore if recognition was not running yet
      }
      try {
        recognition.start()
      } catch (error) {
        console.error('Failed to start speech recognition:', error)
        voiceEnabledRef.current = false
        setVoiceEnabled(false)
      }
    } catch (err) {
      voiceEnabledRef.current = false
      setVoiceEnabled(false)
      console.error('Microphone permission error:', err)
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

                {/* Enable Voice Button (required by some browsers) */}
                {speechSupported ? (
                  !voiceEnabled && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <button
                        onClick={startListening}
                        className="btn-premium focus-premium"
                      >
                        Enable Voice
                      </button>
                    </motion.div>
                  )
                ) : (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    className="text-sm text-gray-400"
                  >
                    Voice commands are not supported in this browser. Use the mic button below to capture your pose manually.
                  </motion.p>
                )}
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
                  <VoicePulse 
                    isListening={isListening} 
                    isProcessing={isProcessing} 
                    onCapture={captureFrame}
                  />
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
