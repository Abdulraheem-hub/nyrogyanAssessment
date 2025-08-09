// Mock data for appointments when database is not available
let mockAppointments = [
  {
    id: 1,
    doctorId: 1,
    patientName: "John Smith",
    email: "john.smith@email.com",
    phone: "+1-555-1001",
    date: "2025-08-15",
    time: "10:00",
    reason: "Regular checkup",
    location: "Downtown Medical Center",
    notes: "Patient complains of chest pain occasionally",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    doctorName: "Dr. Sarah Johnson",
    doctorSpecialty: "Cardiologist",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    doctorId: 3,
    patientName: "Emma Wilson",
    email: "emma.wilson@email.com",
    phone: "+1-555-1002",
    date: "2025-08-16",
    time: "14:30",
    reason: "Child vaccination",
    location: "Pediatric Care Clinic",
    notes: "5-year-old needs routine vaccinations",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    doctorName: "Dr. Emily Rodriguez",
    doctorSpecialty: "Pediatrician",
    doctorImage: "https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    doctorId: 4,
    patientName: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1-555-1003",
    date: "2025-08-18",
    time: "09:00",
    reason: "Knee pain consultation",
    location: "Orthopedic Sports Center",
    notes: "Sports injury from running",
    status: "pending",
    createdAt: new Date().toISOString(),
    doctorName: "Dr. James Wilson",
    doctorSpecialty: "Orthopedic Surgeon",
    doctorImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    doctorId: 2,
    patientName: "Sarah Davis",
    email: "sarah.davis@email.com",
    phone: "+1-555-1004",
    date: "2025-08-20",
    time: "11:15",
    reason: "Headache and memory issues",
    location: "Neurology Institute",
    notes: "Frequent migraines, family history of neurological issues",
    status: "confirmed",
    createdAt: new Date().toISOString(),
    doctorName: "Dr. Michael Chen",
    doctorSpecialty: "Neurologist",
    doctorImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    doctorId: 5,
    patientName: "David Johnson",
    email: "david.johnson@email.com",
    phone: "+1-555-1005",
    date: "2025-08-22",
    time: "15:45",
    reason: "Skin rash examination",
    location: "Dermatology Center",
    notes: "Persistent rash on arms and face",
    status: "cancelled",
    createdAt: new Date().toISOString(),
    doctorName: "Dr. Lisa Anderson",
    doctorSpecialty: "Dermatologist",
    doctorImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  }
];

// Mock doctors data for enriching appointment data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedic Surgeon",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Dermatologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "Gastroenterologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 7,
    name: "Dr. Amanda Davis",
    specialty: "Gynecologist",
    image: "https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face"
  }
];

class MockAppointmentService {
  async getAllAppointments() {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    return mockAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async getAppointmentsByStatus(status) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (!status || status === 'all') {
      return mockAppointments.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return mockAppointments
      .filter(appointment => appointment.status === status)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  async getAppointmentById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const appointmentId = parseInt(id);
    return mockAppointments.find(appointment => appointment.id === appointmentId) || null;
  }

  async createAppointment(appointmentData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const {
      doctorId,
      patientName,
      email,
      phone,
      date,
      time,
      reason,
      location,
      notes,
      status = 'confirmed'
    } = appointmentData;

    // Find doctor info to enrich appointment data
    const doctor = mockDoctors.find(d => d.id === parseInt(doctorId));
    
    // Default locations based on specialty
    const defaultLocations = {
      'Cardiologist': 'Heart Care Center',
      'Neurologist': 'Neurology Institute', 
      'Pediatrician': 'Children\'s Medical Center',
      'Orthopedic Surgeon': 'Orthopedic Sports Center',
      'Dermatologist': 'Dermatology Center',
      'Gastroenterologist': 'Digestive Health Clinic',
      'Gynecologist': 'Women\'s Health Center'
    };
    
    const appointmentLocation = location || 
      (doctor ? defaultLocations[doctor.specialty] : null) || 
      'Main Medical Center';
    
    const newAppointment = {
      id: Math.max(...mockAppointments.map(a => a.id), 0) + 1,
      doctorId: parseInt(doctorId),
      patientName,
      email,
      phone: phone || null,
      date,
      time,
      reason,
      location: appointmentLocation,
      notes: notes || null,
      status,
      createdAt: new Date().toISOString(),
      doctorName: doctor ? doctor.name : `Doctor ${doctorId}`,
      doctorSpecialty: doctor ? doctor.specialty : 'General',
      doctorImage: doctor ? doctor.image : null
    };

    mockAppointments.push(newAppointment);
    
    return newAppointment;
  }

  async updateAppointment(id, appointmentData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const appointmentId = parseInt(id);
    const index = mockAppointments.findIndex(appointment => appointment.id === appointmentId);
    
    if (index === -1) {
      return null;
    }

    // Update appointment with provided data
    const allowedFields = [
      'patientName', 'email', 'phone', 'date', 'time',
      'reason', 'notes', 'status'
    ];
    
    const updatedAppointment = { ...mockAppointments[index] };
    
    Object.keys(appointmentData).forEach(key => {
      if (allowedFields.includes(key) && appointmentData[key] !== undefined) {
        updatedAppointment[key] = appointmentData[key];
      }
    });
    
    updatedAppointment.updatedAt = new Date().toISOString();
    
    mockAppointments[index] = updatedAppointment;
    
    return updatedAppointment;
  }

  async cancelAppointment(id) {
    await new Promise(resolve => setTimeout(resolve, 250));
    
    const appointmentId = parseInt(id);
    const index = mockAppointments.findIndex(appointment => appointment.id === appointmentId);
    
    if (index === -1) {
      return false;
    }

    mockAppointments[index] = {
      ...mockAppointments[index],
      status: 'cancelled',
      updatedAt: new Date().toISOString()
    };
    
    return true;
  }

  async deleteAppointment(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const appointmentId = parseInt(id);
    const index = mockAppointments.findIndex(appointment => appointment.id === appointmentId);
    
    if (index === -1) {
      return false;
    }

    mockAppointments.splice(index, 1);
    return true;
  }
}

module.exports = new MockAppointmentService();
