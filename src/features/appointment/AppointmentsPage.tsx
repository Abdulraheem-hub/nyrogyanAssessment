import { useState, useEffect } from 'react'
import { Loader2, Calendar, Clock, MapPin, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'
import { appointmentService, type Appointment } from '@/services/appointmentService'

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    fetchAppointments()
  }, [selectedStatus])

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      const data = await appointmentService.getAppointmentsByStatus(selectedStatus)
      setAppointments(data)
      setError(null)
    } catch (err) {
      setError('Failed to load appointments. Please try again.')
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancelAppointment = async (appointmentId: number) => {
    try {
      const success = await appointmentService.cancelAppointment(appointmentId)
      if (success) {
        // Refresh appointments
        fetchAppointments()
      } else {
        alert('Failed to cancel appointment. Please try again.')
      }
    } catch (err) {
      alert('Error cancelling appointment. Please try again.')
      console.error('Error cancelling appointment:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
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

  const isUpcoming = (dateString: string) => {
    const appointmentDate = new Date(dateString)
    const today = new Date()
    return appointmentDate >= today
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar showSearch={false} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading appointments...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <Navbar showSearch={false} />
      
      <div className="px-4 sm:px-6 lg:px-40 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Appointments
            </h1>
            <p className="text-gray-600">
              Manage and view all your healthcare appointments
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All Appointments' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'pending', label: 'Pending' },
              { key: 'completed', label: 'Completed' },
              { key: 'cancelled', label: 'Cancelled' }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={selectedStatus === filter.key ? 'default' : 'outline'}
                onClick={() => setSelectedStatus(filter.key)}
                className="text-sm hover:scale-105 transition-all duration-200"
              >
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
                <Button 
                  onClick={fetchAppointments} 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                >
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Appointments List */}
          {appointments.length === 0 && !error ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-600 mb-4">
                {selectedStatus === 'all' 
                  ? "You haven't booked any appointments yet." 
                  : `No ${selectedStatus} appointments found.`}
              </p>
              <Link to="/">
                <Button className="hover:bg-blue-700 hover:scale-105 transition-all duration-200">Book Your First Appointment</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="w-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Doctor Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
                          <AvatarFallback>
                            <User className="h-8 w-8" />
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {appointment.doctorName}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {appointment.doctorSpecialty}
                          </p>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(appointment.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>{appointment.time}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Appointment Details */}
                      <div className="lg:w-80">
                        <div className="mb-4">
                          <Badge className={`${getStatusColor(appointment.status)} mb-2`}>
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </Badge>
                          <p className="text-sm text-gray-600">
                            <strong>Reason:</strong> {appointment.reason}
                          </p>
                          {appointment.notes && (
                            <p className="text-sm text-gray-600 mt-1">
                              <strong>Notes:</strong> {appointment.notes}
                            </p>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Link to={`/doctor/${appointment.doctorId}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                              View Doctor
                            </Button>
                          </Link>
                          
                          {appointment.status === 'confirmed' && isUpcoming(appointment.date) && (
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleCancelAppointment(appointment.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:scale-105 transition-all duration-200"
                            >
                              Cancel
                            </Button>
                          )}
                          
                          {appointment.status === 'pending' && (
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700 hover:scale-105 transition-all duration-200"
                            >
                              Confirm
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Book New Appointment */}
          {appointments.length > 0 && (
            <div className="mt-8 text-center">
              <Link to="/">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                  Book Another Appointment
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AppointmentsPage
