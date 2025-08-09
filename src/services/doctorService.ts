const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

// Mock doctors data for fallback
const mockDoctors: Doctor[] = [
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
  // Mock data helper methods
  private getMockDoctors(filters?: DoctorFilters): Doctor[] {
    let filteredDoctors = [...mockDoctors];

    if (filters) {
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredDoctors = filteredDoctors.filter(doctor => 
          doctor.name.toLowerCase().includes(searchTerm) ||
          doctor.specialty.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.specialty) {
        filteredDoctors = filteredDoctors.filter(doctor => doctor.specialty === filters.specialty);
      }

      if (filters.availability) {
        filteredDoctors = filteredDoctors.filter(doctor => doctor.availability === filters.availability);
      }

      if (filters.limit) {
        const offset = filters.offset || 0;
        filteredDoctors = filteredDoctors.slice(offset, offset + filters.limit);
      }
    }

    return filteredDoctors;
  }

  private getMockDoctorById(id: number): Doctor | null {
    return mockDoctors.find(doctor => doctor.id === id) || null;
  }

  private getMockSpecialties(): string[] {
    const specialties = [...new Set(mockDoctors.map(doctor => doctor.specialty))];
    return specialties.sort();
  }

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
    try {
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
    } catch (error) {
      console.warn('Failed to load doctors from API, using mock data:', error);
      return this.getMockDoctors(filters);
    }
  }

  async getDoctorById(id: number): Promise<Doctor> {
    try {
      const response = await this.fetchApi<Doctor>(`/doctors/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Failed to load doctor from API, using mock data:', error);
      const doctor = this.getMockDoctorById(id);
      if (!doctor) {
        throw new Error(`Doctor with ID ${id} not found`);
      }
      return doctor;
    }
  }

  async getSpecialties(): Promise<string[]> {
    try {
      const response = await this.fetchApi<string[]>('/doctors/specialties');
      return response.data;
    } catch (error) {
      console.warn('Failed to load specialties from API, using mock data:', error);
      return this.getMockSpecialties();
    }
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
