const mysql = require('mysql2/promise');
require('dotenv').config();

async function initializeDatabase() {
  let connection;
  
  try {
    // First, connect to MySQL without specifying a database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: process.env.DB_PORT || 3306,
    });

    console.log('✅ Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'healthcare_db';
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✅ Database '${dbName}' created or already exists`);

    // Use the database
    await connection.query(`USE \`${dbName}\``);

    // Create doctors table
    const createDoctorsTable = `
      CREATE TABLE IF NOT EXISTS doctors (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        specialty VARCHAR(255) NOT NULL,
        rating DECIMAL(2,1) DEFAULT 0.0,
        experience VARCHAR(100),
        availability ENUM('Available', 'Busy') DEFAULT 'Available',
        image VARCHAR(500),
        email VARCHAR(255),
        phone VARCHAR(20),
        education VARCHAR(500),
        about TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT NULL
      )
    `;

    await connection.query(createDoctorsTable);
    console.log('✅ Doctors table created successfully');

    // Create appointments table
    const createAppointmentsTable = `
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        doctor_id INT NOT NULL,
        patient_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        date DATE NOT NULL,
        time VARCHAR(10) NOT NULL,
        reason TEXT,
        notes TEXT,
        status ENUM('pending', 'confirmed', 'completed', 'cancelled') DEFAULT 'confirmed',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT NULL,
        FOREIGN KEY (doctor_id) REFERENCES doctors(id) ON DELETE CASCADE,
        INDEX idx_doctor_id (doctor_id),
        INDEX idx_date (date),
        INDEX idx_status (status)
      )
    `;

    await connection.query(createAppointmentsTable);
    console.log('✅ Appointments table created successfully');

    // Check if table already has data
    const [existingData] = await connection.query('SELECT COUNT(*) as count FROM doctors');
    if (existingData[0].count > 0) {
      console.log('✅ Table already has data, skipping sample data insertion');
      return;
    }

    // Insert sample data
    const insertSampleDoctors = `
      INSERT INTO doctors (name, specialty, rating, experience, availability, image, email, phone, education, about) VALUES 
      ('Dr. Sarah Johnson', 'Cardiologist', 4.9, '15 years', 'Available', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face', 'sarah.johnson@healthfirst.com', '+1-555-0101', 'MD from Harvard Medical School, Fellowship in Cardiology', 'Experienced cardiologist specializing in preventive heart care and advanced cardiac procedures.'),
      ('Dr. Michael Chen', 'Neurologist', 4.8, '12 years', 'Busy', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face', 'michael.chen@healthfirst.com', '+1-555-0102', 'MD from Johns Hopkins, Neurology Residency at Mayo Clinic', 'Expert in treating neurological disorders including epilepsy, stroke, and neurodegenerative diseases.'),
      ('Dr. Emily Rodriguez', 'Pediatrician', 4.9, '10 years', 'Available', 'https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face', 'emily.rodriguez@healthfirst.com', '+1-555-0103', 'MD from Stanford University, Pediatric Residency at UCSF', 'Dedicated pediatrician focused on child development, preventive care, and family health.'),
      ('Dr. James Wilson', 'Orthopedic Surgeon', 4.7, '18 years', 'Available', 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face', 'james.wilson@healthfirst.com', '+1-555-0104', 'MD from Yale School of Medicine, Orthopedic Surgery Fellowship', 'Specializes in joint replacement, sports medicine, and minimally invasive orthopedic procedures.'),
      ('Dr. Lisa Anderson', 'Dermatologist', 4.8, '8 years', 'Available', 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face', 'lisa.anderson@healthfirst.com', '+1-555-0105', 'MD from UCLA, Dermatology Residency at NYU', 'Expert in medical and cosmetic dermatology, skin cancer treatment, and aesthetic procedures.'),
      ('Dr. Robert Taylor', 'Gastroenterologist', 4.6, '14 years', 'Busy', 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face', 'robert.taylor@healthfirst.com', '+1-555-0106', 'MD from University of Pennsylvania, GI Fellowship at Cleveland Clinic', 'Specializes in digestive disorders, endoscopy, and inflammatory bowel disease treatment.'),
      ('Dr. Amanda Davis', 'Gynecologist', 4.9, '11 years', 'Available', 'https://images.unsplash.com/photo-1594824706002-5dc2ef20edd2?w=150&h=150&fit=crop&crop=face', 'amanda.davis@healthfirst.com', '+1-555-0107', 'MD from Northwestern University, OB/GYN Residency at Mass General', 'Comprehensive womens health care including obstetrics, gynecology, and reproductive health.')
    `;

    await connection.query(insertSampleDoctors);
    console.log('✅ Sample doctors data inserted successfully');

    console.log('🎉 Database initialization completed successfully!');

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = { initializeDatabase };
