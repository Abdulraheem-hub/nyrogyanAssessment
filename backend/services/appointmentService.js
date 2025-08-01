const { pool } = require('../config/database');

class AppointmentService {
  async getAllAppointments() {
    try {
      const query = `
        SELECT 
          a.id,
          a.doctor_id as doctorId,
          a.patient_name as patientName,
          a.email,
          a.phone,
          a.date,
          a.time,
          a.reason,
          a.notes,
          a.status,
          a.created_at as createdAt,
          d.name as doctorName,
          d.specialty as doctorSpecialty,
          d.image as doctorImage
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        ORDER BY a.date DESC, a.time ASC
      `;
      
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  }

  async getAppointmentsByStatus(status) {
    try {
      let query = `
        SELECT 
          a.id,
          a.doctor_id as doctorId,
          a.patient_name as patientName,
          a.email,
          a.phone,
          a.date,
          a.time,
          a.reason,
          a.notes,
          a.status,
          a.created_at as createdAt,
          d.name as doctorName,
          d.specialty as doctorSpecialty,
          d.image as doctorImage
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
      `;
      
      const params = [];
      
      if (status && status !== 'all') {
        query += ' WHERE a.status = ?';
        params.push(status);
      }
      
      query += ' ORDER BY a.date DESC, a.time ASC';
      
      const [rows] = await pool.execute(query, params);
      return rows;
    } catch (error) {
      console.error('Error fetching appointments by status:', error);
      throw error;
    }
  }

  async getAppointmentById(id) {
    try {
      const query = `
        SELECT 
          a.id,
          a.doctor_id as doctorId,
          a.patient_name as patientName,
          a.email,
          a.phone,
          a.date,
          a.time,
          a.reason,
          a.notes,
          a.status,
          a.created_at as createdAt,
          d.name as doctorName,
          d.specialty as doctorSpecialty,
          d.image as doctorImage
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.id = ?
      `;
      
      const [rows] = await pool.execute(query, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error fetching appointment by id:', error);
      throw error;
    }
  }

  async createAppointment(appointmentData) {
    try {
      const {
        doctorId,
        patientName,
        email,
        phone,
        date,
        time,
        reason,
        notes,
        status = 'confirmed'
      } = appointmentData;

      const query = `
        INSERT INTO appointments (
          doctor_id, patient_name, email, phone, date, time, 
          reason, notes, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const [result] = await pool.execute(query, [
        doctorId, 
        patientName, 
        email, 
        phone || null, 
        date, 
        time,
        reason, 
        notes || null, 
        status
      ]);

      // Return the created appointment with doctor details
      return await this.getAppointmentById(result.insertId);
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }

  async updateAppointment(id, appointmentData) {
    try {
      const allowedFields = [
        'patient_name', 'email', 'phone', 'date', 'time',
        'reason', 'notes', 'status'
      ];
      
      const updates = [];
      const values = [];
      
      Object.keys(appointmentData).forEach(key => {
        const dbField = key === 'patientName' ? 'patient_name' : key;
        if (allowedFields.includes(dbField)) {
          updates.push(`${dbField} = ?`);
          values.push(appointmentData[key]);
        }
      });
      
      if (updates.length === 0) {
        throw new Error('No valid fields to update');
      }
      
      values.push(id);
      
      const query = `
        UPDATE appointments 
        SET ${updates.join(', ')}, updated_at = NOW()
        WHERE id = ?
      `;
      
      await pool.execute(query, values);
      
      return await this.getAppointmentById(id);
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw error;
    }
  }

  async cancelAppointment(id) {
    try {
      const query = `
        UPDATE appointments 
        SET status = 'cancelled', updated_at = NOW()
        WHERE id = ?
      `;
      
      const [result] = await pool.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  }

  async deleteAppointment(id) {
    try {
      const query = 'DELETE FROM appointments WHERE id = ?';
      const [result] = await pool.execute(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw error;
    }
  }
}

module.exports = new AppointmentService();
