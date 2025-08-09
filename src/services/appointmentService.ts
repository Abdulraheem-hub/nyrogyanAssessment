const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Mock appointments data for fallback
const mockAppointments: Appointment[] = [
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

export interface Appointment {
  id: number
  doctorId: number
  doctorName: string
  doctorSpecialty: string
  doctorImage: string
  patientName: string
  email: string
  phone?: string
  date: string
  time: string
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled'
  reason: string
  location?: string
  notes?: string
  createdAt: string
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  count?: number;
}

export const appointmentService = {
  // Mock data fallback functions
  getMockAppointments: (): Appointment[] => {
    return [...mockAppointments];
  },

  getMockAppointmentsByStatus: (status: string): Appointment[] => {
    if (!status || status === 'all') {
      return [...mockAppointments];
    }
    return mockAppointments.filter(appointment => appointment.status === status);
  },

  // Fetch API helper
  async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('Making appointment API request to:', url);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Appointment API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Appointment API Response:', result);
      return result;
    } catch (error) {
      console.error('Appointment API call failed:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please make sure the backend is running.');
      }
      throw error;
    }
  },

  // Get all appointments for the current user
  getAllAppointments: async (): Promise<Appointment[]> => {
    try {
      const response = await appointmentService.fetchApi<Appointment[]>('/appointments');
      return response.data;
    } catch (error) {
      console.warn('Failed to load appointments from API, using mock data:', error);
      return appointmentService.getMockAppointments();
    }
  },

  // Get appointments by status
  getAppointmentsByStatus: async (status: string): Promise<Appointment[]> => {
    try {
      const queryParams = new URLSearchParams();
      if (status && status !== 'all') {
        queryParams.append('status', status);
      }
      
      const queryString = queryParams.toString();
      const endpoint = `/appointments${queryString ? `?${queryString}` : ''}`;
      
      const response = await appointmentService.fetchApi<Appointment[]>(endpoint);
      return response.data;
    } catch (error) {
      console.warn('Failed to load appointments by status from API, using mock data:', error);
      return appointmentService.getMockAppointmentsByStatus(status);
    }
  },

  // Book a new appointment
  bookAppointment: async (appointmentData: {
    doctorId: number
    patientName: string
    email: string
    phone?: string | null
    date: string
    time: string
    reason: string
    notes?: string | null
  }): Promise<Appointment> => {
    try {
      const response = await appointmentService.fetchApi<Appointment>('/appointments', {
        method: 'POST',
        body: JSON.stringify(appointmentData),
      });
      return response.data;
    } catch (error) {
      console.warn('Failed to book appointment via API, using mock data:', error);
      // Create a mock appointment
      const newId = Math.max(...mockAppointments.map(a => a.id)) + 1;
      const mockAppointment: Appointment = {
        id: newId,
        doctorId: appointmentData.doctorId,
        patientName: appointmentData.patientName,
        email: appointmentData.email,
        phone: appointmentData.phone || undefined,
        date: appointmentData.date,
        time: appointmentData.time,
        reason: appointmentData.reason,
        notes: appointmentData.notes || undefined,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        doctorName: `Doctor ${appointmentData.doctorId}`,
        doctorSpecialty: 'General',
        doctorImage: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
      };
      mockAppointments.push(mockAppointment);
      return mockAppointment;
    }
  },

  // Cancel an appointment
  cancelAppointment: async (appointmentId: number): Promise<boolean> => {
    try {
      await appointmentService.fetchApi(`/appointments/${appointmentId}/cancel`, {
        method: 'PATCH',
      });
      return true;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      return false;
    }
  },

  // Get appointment by ID
  getAppointmentById: async (id: number): Promise<Appointment | null> => {
    try {
      const response = await appointmentService.fetchApi<Appointment>(`/appointments/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Failed to get appointment by ID from API, using mock data:', error);
      return mockAppointments.find(appointment => appointment.id === id) || null;
    }
  },

  // Update appointment
  updateAppointment: async (id: number, appointmentData: Partial<Appointment>): Promise<Appointment> => {
    const response = await appointmentService.fetchApi<Appointment>(`/appointments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointmentData),
    });
    return response.data;
  }
};
