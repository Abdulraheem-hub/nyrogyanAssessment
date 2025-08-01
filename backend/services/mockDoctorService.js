// Mock data for development when database is not available
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    experience: "15 years",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    email: "sarah.johnson@healthfirst.com",
    phone: "+1-555-0101",
    education: "MD from Harvard Medical School, Fellowship in Cardiology",
    about: "Experienced cardiologist specializing in preventive heart care and advanced cardiac procedures.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    experience: "12 years",
    availability: "Busy",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    email: "michael.chen@healthfirst.com",
    phone: "+1-555-0102",
    education: "MD from Johns Hopkins, Neurology Residency at Mayo Clinic",
    about: "Expert in treating neurological disorders including epilepsy, stroke, and neurodegenerative diseases.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    experience: "10 years",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face",
    email: "emily.rodriguez@healthfirst.com",
    phone: "+1-555-0103",
    education: "MD from Stanford University, Pediatric Residency at UCSF",
    about: "Dedicated pediatrician focused on child development, preventive care, and family health.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    rating: 4.7,
    experience: "18 years",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
    email: "james.wilson@healthfirst.com",
    phone: "+1-555-0104",
    education: "MD from Yale School of Medicine, Orthopedic Surgery Fellowship",
    about: "Specializes in joint replacement, sports medicine, and minimally invasive orthopedic procedures.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Dermatologist",
    rating: 4.8,
    experience: "8 years",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
    email: "lisa.anderson@healthfirst.com",
    phone: "+1-555-0105",
    education: "MD from UCLA, Dermatology Residency at NYU",
    about: "Expert in medical and cosmetic dermatology, skin cancer treatment, and aesthetic procedures.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Gastroenterologist",
    rating: 4.6,
    experience: "14 years",
    availability: "Busy",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    email: "robert.taylor@healthfirst.com",
    phone: "+1-555-0106",
    education: "MD from University of Pennsylvania, GI Fellowship at Cleveland Clinic",
    about: "Specializes in digestive disorders, endoscopy, and inflammatory bowel disease treatment.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 7,
    name: "Dr. Amanda Davis",
    specialty: "Gynecologist",
    rating: 4.9,
    experience: "11 years",
    availability: "Available",
    image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face",
    email: "amanda.davis@healthfirst.com",
    phone: "+1-555-0107",
    education: "MD from Northwestern University, OB/GYN Residency at Mass General",
    about: "Comprehensive womens health care including obstetrics, gynecology, and reproductive health.",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

class MockDoctorService {
  async getAllDoctors(filters = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let results = [...mockDoctors];

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm) ||
        doctor.specialty.toLowerCase().includes(searchTerm)
      );
    }

    // Apply specialty filter
    if (filters.specialty) {
      results = results.filter(doctor => doctor.specialty === filters.specialty);
    }

    // Apply availability filter
    if (filters.availability) {
      results = results.filter(doctor => doctor.availability === filters.availability);
    }

    // Apply pagination
    if (filters.limit) {
      const limit = parseInt(filters.limit);
      const offset = parseInt(filters.offset) || 0;
      results = results.slice(offset, offset + limit);
    }

    return results;
  }

  async getDoctorById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockDoctors.find(doctor => doctor.id === id) || null;
  }

  async getSpecialties() {
    await new Promise(resolve => setTimeout(resolve, 100));
    const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialty))];
    return specialties.sort();
  }

  async createDoctor(doctorData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newDoctor = {
      id: Math.max(...mockDoctors.map(d => d.id)) + 1,
      ...doctorData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    mockDoctors.push(newDoctor);
    return newDoctor;
  }

  async updateDoctor(id, doctorData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockDoctors.findIndex(doctor => doctor.id === id);
    if (index === -1) return null;
    
    mockDoctors[index] = {
      ...mockDoctors[index],
      ...doctorData,
      updated_at: new Date().toISOString()
    };
    return mockDoctors[index];
  }

  async deleteDoctor(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockDoctors.findIndex(doctor => doctor.id === id);
    if (index === -1) return false;
    
    mockDoctors.splice(index, 1);
    return true;
  }
}

module.exports = new MockDoctorService();
