# Healthcare Backend

This is the backend API for the Healthcare Website project.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   - Copy `.env.example` to `.env`
   - Update the database credentials in `.env` file:
     ```
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASSWORD=your_mysql_password
     DB_NAME=healthcare_db
     DB_PORT=3306
     ```

3. **Initialize Database:**
   ```bash
   npm run init-db
   ```

4. **Start the Server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Doctors API
- `GET /api/doctors` - Get all doctors (supports filtering)
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/specialties` - Get all specialties
- `POST /api/doctors` - Create new doctor
- `PUT /api/doctors/:id` - Update doctor
- `DELETE /api/doctors/:id` - Delete doctor

### Query Parameters for `/api/doctors`
- `search` - Search by name or specialty
- `specialty` - Filter by specialty
- `availability` - Filter by availability (Available, Busy)
- `limit` - Limit number of results
- `offset` - Offset for pagination

## Database Schema

### Doctors Table
```sql
CREATE TABLE doctors (
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Technology Stack
- **Framework:** Express.js
- **Database:** MySQL with mysql2 driver
- **Security:** Helmet, CORS
- **Environment:** dotenv

## Development

### Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database and create tables
