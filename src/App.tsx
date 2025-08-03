import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './features/home/HomePage'
import DoctorsPage from './features/doctors/DoctorsPage'
import DoctorDetailPage from './features/doctor/DoctorDetailPage'
import BookAppointmentPage from './features/appointment/BookAppointmentPage'
import AppointmentConfirmationPage from './features/appointment/AppointmentConfirmationPage'
import AppointmentsPage from './features/appointment/AppointmentsPage'
import ProfilePage from './features/profile/ProfilePage'
import WelcomeAnimation from './components/WelcomeAnimation'

function AppContent() {
  const [showWelcome, setShowWelcome] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Show welcome message every time user visits the home page (root path)
    if (location.pathname === '/') {
      setShowWelcome(true)
    }
  }, [location.pathname])

  useEffect(() => {
    // Add keyboard shortcut for testing (Ctrl+Shift+W)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'W' && process.env.NODE_ENV === 'development') {
        e.preventDefault()
        setShowWelcome(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailPage />} />
        <Route path="/appointment/:id" element={<BookAppointmentPage />} />
        <Route path="/appointment-confirmation" element={<AppointmentConfirmationPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
