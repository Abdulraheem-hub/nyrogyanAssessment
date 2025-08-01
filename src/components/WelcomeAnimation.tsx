import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface WelcomeAnimationProps {
  onComplete: () => void
}

export default function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Auto-close after 8 seconds if user doesn't interact
    const timer = setTimeout(() => {
      handleClose()
    }, 8000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onComplete, 300)
  }

  return (
    <Dialog open={isVisible} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-4 sm:mx-auto">
        <div className="text-center">
          {/* Welcome Icon */}
          <div className="text-4xl sm:text-5xl mb-4">
            👋
          </div>

          {/* Title */}
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
              Welcome to NirogGyan Healthcare!
            </DialogTitle>
          </DialogHeader>

          {/* Simple Message */}
          <DialogDescription className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
            You have been automatically logged in with a default account. 
            You can now test all features without any registration.
          </DialogDescription>

          {/* Account Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">Demo Account Active</h4>
            <p className="text-xs sm:text-sm text-blue-700">
              <strong>User:</strong> Sample Patient<br />
              <strong>Status:</strong> Ready to explore all features
            </p>
          </div>

          {/* Close Button */}
          <Button
            onClick={handleClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Got it, let's explore! 🚀
          </Button>

          {/* Auto-close notice */}
          <p className="text-xs text-gray-500 mt-3">
            This message will auto-close in a few seconds
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
