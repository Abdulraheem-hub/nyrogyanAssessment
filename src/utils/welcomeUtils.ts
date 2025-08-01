// Utility functions for the welcome animation

export const resetWelcomeAnimation = () => {
  localStorage.removeItem('nirogGyan_hasVisited')
  window.location.reload()
}

export const hasUserVisited = () => {
  return localStorage.getItem('nirogGyan_hasVisited') === 'true'
}

export const markUserAsVisited = () => {
  localStorage.setItem('nirogGyan_hasVisited', 'true')
}

// Add global function for testing in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).resetWelcome = resetWelcomeAnimation
  console.log('🎉 Welcome Animation Utils Available:')
  console.log('- Run resetWelcome() in console to reset welcome animation')
  console.log('- Press Ctrl+Shift+W to reset welcome animation')
}
