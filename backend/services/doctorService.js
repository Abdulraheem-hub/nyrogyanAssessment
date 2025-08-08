// Using mock data instead of database
const mockDoctorService = require('./mockDoctorService');

class DoctorService {
  /**
   * Get all doctors with optional filtering
   * @param {Object} filters - Filter options
   * @param {string} filters.search - Search by name or specialty
   * @param {string} filters.specialty - Filter by specialty
   * @param {string} filters.availability - Filter by availability
   * @param {number} filters.limit - Limit number of results
   * @param {number} filters.offset - Offset for pagination
   * @returns {Promise<Array>} Array of doctors
   */
  async getAllDoctors(filters = {}) {
    return await mockDoctorService.getAllDoctors(filters);
  }

  /**
   * Get a doctor by ID
   * @param {number} id - Doctor ID
   * @returns {Promise<Object|null>} Doctor object or null if not found
   */
  async getDoctorById(id) {
    return await mockDoctorService.getDoctorById(parseInt(id));
  }

  /**
   * Get unique specialties
   * @returns {Promise<Array>} Array of specialties
   */
  async getSpecialties() {
    return await mockDoctorService.getSpecialties();
  }

  /**
   * Create a new doctor
   * @param {Object} doctorData - Doctor data
   * @returns {Promise<Object>} Created doctor with ID
   */
  async createDoctor(doctorData) {
    return await mockDoctorService.createDoctor(doctorData);
  }

  /**
   * Update a doctor
   * @param {number} id - Doctor ID
   * @param {Object} doctorData - Updated doctor data
   * @returns {Promise<Object|null>} Updated doctor or null if not found
   */
  async updateDoctor(id, doctorData) {
    return await mockDoctorService.updateDoctor(parseInt(id), doctorData);
  }

  /**
   * Delete a doctor
   * @param {number} id - Doctor ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteDoctor(id) {
    return await mockDoctorService.deleteDoctor(parseInt(id));
  }
}

module.exports = new DoctorService();
