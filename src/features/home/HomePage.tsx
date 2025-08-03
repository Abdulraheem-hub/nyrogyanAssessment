import { MapPin, Phone, Clock, Award, Users, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import Navbar from '@/components/layout/Navbar'

const HomePage = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-slate-50 overflow-x-hidden" style={{ fontFamily: 'Lexend, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Header */}
        <Navbar showSearch={false} />

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-40 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">
            
            {/* Hero Section */}
            <div className="text-center py-12">
              <h1 className="text-[#0e161b] tracking-light text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Welcome to NirogGyan Healthcare
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                Your trusted healthcare partner providing comprehensive medical services with 
                state-of-the-art facilities and experienced medical professionals dedicated to your well-being.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/doctors">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                    Find a Doctor
                  </Button>
                </Link>
                <Link to="/appointments">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">24/7 Emergency</h3>
                  <p className="text-gray-600">Round-the-clock emergency services available</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Expert Care</h3>
                  <p className="text-gray-600">Certified and experienced medical professionals</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Comprehensive Care</h3>
                  <p className="text-gray-600">Complete healthcare solutions under one roof</p>
                </CardContent>
              </Card>
            </div>

            {/* About Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">About Our Healthcare Center</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  NirogGyan Healthcare has been serving the community for over two decades, providing 
                  exceptional medical care with a patient-first approach. Our modern facility is equipped 
                  with cutting-edge technology and staffed by dedicated healthcare professionals who are 
                  committed to delivering the highest standard of care.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We specialize in multiple medical disciplines including cardiology, neurology, 
                  orthopedics, pediatrics, and general medicine, ensuring comprehensive healthcare 
                  services for patients of all ages.
                </p>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-600">Medical Specialties</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Cardiology & Heart Care</li>
                      <li>• Neurology & Brain Health</li>
                      <li>• Orthopedics & Joint Care</li>
                      <li>• Pediatrics & Child Health</li>
                      <li>• General Medicine</li>
                      <li>• Emergency Care</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-3 text-blue-600">Diagnostic Services</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Advanced Imaging (MRI, CT, X-Ray)</li>
                      <li>• Laboratory Services</li>
                      <li>• Cardiac Testing (ECG, Echo)</li>
                      <li>• Preventive Health Checkups</li>
                      <li>• Health Screenings</li>
                      <li>• Telemedicine Consultations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="mb-12">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Contact & Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                      Location
                    </h4>
                    <p className="text-gray-700 mb-4">
                      123 Healthcare Avenue<br />
                      Medical District<br />
                      City, State 12345
                    </p>
                    
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <Phone className="h-5 w-5 text-blue-600 mr-2" />
                      Contact Information
                    </h4>
                    <p className="text-gray-700">
                      Emergency: +1 (555) 911-HELP<br />
                      Appointments: +1 (555) 123-CARE<br />
                      General Inquiries: +1 (555) 456-INFO
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4 flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      Operating Hours
                    </h4>
                    <div className="space-y-2 text-gray-700">
                      <p><span className="font-medium">Emergency Services:</span> 24/7</p>
                      <p><span className="font-medium">General Services:</span></p>
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday: 8:00 AM - 6:00 PM</p>
                      <p>Sunday: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Latest Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <h4 className="font-semibold text-blue-800 mb-2">New Telemedicine Services Now Available</h4>
                    <p className="text-blue-700">
                      We now offer virtual consultations for non-emergency cases. Schedule your online appointment today!
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-600">
                    <h4 className="font-semibold text-green-800 mb-2">Extended Weekend Hours</h4>
                    <p className="text-green-700">
                      Our facility now offers extended hours on weekends to better serve our community.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                    <h4 className="font-semibold text-purple-800 mb-2">Free Health Screening Camp</h4>
                    <p className="text-purple-700">
                      Join us for a free health screening camp next month. Early detection saves lives!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Take the first step towards better health. Our team is here to help you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/doctors">
                  <Button size="lg" className="w-full sm:w-auto px-8 py-3">
                    <Calendar className="h-5 w-5 mr-2" />
                    Schedule Appointment
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3">
                  <Phone className="h-5 w-5 mr-2" />
                  Contact Us
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
