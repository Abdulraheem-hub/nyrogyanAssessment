import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { doctorService, type Doctor } from '@/services/doctorService'
import Navbar from '@/components/layout/Navbar'

const DoctorsPage = () => {
  const navigate = useNavigate()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedAvailability, setSelectedAvailability] = useState('')

  // Fetch doctors and specialties on component mount
  useEffect(() => {
    fetchInitialData()
  }, [])

  // Fetch doctors when filters change
  useEffect(() => {
    fetchDoctors()
  }, [searchTerm, selectedSpecialty, selectedAvailability])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [doctorsData, specialtiesData] = await Promise.all([
        doctorService.getAllDoctors(),
        doctorService.getSpecialties()
      ])
      setDoctors(doctorsData)
      setSpecialties(specialtiesData)
      setError(null)
    } catch (err) {
      setError('Failed to load data. Please try again.')
      console.error('Error fetching initial data:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchDoctors = async () => {
    try {
      const filters = {
        search: searchTerm || undefined,
        specialty: selectedSpecialty || undefined,
        availability: selectedAvailability || undefined,
      }
      
      const doctorsData = await doctorService.getAllDoctors(filters)
      setDoctors(doctorsData)
      setError(null)
    } catch (err) {
      setError('Failed to load doctors. Please try again.')
      console.error('Error fetching doctors:', err)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleBookAppointment = (doctorId: number, doctorAvailability: string) => {
    if (doctorAvailability === "Busy") {
      alert("This doctor is currently unavailable for appointments.")
      return
    }
    // Navigate to appointment booking page
    navigate(`/appointment/${doctorId}`)
  }

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value)
  }

  const handleAvailabilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAvailability(e.target.value)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading doctors...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <Navbar searchValue={searchTerm} onSearchChange={setSearchTerm} />

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <h1 className="text-[#0e161b] tracking-light text-2xl sm:text-3xl lg:text-[32px] font-bold leading-tight">
                Find a Doctor
              </h1>
            </div>
            
            {/* Search and Filter Section */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="sm:col-span-2 lg:col-span-1">
                  <Input 
                    placeholder="Search by name or specialty" 
                    className="h-12 w-full" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div>
                  <select 
                    className="w-full h-12 px-3 border border-input bg-background rounded-md text-sm"
                    value={selectedSpecialty}
                    onChange={handleSpecialtyChange}
                  >
                    <option value="">All Specialties</option>
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>{specialty}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <select 
                    className="w-full h-12 px-3 border border-input bg-background rounded-md text-sm"
                    value={selectedAvailability}
                    onChange={handleAvailabilityChange}
                  >
                    <option value="">All Availability</option>
                    <option value="Available">Available Today</option>
                    <option value="Busy">Busy</option>
                  </select>
                </div>
              </div>
            </div>

            <h2 className="text-[#0e161b] text-lg sm:text-xl lg:text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Doctors {doctors.length > 0 && `(${doctors.length})`}
            </h2>
            
            {/* Error Message */}
            {error && (
              <div className="px-4 py-3">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                  <Button 
                    onClick={fetchInitialData} 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 hover:scale-105 transition-all duration-200"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}
            
            {/* Doctors List */}
            <div className="space-y-4 px-4">
              {doctors.length === 0 && !error ? (
                <div className="text-center py-8">
                  <p className="text-gray-600">No doctors found matching your criteria.</p>
                  <Button 
                    onClick={() => {
                      setSearchTerm('')
                      setSelectedSpecialty('')
                      setSelectedAvailability('')
                    }} 
                    variant="outline" 
                    className="mt-2 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                doctors.map((doctor) => (
                  <Card key={doctor.id} className="w-full">
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
                      <Avatar className="h-16 w-16 mx-auto sm:mx-0">
                        <AvatarImage src={doctor.image} alt={doctor.name} />
                        <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="text-center sm:text-left">
                            <h3 className="text-lg font-semibold text-[#0e161b]">{doctor.name}</h3>
                            <p className="text-sm text-gray-600">{doctor.specialty}</p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 mt-2">
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="text-sm font-medium">{doctor.rating}</span>
                              </div>
                              <span className="text-sm text-gray-600">{doctor.experience} experience</span>
                              <Badge 
                                variant={doctor.availability === "Available" ? "default" : "secondary"}
                                className={doctor.availability === "Available" ? "bg-green-100 text-green-800" : ""}
                              >
                                {doctor.availability}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                            <Link to={`/doctor/${doctor.id}`} className="w-full sm:w-auto">
                              <Button variant="outline" size="sm" className="w-full sm:w-auto hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                                View Profile
                              </Button>
                            </Link>
                            <Button 
                              size="sm" 
                              disabled={doctor.availability === "Busy"}
                              onClick={() => handleBookAppointment(doctor.id, doctor.availability)}
                              className="w-full sm:w-auto hover:bg-gray-100 hover:scale-105 transition-all duration-200 disabled:hover:bg-gray-400 disabled:hover:scale-100"
                            >
                              Book Appointment
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More */}
            {doctors.length > 0 && doctors.length >= 10 && (
              <div className="flex justify-center py-6">
                <Button variant="outline" className="hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                  Load More Doctors
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorsPage