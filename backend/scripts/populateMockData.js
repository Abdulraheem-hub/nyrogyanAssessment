const mysql = require('mysql2/promise');
require('dotenv').config();

async function populateMockData() {
  let connection;
  
  try {
    // Connect to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'healthcare_db',
      port: process.env.DB_PORT || 3306,
    });

    console.log('✅ Connected to database');

    // Clear existing appointments (but keep doctors)
    await connection.query('DELETE FROM appointments');
    console.log('✅ Cleared existing appointments');

    // Insert comprehensive appointment data
    const appointmentsData = `
      INSERT INTO appointments (
        doctor_id, patient_name, email, phone, date, time, 
        reason, notes, status, created_at
      ) VALUES 
      -- Confirmed appointments (upcoming)
      (1, 'Sarah Wilson', 'sarah.wilson@email.com', '+1-555-0201', '2025-08-05', '10:00 AM', 'Regular heart checkup', 'Patient has family history of heart disease', 'confirmed', '2025-07-25 09:00:00'),
      (1, 'Michael Thompson', 'michael.t@email.com', '+1-555-0202', '2025-08-07', '2:30 PM', 'Follow-up consultation', 'Previous ECG showed minor irregularities', 'confirmed', '2025-07-26 14:30:00'),
      (2, 'Emily Davis', 'emily.davis@email.com', '+1-555-0203', '2025-08-06', '11:15 AM', 'Headache consultation', 'Experiencing frequent migraines for 2 weeks', 'confirmed', '2025-07-27 11:00:00'),
      (3, 'James Rodriguez', 'james.r@email.com', '+1-555-0204', '2025-08-08', '9:00 AM', 'Child vaccination', 'Annual vaccination schedule', 'confirmed', '2025-07-28 16:45:00'),
      (4, 'Lisa Chen', 'lisa.chen@email.com', '+1-555-0205', '2025-08-09', '3:45 PM', 'Knee pain evaluation', 'Sports injury from last month', 'confirmed', '2025-07-29 10:20:00'),
      (5, 'David Martinez', 'david.m@email.com', '+1-555-0206', '2025-08-12', '1:00 PM', 'Skin rash examination', 'Persistent rash on arms and legs', 'confirmed', '2025-07-30 13:15:00'),
      
      -- Pending appointments 
      (2, 'Amanda Johnson', 'amanda.j@email.com', '+1-555-0207', '2025-08-10', '10:30 AM', 'Dizziness episodes', 'Experiencing vertigo symptoms', 'pending', '2025-08-01 08:30:00'),
      (6, 'Robert Kim', 'robert.kim@email.com', '+1-555-0208', '2025-08-11', '2:15 PM', 'Digestive issues', 'Stomach pain after meals', 'pending', '2025-08-01 09:45:00'),
      (7, 'Jennifer Lopez', 'jennifer.l@email.com', '+1-555-0209', '2025-08-13', '11:00 AM', 'Annual gynecological exam', 'Routine yearly checkup', 'pending', '2025-08-01 10:30:00'),
      
      -- Completed appointments (past)
      (1, 'Mark Anderson', 'mark.anderson@email.com', '+1-555-0210', '2025-07-28', '9:30 AM', 'Chest pain evaluation', 'False alarm - stress related', 'completed', '2025-07-20 14:00:00'),
      (3, 'Maria Garcia', 'maria.garcia@email.com', '+1-555-0211', '2025-07-26', '4:00 PM', 'Baby wellness check', 'All developmental milestones met', 'completed', '2025-07-18 11:30:00'),
      (4, 'Thomas Brown', 'thomas.brown@email.com', '+1-555-0212', '2025-07-25', '1:30 PM', 'Shoulder surgery follow-up', 'Recovery progressing well', 'completed', '2025-07-15 16:20:00'),
      (5, 'Helen White', 'helen.white@email.com', '+1-555-0213', '2025-07-24', '3:15 PM', 'Acne treatment', 'Prescribed new medication', 'completed', '2025-07-10 12:45:00'),
      (2, 'Daniel Lee', 'daniel.lee@email.com', '+1-555-0214', '2025-07-22', '10:45 AM', 'Memory concerns', 'Recommended lifestyle changes', 'completed', '2025-07-12 09:30:00'),
      
      -- Cancelled appointments
      (6, 'Patricia Taylor', 'patricia.t@email.com', '+1-555-0215', '2025-08-04', '2:00 PM', 'Stomach ulcer consultation', 'Patient rescheduled due to emergency', 'cancelled', '2025-07-22 15:30:00'),
      (1, 'Kevin Johnson', 'kevin.j@email.com', '+1-555-0216', '2025-08-03', '11:30 AM', 'Blood pressure monitoring', 'Cancelled - patient recovered', 'cancelled', '2025-07-21 10:15:00'),
      (7, 'Michelle Davis', 'michelle.d@email.com', '+1-555-0217', '2025-08-02', '4:30 PM', 'Pregnancy consultation', 'Cancelled due to scheduling conflict', 'cancelled', '2025-07-20 08:45:00'),
      
      -- Additional test data with various scenarios
      (1, 'John Doe', 'john.doe@email.com', '+1-555-0123', '2025-08-05', '10:00 AM', 'Regular checkup', 'First visit', 'confirmed', '2025-07-31 22:20:34'),
      (2, 'Alice Cooper', 'alice.cooper@email.com', NULL, '2025-08-14', '9:15 AM', 'Stress management consultation', 'Work-related stress symptoms', 'confirmed', '2025-08-01 11:00:00'),
      (3, 'Bob Smith', 'bob.smith@email.com', '+1-555-0300', '2025-08-15', '2:45 PM', 'Child development assessment', NULL, 'pending', '2025-08-01 12:30:00')
    `;

    await connection.query(appointmentsData);
    console.log('✅ Inserted mock appointments data');

    // Get counts for verification
    const [appointmentCounts] = await connection.query(`
      SELECT 
        status,
        COUNT(*) as count
      FROM appointments 
      GROUP BY status
      ORDER BY status
    `);

    console.log('\n📊 Appointment Statistics:');
    appointmentCounts.forEach(row => {
      console.log(`   ${row.status}: ${row.count} appointments`);
    });

    // Get total count
    const [totalCount] = await connection.query('SELECT COUNT(*) as total FROM appointments');
    console.log(`   Total: ${totalCount[0].total} appointments`);

    // Show upcoming appointments
    const [upcomingAppointments] = await connection.query(`
      SELECT 
        a.patient_name,
        d.name as doctor_name,
        a.date,
        a.time,
        a.reason,
        a.status
      FROM appointments a
      JOIN doctors d ON a.doctor_id = d.id
      WHERE a.date >= CURDATE()
      ORDER BY a.date ASC, a.time ASC
      LIMIT 5
    `);

    console.log('\n📅 Next 5 Upcoming Appointments:');
    upcomingAppointments.forEach(apt => {
      console.log(`   ${apt.patient_name} → ${apt.doctor_name} (${apt.date.toISOString().split('T')[0]} ${apt.time}) - ${apt.reason} [${apt.status}]`);
    });

    console.log('\n🎉 Mock data population completed successfully!');

  } catch (error) {
    console.error('❌ Error populating mock data:', error.message);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the population
if (require.main === module) {
  populateMockData()
    .then(() => {
      console.log('\n✅ Database population complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Database population failed:', error);
      process.exit(1);
    });
}

module.exports = { populateMockData };
