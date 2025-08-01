import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { doctorService, type Doctor } from '@/services/doctorService'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'

interface Appointment {
  id: string
  doctorId: number
  doctorName: string
  doctorSpecialty: string
  patientName: string
  email: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
  createdAt: string
}

const AppointmentConfirmationPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    // Get appointment data from location state (passed from booking page)
    if (location.state?.appointment) {
      setAppointment(location.state.appointment)
      fetchDoctor(location.state.appointment.doctorId.toString())
    } else {
      // If no appointment data, redirect to home
      navigate('/')
    }
  }, [location.state, navigate])

  const fetchDoctor = async (doctorId: string) => {
    try {
      const doctorData = await doctorService.getDoctorById(parseInt(doctorId))
      setDoctor(doctorData)
    } catch (err) {
      console.error('Error fetching doctor:', err)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const handleViewInSchedule = () => {
    // Navigate to profile page with appointments tab active
    navigate('/profile', { state: { activeTab: 'appointments' } })
  }

  const handleCancelAppointment = () => {
    if (!appointment) return

    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this appointment? This action cannot be undone.'
    )

    if (confirmCancel) {
      // Update appointment status in localStorage
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const updatedAppointments = existingAppointments.map((apt: Appointment) => 
        apt.id === appointment.id ? { ...apt, status: 'cancelled' as const } : apt
      )
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))

      alert('Appointment cancelled successfully.')
      
      // Navigate to profile page
      navigate('/profile', { state: { activeTab: 'appointments' } })
    }
  }

  const handleRescheduleAppointment = () => {
    if (!appointment) return

    const confirmReschedule = window.confirm(
      'You will be redirected to book a new appointment. Your current appointment will be cancelled. Do you want to continue?'
    )

    if (confirmReschedule) {
      // Cancel current appointment
      const existingAppointments = JSON.parse(localStorage.getItem('appointments') || '[]')
      const updatedAppointments = existingAppointments.map((apt: Appointment) => 
        apt.id === appointment.id ? { ...apt, status: 'cancelled' as const } : apt
      )
      localStorage.setItem('appointments', JSON.stringify(updatedAppointments))

      // Navigate to book new appointment
      navigate(`/appointment/${appointment.doctorId}`)
    }
  }

  if (!appointment || !doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Loading appointment details...</p>
          <Button onClick={() => navigate('/')} className="hover:bg-blue-700 hover:scale-105 transition-all duration-200">
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" 
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar showSearch={false} />
        
        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            
            {/* Success Message */}
            <h2 className="text-[#0e161b] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Appointment Confirmed
            </h2>
            <p className="text-[#0e161b] text-base font-normal leading-normal pb-3 pt-1 px-4 text-center">
              Your appointment has been successfully scheduled. Please review the details below.
            </p>

            {/* Appointment Details */}
            <h3 className="text-[#0e161b] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Appointment Details
            </h3>
            <div className="p-4 grid grid-cols-[20%_1fr] gap-x-6">
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Date</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">{formatDate(appointment.date)}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Time</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">{appointment.time}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Doctor</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">{appointment.doctorName}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Specialization</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">{appointment.doctorSpecialty}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Office Address</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">123 Medical Drive, Suite 456, Anytown, USA</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Patient</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">{appointment.patientName}</p>
              </div>
              <div className="col-span-2 grid grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                <p className="text-[#4e7a97] text-sm font-normal leading-normal">Email</p>
                <p className="text-[#0e161b] text-sm font-normal leading-normal">{appointment.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 max-w-[480px] flex-col items-stretch px-4 py-3">
                <button
                  onClick={handleViewInSchedule}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#1993e5] text-slate-50 text-sm font-bold leading-normal tracking-[0.015em] w-full hover:bg-blue-700"
                >
                  <span className="truncate">View in Schedule</span>
                </button>
                <button
                  onClick={handleCancelAppointment}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7eef3] text-[#0e161b] text-sm font-bold leading-normal tracking-[0.015em] w-full hover:bg-gray-200"
                >
                  <span className="truncate">Cancel Appointment</span>
                </button>
                <button
                  onClick={handleRescheduleAppointment}
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#e7eef3] text-[#0e161b] text-sm font-bold leading-normal tracking-[0.015em] w-full hover:bg-gray-200"
                >
                  <span className="truncate">Reschedule Appointment</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentConfirmationPage
