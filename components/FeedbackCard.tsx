import React from 'react'
import { motion } from 'framer-motion'

export default function FeedbackCard({ feedback }: { feedback: string }) {
  return (
    <motion.div
      className="relative bg-black/60 backdrop-blur-2xl p-8 rounded-3xl text-white shadow-2xl max-w-3xl mx-auto border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.8 
      }}
    >
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
      
      {/* Outer glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-sm opacity-50"></div>
      
      <div className="relative z-10">
        {/* Header with premium styling */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🧘</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                Pose Analysis
              </h2>
              <p className="text-sm text-gray-400 font-medium">AI-Powered Feedback</p>
            </div>
          </div>
          
          {/* Premium status indicator */}
          <div className="flex items-center space-x-2 bg-green-500/10 border border-green-400/30 rounded-xl px-3 py-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-green-300">Live</span>
          </div>
        </div>
        
        {/* Feedback content */}
        <div className="space-y-4">
          <p className="text-gray-200 leading-relaxed text-lg font-medium">
            {feedback}
          </p>
          
          {/* Premium action hint */}
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <div className="w-1 h-1 bg-cyan-400 rounded-full"></div>
            <span>Continue practicing for more detailed feedback</span>
          </div>
        </div>
      </div>
      
      {/* Decorative corner accents */}
      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-60"></div>
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40"></div>
    </motion.div>
  )
}
