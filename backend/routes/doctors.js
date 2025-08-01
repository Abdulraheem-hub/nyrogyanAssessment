const express = require('express');
const doctorService = require('../services/doctorService');
const mockDoctorService = require('../services/mockDoctorService');

const router = express.Router();

// Use mock service if database is not available
const getServiceInstance = () => {
  // Check if we should use mock data (you can set this via environment variable)
  if (process.env.USE_MOCK_DATA === 'true') {
    console.log('Using mock data service');
    return mockDoctorService;
  }
  return doctorService;
};

/**
 * GET /api/doctors
 * Get all doctors with optional filtering
 * Query parameters:
 * - search: Search by name or specialty
 * - specialty: Filter by specialty
 * - availability: Filter by availability (Available, Busy)
 * - limit: Limit number of results
 * - offset: Offset for pagination
 */
router.get('/', async (req, res) => {
  try {
    const service = getServiceInstance();
    const filters = {
      search: req.query.search,
      specialty: req.query.specialty,
      availability: req.query.availability,
      limit: req.query.limit,
      offset: req.query.offset
    };

    // Remove undefined values
    Object.keys(filters).forEach(key => {
      if (filters[key] === undefined) {
        delete filters[key];
      }
    });

    const doctors = await service.getAllDoctors(filters);
    
    res.json({
      success: true,
      data: doctors,
      count: doctors.length
    });
  } catch (error) {
    console.error('Error fetching doctors:', error);
    
    // If database error, try mock service
    if (error.message.includes('database') || error.message.includes('connection')) {
      try {
        console.log('Database error, falling back to mock data');
        const filters = {
          search: req.query.search,
          specialty: req.query.specialty,
          availability: req.query.availability,
          limit: req.query.limit,
          offset: req.query.offset
        };
        
        Object.keys(filters).forEach(key => {
          if (filters[key] === undefined) {
            delete filters[key];
          }
        });
        
        const doctors = await mockDoctorService.getAllDoctors(filters);
        
        res.json({
          success: true,
          data: doctors,
          count: doctors.length,
          note: 'Using mock data - database not available'
        });
        return;
      } catch (mockError) {
        console.error('Mock service also failed:', mockError);
      }
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctors',
      error: error.message
    });
  }
});

/**
 * GET /api/doctors/specialties
 * Get all unique specialties
 */
router.get('/specialties', async (req, res) => {
  try {
    const service = getServiceInstance();
    const specialties = await service.getSpecialties();
    
    res.json({
      success: true,
      data: specialties
    });
  } catch (error) {
    console.error('Error fetching specialties:', error);
    
    // Fallback to mock service
    try {
      const specialties = await mockDoctorService.getSpecialties();
      res.json({
        success: true,
        data: specialties,
        note: 'Using mock data - database not available'
      });
    } catch (mockError) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch specialties',
        error: error.message
      });
    }
  }
});

/**
 * GET /api/doctors/:id
 * Get a doctor by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    const doctor = await doctorService.getDoctorById(parseInt(id));
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor
    });
  } catch (error) {
    console.error('Error fetching doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch doctor',
      error: error.message
    });
  }
});

/**
 * POST /api/doctors
 * Create a new doctor
 */
router.post('/', async (req, res) => {
  try {
    const doctorData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'specialty'];
    const missingFields = requiredFields.filter(field => !doctorData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const doctor = await doctorService.createDoctor(doctorData);
    
    res.status(201).json({
      success: true,
      data: doctor,
      message: 'Doctor created successfully'
    });
  } catch (error) {
    console.error('Error creating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create doctor',
      error: error.message
    });
  }
});

/**
 * PUT /api/doctors/:id
 * Update a doctor
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const doctorData = req.body;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    const doctor = await doctorService.updateDoctor(parseInt(id), doctorData);
    
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      data: doctor,
      message: 'Doctor updated successfully'
    });
  } catch (error) {
    console.error('Error updating doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update doctor',
      error: error.message
    });
  }
});

/**
 * DELETE /api/doctors/:id
 * Delete a doctor
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid doctor ID'
      });
    }

    const deleted = await doctorService.deleteDoctor(parseInt(id));
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting doctor:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete doctor',
      error: error.message
    });
  }
});

module.exports = router;
