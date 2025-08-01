import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Bell, User, Calendar, Settings, Loader2, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Navbar from '@/components/layout/Navbar'
import { appointmentService, type Appointment } from '@/services/appointmentService'

const ProfilePage = () => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('overview')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    // Check if we should set a specific tab from navigation state
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab)
    }
  }, [location.state])

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
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

  const isUpcoming = (dateString: string) => {
    const appointmentDate = new Date(dateString)
    const today = new Date()
    return appointmentDate >= today
  }

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#d0dee7]">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#d0dee7]">
          <div className="flex items-center">
            <User className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[#d0dee7]">
          <div className="flex items-center">
            <Bell className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">
                {appointments.filter(apt => apt.status === 'confirmed' && isUpcoming(apt.date)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg shadow-sm border border-[#d0dee7]">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2">
                <Loader2 className="h-6 w-6 animate-spin" />
                <span>Loading appointments...</span>
              </div>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No appointments found. Book your first appointment!</p>
              <Link to="/">
                <Button className="hover:bg-blue-700 hover:scale-105 transition-all duration-200">
                  Book Your First Appointment
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.slice(0, 3).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={appointment.doctorImage} alt={appointment.doctorName} />
                      <AvatarFallback>
                        <User className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                      <p className="text-sm text-gray-500">{appointment.doctorSpecialty}</p>
                      <p className="text-sm text-gray-500">{formatDate(appointment.date)} at {appointment.time}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </Badge>
                </div>
              ))}
              {appointments.length > 3 && (
                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setActiveTab('appointments')}
                    className="hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    View All Appointments
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderAppointments = () => (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
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
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span>Loading appointments...</span>
          </div>
        </div>
      ) : appointments.length === 0 && !error ? (
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
      {appointments.length > 0 && !loading && (
        <div className="mt-8 text-center">
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 transition-all duration-200">
              Book Another Appointment
            </Button>
          </Link>
        </div>
      )}
    </div>
  )

  const renderSettings = () => (
    <div className="bg-white rounded-lg shadow-sm border border-[#d0dee7]">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Profile Information</h4>
            <p className="text-sm text-gray-600">Update your personal information and contact details.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Notification Preferences</h4>
            <p className="text-sm text-gray-600">Manage how you receive appointment reminders and updates.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <h4 className="font-medium text-gray-900 mb-2">Privacy Settings</h4>
            <p className="text-sm text-gray-600">Control who can see your information and health records.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Account Management</h4>
            <p className="text-sm text-gray-600">Change password, deactivate account, or delete your data.</p>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" 
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Navbar showSearch={false} />
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            {/* Header */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#0e161b] tracking-light text-[32px] font-bold leading-tight min-w-72">
                My Profile
              </p>
            </div>

            {/* Profile Info */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm border border-[#d0dee7]">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Abdul Raheem Khan</h2>
                  <p className="text-gray-600">abdulraheemzais@email.com</p>
                  <p className="text-sm text-gray-500">Member since January 2024</p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-[#d0dee7] mb-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'overview'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-4 h-4" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('appointments')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'appointments'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Calendar className="w-4 h-4" />
                Appointments
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-lg border-b-2 ${
                  activeTab === 'settings'
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1">
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'appointments' && renderAppointments()}
              {activeTab === 'settings' && renderSettings()}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
