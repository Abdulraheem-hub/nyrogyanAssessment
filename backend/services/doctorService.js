const { pool } = require('../config/database');

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
    try {
      let query = 'SELECT * FROM doctors WHERE 1=1';
      const queryParams = [];

      // Add search filter
      if (filters.search) {
        query += ' AND (name LIKE ? OR specialty LIKE ?)';
        const searchTerm = `%${filters.search}%`;
        queryParams.push(searchTerm, searchTerm);
      }

      // Add specialty filter
      if (filters.specialty) {
        query += ' AND specialty = ?';
        queryParams.push(filters.specialty);
      }

      // Add availability filter
      if (filters.availability) {
        query += ' AND availability = ?';
        queryParams.push(filters.availability);
      }

      // Add ordering
      query += ' ORDER BY name ASC';

      // Add pagination
      if (filters.limit) {
        query += ' LIMIT ?';
        queryParams.push(parseInt(filters.limit));
        
        if (filters.offset) {
          query += ' OFFSET ?';
          queryParams.push(parseInt(filters.offset));
        }
      }

      const [rows] = await pool.execute(query, queryParams);
      return rows;
    } catch (error) {
      throw new Error(`Failed to fetch doctors: ${error.message}`);
    }
  }

  /**
   * Get a doctor by ID
   * @param {number} id - Doctor ID
   * @returns {Promise<Object|null>} Doctor object or null if not found
   */
  async getDoctorById(id) {
    try {
      const [rows] = await pool.execute(
        'SELECT * FROM doctors WHERE id = ?',
        [id]
      );
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw new Error(`Failed to fetch doctor: ${error.message}`);
    }
  }

  /**
   * Get unique specialties
   * @returns {Promise<Array>} Array of specialties
   */
  async getSpecialties() {
    try {
      const [rows] = await pool.execute(
        'SELECT DISTINCT specialty FROM doctors ORDER BY specialty ASC'
      );
      return rows.map(row => row.specialty);
    } catch (error) {
      throw new Error(`Failed to fetch specialties: ${error.message}`);
    }
  }

  /**
   * Create a new doctor
   * @param {Object} doctorData - Doctor data
   * @returns {Promise<Object>} Created doctor with ID
   */
  async createDoctor(doctorData) {
    try {
      const {
        name,
        specialty,
        rating = 0.0,
        experience,
        availability = 'Available',
        image,
        email,
        phone,
        education,
        about
      } = doctorData;

      const [result] = await pool.execute(
        `INSERT INTO doctors (name, specialty, rating, experience, availability, image, email, phone, education, about) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, specialty, rating, experience, availability, image, email, phone, education, about]
      );

      return await this.getDoctorById(result.insertId);
    } catch (error) {
      throw new Error(`Failed to create doctor: ${error.message}`);
    }
  }

  /**
   * Update a doctor
   * @param {number} id - Doctor ID
   * @param {Object} doctorData - Updated doctor data
   * @returns {Promise<Object|null>} Updated doctor or null if not found
   */
  async updateDoctor(id, doctorData) {
    try {
      const existingDoctor = await this.getDoctorById(id);
      if (!existingDoctor) {
        return null;
      }

      const updateFields = [];
      const updateValues = [];

      // Build dynamic update query
      Object.keys(doctorData).forEach(key => {
        if (doctorData[key] !== undefined && key !== 'id') {
          updateFields.push(`${key} = ?`);
          updateValues.push(doctorData[key]);
        }
      });

      if (updateFields.length === 0) {
        return existingDoctor;
      }

      updateValues.push(id);
      const query = `UPDATE doctors SET ${updateFields.join(', ')} WHERE id = ?`;
      
      await pool.execute(query, updateValues);
      return await this.getDoctorById(id);
    } catch (error) {
      throw new Error(`Failed to update doctor: ${error.message}`);
    }
  }

  /**
   * Delete a doctor
   * @param {number} id - Doctor ID
   * @returns {Promise<boolean>} True if deleted, false if not found
   */
  async deleteDoctor(id) {
    try {
      const [result] = await pool.execute(
        'DELETE FROM doctors WHERE id = ?',
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Failed to delete doctor: ${error.message}`);
    }
  }
}

module.exports = new DoctorService();
