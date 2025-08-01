import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { doctorService, type Doctor } from '@/services/doctorService'
import { Loader2, Calendar, Star, ThumbsUp, ThumbsDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Navbar from '@/components/layout/Navbar'

const DoctorDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('about')

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

  const handleBookAppointment = () => {
    if (doctor?.availability === "Busy") {
      alert("This doctor is currently unavailable for appointments.")
      return
    }
    // Navigate to appointment booking page
    navigate(`/appointment/${id}`)
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
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'location', label: 'Location' }
  ]

  return (
    <div 
      className="relative flex size-full min-h-screen flex-col bg-slate-50 group/design-root overflow-x-hidden" 
      style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Navbar */}
        <Navbar showSearch={false} />
        
        <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <Link className="text-[#4e7a97] text-base font-medium leading-normal hover:text-[#0e161b]" to="/">
                Find a doctor
              </Link>
              <span className="text-[#4e7a97] text-base font-medium leading-normal">/</span>
              <span className="text-[#0e161b] text-base font-medium leading-normal">{doctor.name}</span>
            </div>

            {/* Doctor Profile Header */}
            <div className="flex p-4">
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <div className="flex gap-4">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32"
                    style={{
                      backgroundImage: doctor.image 
                        ? `url("${doctor.image}")` 
                        : `url("https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face")`
                    }}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em]">
                      {doctor.name}
                    </p>
                    <p className="text-[#4e7a97] text-base font-normal leading-normal">
                      {doctor.specialty}
                    </p>
                    <p className="text-[#4e7a97] text-base font-normal leading-normal">
                      123 Medical Drive, Suite 456, Anytown, USA
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:items-end">
                  <Button 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 flex items-center gap-2 hover:scale-105 transition-all duration-200 disabled:hover:scale-100"
                    disabled={doctor.availability === "Busy"}
                    onClick={handleBookAppointment}
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </Button>
                  <p className="text-sm text-[#4e7a97] text-right">
                    {doctor.availability === "Available" 
                      ? "Next available: Today" 
                      : "Currently unavailable"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="pb-3">
              <div className="flex border-b border-[#d0dee7] px-4 gap-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      activeTab === tab.id
                        ? 'border-b-[#1993e5] text-[#0e161b]'
                        : 'border-b-transparent text-[#4e7a97] hover:text-[#0e161b]'
                    }`}
                  >
                    <p className={`text-sm font-bold leading-normal tracking-[0.015em] ${
                      activeTab === tab.id ? 'text-[#0e161b]' : 'text-[#4e7a97]'
                    }`}>
                      {tab.label}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'about' && (
              <>
                <h2 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  About {doctor.name}
                </h2>
                <p className="text-[#0e161b] text-base font-normal leading-normal pb-3 pt-1 px-4">
                  {doctor.about || `Dr. ${doctor.name.split(' ')[1]} is a board-certified ${doctor.specialty.toLowerCase()} physician with over 15 years of experience. They specialize in preventive care, chronic disease management, and women's health. Dr. ${doctor.name.split(' ')[1]} is committed to providing compassionate and comprehensive care to their patients.`}
                </p>

                <h2 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Education & Training
                </h2>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-[20%_1fr] gap-x-6">
                  <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal">Medical School</p>
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">
                      {doctor.education || "University of California, San Francisco"}
                    </p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal">Residency</p>
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">
                      Stanford Health Care
                    </p>
                  </div>
                  <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal">Board Certification</p>
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">
                      American Board of {doctor.specialty}
                    </p>
                  </div>
                  {doctor.email && (
                    <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                      <p className="text-[#4e7a97] text-sm font-normal leading-normal">Email</p>
                      <p className="text-[#0e161b] text-sm font-normal leading-normal">
                        {doctor.email}
                      </p>
                    </div>
                  )}
                  {doctor.phone && (
                    <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-subgrid border-t border-t-[#d0dee7] py-5">
                      <p className="text-[#4e7a97] text-sm font-normal leading-normal">Phone</p>
                      <p className="text-[#0e161b] text-sm font-normal leading-normal">
                        {doctor.phone}
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}

            {activeTab === 'reviews' && (
              <>
                <h2 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                  Patient Reviews
                </h2>
                
                {/* Rating Overview */}
                <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-[#0e161b] text-4xl font-black leading-tight tracking-[-0.033em]">4.8</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-[18px] h-[18px] ${star <= 4 ? 'text-[#1993e5] fill-current' : 'text-[#1993e5]'}`}
                        />
                      ))}
                    </div>
                    <p className="text-[#0e161b] text-base font-normal leading-normal">235 reviews</p>
                  </div>
                  
                  {/* Rating Breakdown */}
                  <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">5</p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dee7]">
                      <div className="rounded-full bg-[#1993e5]" style={{ width: '70%' }}></div>
                    </div>
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal text-right">70%</p>
                    
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">4</p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dee7]">
                      <div className="rounded-full bg-[#1993e5]" style={{ width: '20%' }}></div>
                    </div>
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal text-right">20%</p>
                    
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">3</p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dee7]">
                      <div className="rounded-full bg-[#1993e5]" style={{ width: '5%' }}></div>
                    </div>
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal text-right">5%</p>
                    
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">2</p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dee7]">
                      <div className="rounded-full bg-[#1993e5]" style={{ width: '3%' }}></div>
                    </div>
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal text-right">3%</p>
                    
                    <p className="text-[#0e161b] text-sm font-normal leading-normal">1</p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#d0dee7]">
                      <div className="rounded-full bg-[#1993e5]" style={{ width: '2%' }}></div>
                    </div>
                    <p className="text-[#4e7a97] text-sm font-normal leading-normal text-right">2%</p>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="flex flex-col gap-8 overflow-x-hidden bg-slate-50 p-4">
                  {/* Review 1 */}
                  <div className="flex flex-col gap-3 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1494790108755-2616b612b665?w=40&h=40&fit=crop&crop=face")' }}
                      />
                      <div className="flex-1">
                        <p className="text-[#0e161b] text-base font-medium leading-normal">Sarah Miller</p>
                        <p className="text-[#4e7a97] text-sm font-normal leading-normal">2 months ago</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-5 h-5 text-[#1993e5] fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[#0e161b] text-base font-normal leading-normal">
                      Dr. {doctor.name.split(' ')[1]} is an excellent physician. They are thorough, knowledgeable, and truly care about their patients. I highly recommend them.
                    </p>
                    <div className="flex gap-9 text-[#4e7a97]">
                      <button className="flex items-center gap-2 hover:text-[#1993e5]">
                        <ThumbsUp className="w-5 h-5" />
                        <p className="text-inherit">12</p>
                      </button>
                      <button className="flex items-center gap-2 hover:text-[#1993e5]">
                        <ThumbsDown className="w-5 h-5" />
                        <p className="text-inherit">2</p>
                      </button>
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="flex flex-col gap-3 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face")' }}
                      />
                      <div className="flex-1">
                        <p className="text-[#0e161b] text-base font-medium leading-normal">David Lee</p>
                        <p className="text-[#4e7a97] text-sm font-normal leading-normal">3 months ago</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4].map((star) => (
                        <Star 
                          key={star} 
                          className="w-5 h-5 text-[#1993e5] fill-current"
                        />
                      ))}
                      <Star className="w-5 h-5 text-[#aec6d5]" />
                    </div>
                    <p className="text-[#0e161b] text-base font-normal leading-normal">
                      Dr. {doctor.name.split(' ')[1]} is a good doctor, but the wait times can be long. Overall, I had a positive experience.
                    </p>
                    <div className="flex gap-9 text-[#4e7a97]">
                      <button className="flex items-center gap-2 hover:text-[#1993e5]">
                        <ThumbsUp className="w-5 h-5" />
                        <p className="text-inherit">8</p>
                      </button>
                      <button className="flex items-center gap-2 hover:text-[#1993e5]">
                        <ThumbsDown className="w-5 h-5" />
                        <p className="text-inherit">1</p>
                      </button>
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="flex flex-col gap-3 bg-slate-50">
                    <div className="flex items-center gap-3">
                      <div
                        className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face")' }}
                      />
                      <div className="flex-1">
                        <p className="text-[#0e161b] text-base font-medium leading-normal">Jessica Chen</p>
                        <p className="text-[#4e7a97] text-sm font-normal leading-normal">4 months ago</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className="w-5 h-5 text-[#1993e5] fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[#0e161b] text-base font-normal leading-normal">
                      Dr. {doctor.name.split(' ')[1]} is amazing! They took the time to listen to my concerns and provided me with the best possible care. I feel so much better after seeing them.
                    </p>
                    <div className="flex gap-9 text-[#4e7a97]">
                      <button className="flex items-center gap-2 hover:text-[#1993e5]">
                        <ThumbsUp className="w-5 h-5" />
                        <p className="text-inherit">15</p>
                      </button>
                      <button className="flex items-center gap-2 hover:text-[#1993e5]">
                        <ThumbsDown className="w-5 h-5" />
                        <p className="text-inherit">3</p>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'insurance' && (
              <div className="px-4 py-5">
                <h2 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  Insurance Information
                </h2>
                <p className="text-[#0e161b] text-base font-normal leading-normal pb-4">
                  Dr. {doctor.name} accepts the following insurance plans:
                </p>
                <div className="grid gap-3">
                  {[
                    'Blue Cross Blue Shield',
                    'Aetna',
                    'Cigna',
                    'UnitedHealthcare',
                    'Medicare',
                    'Medicaid'
                  ].map((insurance) => (
                    <div key={insurance} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-[#d0dee7]">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-[#0e161b] text-sm font-medium">{insurance}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#4e7a97] text-sm mt-4">
                  Please verify your insurance coverage before your appointment.
                </p>
              </div>
            )}

            {activeTab === 'location' && (
              <div className="px-4 py-5">
                <h2 className="text-[#0e161b] text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">
                  Office Location
                </h2>
                <div className="flex px-0 py-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl object-cover"
                    style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop")' }}
                  />
                </div>
                <div className="mt-4 space-y-2">
                  <p className="text-[#0e161b] text-base font-medium">123 Medical Drive, Suite 456</p>
                  <p className="text-[#4e7a97] text-base">Anytown, USA 12345</p>
                  <p className="text-[#4e7a97] text-sm">Phone: (555) 123-4567</p>
                  <p className="text-[#4e7a97] text-sm">Fax: (555) 123-4568</p>
                </div>
                <div className="mt-4">
                  <h3 className="text-[#0e161b] text-lg font-semibold mb-2">Office Hours</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#4e7a97]">Monday - Friday:</span>
                      <span className="text-[#0e161b]">8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4e7a97]">Saturday:</span>
                      <span className="text-[#0e161b]">9:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#4e7a97]">Sunday:</span>
                      <span className="text-[#0e161b]">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetailPage
