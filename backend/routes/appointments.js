const express = require('express');
const router = express.Router();
const appointmentService = require('../services/appointmentService');

// GET /api/appointments - Get all appointments or filter by status
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    let appointments;
    if (status) {
      appointments = await appointmentService.getAppointmentsByStatus(status);
    } else {
      appointments = await appointmentService.getAllAppointments();
    }

    res.json({
      success: true,
      data: appointments,
      count: appointments.length
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments',
      message: error.message
    });
  }
});

// GET /api/appointments/:id - Get appointment by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await appointmentService.getAppointmentById(parseInt(id));
    
    if (!appointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (error) {
    console.error('Error fetching appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointment',
      message: error.message
    });
  }
});

// POST /api/appointments - Create new appointment
router.post('/', async (req, res) => {
  try {
    const {
      doctorId,
      patientName,
      email,
      phone,
      date,
      time,
      reason,
      notes
    } = req.body;

    // Validate required fields
    if (!doctorId || !patientName || !email || !date || !time) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'doctorId, patientName, email, date, and time are required'
      });
    }

    const appointmentData = {
      doctorId: parseInt(doctorId),
      patientName,
      email,
      phone,
      date,
      time,
      reason: reason || 'General consultation',
      notes,
      status: 'confirmed'
    };

    const newAppointment = await appointmentService.createAppointment(appointmentData);

    res.status(201).json({
      success: true,
      data: newAppointment,
      message: 'Appointment created successfully'
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create appointment',
      message: error.message
    });
  }
});

// PUT /api/appointments/:id - Update appointment
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const appointmentData = req.body;

    const updatedAppointment = await appointmentService.updateAppointment(
      parseInt(id),
      appointmentData
    );

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      data: updatedAppointment,
      message: 'Appointment updated successfully'
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update appointment',
      message: error.message
    });
  }
});

// PATCH /api/appointments/:id/cancel - Cancel appointment
router.patch('/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await appointmentService.cancelAppointment(parseInt(id));

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to cancel appointment',
      message: error.message
    });
  }
});

// DELETE /api/appointments/:id - Delete appointment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await appointmentService.deleteAppointment(parseInt(id));

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete appointment',
      message: error.message
    });
  }
});

module.exports = router;
