import React from 'react'
import { motion } from 'framer-motion'

interface VoicePulseProps {
  isListening: boolean
  isProcessing: boolean
}

export default function VoicePulse({ isListening, isProcessing }: VoicePulseProps) {
  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Premium Voice Interface */}
      <div className="relative">
        {/* Outer glow rings */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: isListening ? [1, 1.6, 1] : 1,
            opacity: isListening ? [0.3, 0, 0.3] : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: isListening ? Infinity : 0,
            ease: "easeInOut"
          }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-sm"></div>
        </motion.div>
        
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: isListening ? [1, 2, 1] : 1,
            opacity: isListening ? [0.2, 0, 0.2] : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: isListening ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.8
          }}
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-md"></div>
        </motion.div>
        
        {/* Main voice button */}
        <motion.div
          className={`relative w-20 h-20 rounded-2xl flex items-center justify-center backdrop-blur-xl border transition-all duration-500 ${
            isProcessing 
              ? 'bg-gradient-to-br from-orange-500/30 to-red-500/30 border-orange-400/50 shadow-orange-500/20' 
              : isListening 
                ? 'bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-cyan-400/50 shadow-cyan-500/20' 
                : 'bg-black/40 border-white/20 shadow-white/10'
          }`}
          animate={{
            scale: isListening ? [1, 1.05, 1] : 1,
            boxShadow: isListening ? [
              '0 0 20px rgba(6, 182, 212, 0.3)',
              '0 0 40px rgba(6, 182, 212, 0.5)',
              '0 0 20px rgba(6, 182, 212, 0.3)'
            ] : '0 0 20px rgba(255, 255, 255, 0.1)',
          }}
          transition={{
            duration: 1.5,
            repeat: isListening ? Infinity : 0,
            ease: "easeInOut"
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            animate={{
              rotate: isProcessing ? 360 : 0,
            }}
            transition={{
              duration: 2,
              repeat: isProcessing ? Infinity : 0,
              ease: "linear"
            }}
            className="text-2xl"
          >
            {isProcessing ? '⏳' : '🎤'}
          </motion.div>
        </motion.div>
      </div>
      
      {/* Premium status indicator */}
      <motion.div
        key={isProcessing ? 'processing' : isListening ? 'listening' : 'ready'}
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.9 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center"
      >
        <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl backdrop-blur-sm border ${
          isProcessing 
            ? 'bg-orange-500/10 border-orange-400/30' 
            : isListening 
              ? 'bg-cyan-500/10 border-cyan-400/30' 
              : 'bg-white/5 border-white/10'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isProcessing 
              ? 'bg-orange-400 animate-pulse' 
              : isListening 
                ? 'bg-cyan-400 animate-pulse' 
                : 'bg-gray-400'
          }`}></div>
          <p className={`text-sm font-medium ${
            isProcessing 
              ? 'text-orange-300' 
              : isListening 
                ? 'text-cyan-300' 
                : 'text-gray-400'
          }`}>
            {isProcessing 
              ? 'Analyzing pose...' 
              : isListening 
                ? 'Listening...' 
                : 'Ready'
            }
          </p>
        </div>
      </motion.div>
    </div>
  )
}
  