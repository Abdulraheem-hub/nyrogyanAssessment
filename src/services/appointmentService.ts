const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

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
    const response = await appointmentService.fetchApi<Appointment[]>('/appointments');
    return response.data;
  },

  // Get appointments by status
  getAppointmentsByStatus: async (status: string): Promise<Appointment[]> => {
    const queryParams = new URLSearchParams();
    if (status && status !== 'all') {
      queryParams.append('status', status);
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/appointments${queryString ? `?${queryString}` : ''}`;
    
    const response = await appointmentService.fetchApi<Appointment[]>(endpoint);
    return response.data;
  },

  // Book a new appointment
  bookAppointment: async (appointmentData: {
    doctorId: number
    patientName: string
    email: string
    phone?: string
    date: string
    time: string
    reason: string
    notes?: string
  }): Promise<Appointment> => {
    const response = await appointmentService.fetchApi<Appointment>('/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
    return response.data;
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
      console.error('Error fetching appointment:', error);
      return null;
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
