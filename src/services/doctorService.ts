const API_BASE_URL = 'http://localhost:5000/api';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  availability: 'Available' | 'Busy';
  image?: string;
  email?: string;
  phone?: string;
  education?: string;
  about?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
  count?: number;
}

export interface DoctorFilters {
  search?: string;
  specialty?: string;
  availability?: string;
  limit?: number;
  offset?: number;
}

class DoctorService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('Making API request to:', url);
      
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
        console.error('API Error:', errorData);
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Response:', result);
      return result;
    } catch (error) {
      console.error('API call failed:', error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Unable to connect to server. Please make sure the backend is running.');
      }
      throw error;
    }
  }

  async getAllDoctors(filters?: DoctorFilters): Promise<Doctor[]> {
    const queryParams = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value.toString());
        }
      });
    }

    const queryString = queryParams.toString();
    const endpoint = `/doctors${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.fetchApi<Doctor[]>(endpoint);
    return response.data;
  }

  async getDoctorById(id: number): Promise<Doctor> {
    const response = await this.fetchApi<Doctor>(`/doctors/${id}`);
    return response.data;
  }

  async getSpecialties(): Promise<string[]> {
    const response = await this.fetchApi<string[]>('/doctors/specialties');
    return response.data;
  }

  async createDoctor(doctorData: Omit<Doctor, 'id' | 'created_at' | 'updated_at'>): Promise<Doctor> {
    const response = await this.fetchApi<Doctor>('/doctors', {
      method: 'POST',
      body: JSON.stringify(doctorData),
    });
    return response.data;
  }

  async updateDoctor(id: number, doctorData: Partial<Doctor>): Promise<Doctor> {
    const response = await this.fetchApi<Doctor>(`/doctors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(doctorData),
    });
    return response.data;
  }

  async deleteDoctor(id: number): Promise<void> {
    await this.fetchApi(`/doctors/${id}`, {
      method: 'DELETE',
    });
  }
}

export const doctorService = new DoctorService();
