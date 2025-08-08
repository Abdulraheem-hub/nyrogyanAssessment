// Using mock data instead of database
const mockAppointmentService = require('./mockAppointmentService');

class AppointmentService {
  async getAllAppointments() {
    return await mockAppointmentService.getAllAppointments();
  }

  async getAppointmentsByStatus(status) {
    return await mockAppointmentService.getAppointmentsByStatus(status);
  }

  async getAppointmentById(id) {
    return await mockAppointmentService.getAppointmentById(id);
  }

  async createAppointment(appointmentData) {
    return await mockAppointmentService.createAppointment(appointmentData);
  }

  async updateAppointment(id, appointmentData) {
    return await mockAppointmentService.updateAppointment(id, appointmentData);
  }

  async cancelAppointment(id) {
    return await mockAppointmentService.cancelAppointment(id);
  }

  async deleteAppointment(id) {
    return await mockAppointmentService.deleteAppointment(id);
  }
}

module.exports = new AppointmentService();
