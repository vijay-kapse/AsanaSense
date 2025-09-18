import React from 'react'
import { motion } from 'framer-motion'

export default function VideoCapture({ videoRef }: { videoRef: React.RefObject<HTMLVideoElement> }) {
  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Premium Glass Container */}
      <div className="relative group">
        {/* Outer glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-sm group-hover:blur-md transition-all duration-500"></div>
        
        {/* Main glass container */}
        <div className="relative bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
          {/* Video container with premium styling */}
          <div className="relative overflow-hidden rounded-2xl bg-black/50">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Premium overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5 rounded-2xl pointer-events-none"></div>
            
            {/* Corner accent */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60"></div>
          </div>
          
          {/* Premium instructions */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-6 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/10">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className="text-sm font-medium text-gray-300">
                Say <span className="text-cyan-400 font-semibold">"analyze"</span> to start
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
  