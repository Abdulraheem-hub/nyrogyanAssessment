import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { doctorService, type Doctor } from '@/services/doctorService'
import { appointmentService } from '@/services/appointmentService'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Navbar from '@/components/layout/Navbar'

const BookAppointmentPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Form state
  const [patientName, setPatientName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [reason, setReason] = useState('')
  const [notes, setNotes] = useState('')
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState('')
  const [isBooking, setIsBooking] = useState(false)
  
  // Calendar state
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Available times
  const availableTimes = [
    '9:00 AM',
    '10:00 AM', 
    '11:00 AM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM'
  ]

  useEffect(() => {
    if (id) {
      fetchDoctor(id)
    }
  }, [id])

  const fetchDoctor = async (doctorId: string) => {
    try {
      setLoading(true)
      const doctorData = await doctorService.getDoctorById(parseInt(doctorId))
      setDoctor(doctorData)
      setError(null)
    } catch (err) {
      setError('Failed to load doctor details. Please try again.')
      console.error('Error fetching doctor:', err)
    } finally {
      setLoading(false)
    }
  }

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
    setSelectedDate(null)
  }

  const handleDateSelect = (day: number) => {
    setSelectedDate(day)
  }

  const handleBookAppointment = async () => {
    if (!patientName || !email || !selectedDate || !selectedTime || !doctor || !reason) {
      alert('Please fill in all required fields')
      return
    }

    setIsBooking(true)
    
    try {
      // Format date
      const formattedDate = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
      
      // Create appointment data
      const appointmentData = {
        doctorId: doctor.id,
        patientName,
        email,
        phone: phone || null,
        date: formattedDate,
        time: selectedTime,
        reason,
        notes: notes || null
      };

      // Book appointment via API
      const newAppointment = await appointmentService.bookAppointment(appointmentData);

      // Navigate to confirmation page with appointment data
      navigate('/appointment-confirmation', { 
        state: { appointment: newAppointment },
        replace: true 
      });
      
    } catch (err) {
      console.error('Error booking appointment:', err);
      alert('Failed to book appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12 w-full" />)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isSelected = selectedDate === day
      const isToday = new Date().getDate() === day && 
                     new Date().getMonth() === currentMonth.getMonth() && 
                     new Date().getFullYear() === currentMonth.getFullYear()

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-12 w-full text-sm font-medium leading-normal ${
            isSelected 
              ? 'text-slate-50' 
              : 'text-[#0e161b] hover:bg-gray-100'
          }`}
        >
          <div className={`flex size-full items-center justify-center rounded-full ${
            isSelected ? 'bg-[#1993e5]' : ''
          } ${isToday && !isSelected ? 'bg-gray-200' : ''}`}>
            {day}
          </div>
        </button>
      )
    }

    return days
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (error || !doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Doctor not found'}</p>
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
        
        <div className="flex flex-1 justify-center py-8">
          <div className="w-full max-w-4xl mx-auto px-6">
            
            {/* Header Section */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Book Your Appointment
              </h1>
              <p className="text-gray-600">
                Schedule your visit with {doctor.name}
              </p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              
              {/* Doctor Info Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-16 h-16 rounded-full bg-white/20 bg-cover bg-center"
                    style={{
                      backgroundImage: doctor.image 
                        ? `url("${doctor.image}")` 
                        : `url("https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face")`
                    }}
                  />
                  <div>
                    <h2 className="text-xl font-semibold">{doctor.name}</h2>
                    <p className="text-blue-100">{doctor.specialty}</p>
                    <p className="text-blue-100 text-sm">⭐ {doctor.rating} • {doctor.experience}</p>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  
                  {/* Left Column - Patient Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Patient Information
                      </h3>
                      
                      {/* Patient Name */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          placeholder="Enter your full name"
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                        />
                      </div>

                      {/* Email */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      {/* Phone (Optional) */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number (optional)"
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>

                      {/* Reason for Visit */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Reason for Visit *
                        </label>
                        <Input
                          placeholder="e.g., Regular checkup, Follow-up, Consultation"
                          className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </div>

                      {/* Additional Notes (Optional) */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          placeholder="Any additional information or symptoms (optional)"
                          className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Available Times */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Available Times
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {availableTimes.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-3 text-sm font-medium rounded-lg border-2 transition-all ${
                              selectedTime === time
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-blue-300 text-gray-700'
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Calendar */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Select Date
                      </h3>
                      
                      {/* Calendar */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        {/* Calendar Header */}
                        <div className="flex items-center justify-between mb-4">
                          <button 
                            onClick={handlePrevMonth}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <ChevronLeft size={20} className="text-gray-600" />
                          </button>
                          <h4 className="font-semibold text-gray-900">
                            {formatMonthYear(currentMonth)}
                          </h4>
                          <button 
                            onClick={handleNextMonth}
                            className="p-2 hover:bg-white rounded-lg transition-colors"
                          >
                            <ChevronRight size={20} className="text-gray-600" />
                          </button>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                          {/* Day headers */}
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                            <div key={day} className="h-8 flex items-center justify-center">
                              <span className="text-xs font-medium text-gray-500">{day}</span>
                            </div>
                          ))}
                          
                          {/* Calendar days */}
                          {renderCalendar()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Book Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex justify-center">
                    <Button
                      onClick={handleBookAppointment}
                      disabled={isBooking || !patientName || !email || !selectedDate || !selectedTime || !reason}
                      className="w-full max-w-md h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 disabled:hover:scale-100"
                    >
                      {isBooking ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Booking Appointment...
                        </>
                      ) : (
                        'Book Appointment'
                      )}
                    </Button>
                  </div>
                  
                  {/* Form validation message */}
                  {(!patientName || !email || !selectedDate || !selectedTime || !reason) && (
                    <p className="text-center text-sm text-gray-500 mt-3">
                      Please fill in all required fields to book your appointment
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Need to reschedule or cancel? You can manage your appointments in your profile.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointmentPage
