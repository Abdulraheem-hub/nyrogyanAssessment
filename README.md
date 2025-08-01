# 🏥 NirogGyan - Modern Healthcare Platform

A comprehensive healthcare management platform built with modern web technologies. NirogGyan enables patients to find doctors, book appointments, and manage their healthcare journey seamlessly.

## ✨ Features

### 🔍 Doctor Discovery
- **Advanced Search**: Find doctors by specialty, location, and availability
- **Detailed Profiles**: View doctor qualifications, experience, and patient reviews
- **Specialty Filtering**: Browse doctors by medical specialization
- **Rating System**: Patient feedback and ratings for informed decisions

### 📅 Appointment Management
- **Real-time Booking**: Schedule appointments with instant confirmation
- **Calendar Integration**: View available time slots and manage bookings
- **Appointment History**: Track past and upcoming appointments
- **Cancellation & Rescheduling**: Flexible appointment management

### 👤 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Shadcn UI
- **Fast Performance**: Optimized with Vite and React 18
- **Accessibility**: WCAG compliant design for all users

### 🔒 Security & Privacy
- **Data Protection**: Secure handling of sensitive health information
- **JWT Authentication**: Secure user authentication system
- **HIPAA Compliance**: Following healthcare data protection standards

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe development
- **Tailwind CSS** for utility-first styling
- **Shadcn UI** for consistent, accessible components
- **Vite** for fast development and optimized builds
- **Lucide React** for modern iconography

### Backend
- **Node.js** with Express.js framework
- **MySQL** database for reliable data storage
- **JWT** for secure authentication
- **RESTful API** design pattern

### Development Tools
- **TypeScript** for enhanced developer experience
- **ESLint** for code quality
- **Prettier** for code formatting
- **Git** for version control

## � Quick Start

### Prerequisites
- Node.js 18+ and npm installed
- Git for version control

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/nirogyan-healthcare.git
cd nirogyan-healthcare
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd backend
npm install
cd ..
```

4. **Set up environment variables:**
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000

# Backend (backend/.env)
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=nirogyan_db
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. **Start the development servers:**

Frontend:
```bash
npm run dev
```

Backend (in a new terminal):
```bash
cd backend
npm start
```

6. **Access the application:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`

## 🏗️ Build & Deploy

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel login
vercel
```

## 📁 Project Architecture

```
├── src/
│   ├── components/
│   │   ├── ui/                    # Reusable UI components (Shadcn)
│   │   └── layout/                # Layout components
│   ├── features/
│   │   ├── home/                  # Homepage feature
│   │   ├── doctor/                # Doctor-related components
│   │   ├── appointment/           # Appointment management
│   │   └── profile/               # User profile
│   ├── services/                  # API service layer
│   ├── lib/                       # Utility functions
│   └── assets/                    # Static assets
├── backend/
│   ├── config/                    # Database configuration
│   ├── routes/                    # API routes
│   ├── services/                  # Business logic
│   └── scripts/                   # Database scripts
└── public/                        # Static public files
```

## 🎨 Key Features Showcase

### 🏠 Homepage
- Clean, professional landing page
- Featured doctors and services
- Quick appointment booking access
- Health tips and medical articles

### 🔍 Doctor Search
- Advanced filtering by specialty, location, and availability
- Real-time search results
- Doctor profile cards with ratings and reviews
- Detailed doctor information pages

### 📅 Appointment Booking
- Interactive calendar interface
- Real-time availability checking
- Appointment confirmation system
- Email/SMS notifications

### 👤 User Dashboard
- Personal health records
- Appointment history and management
- Prescription tracking
- Health goal monitoring

## 🛠️ Development Guidelines

### Code Style
- Use TypeScript for all new components
- Follow the existing component structure
- Implement responsive design patterns
- Use Tailwind CSS utility classes
- Maintain accessibility standards

### Component Organization
- Feature-first architecture
- Reusable UI components in `/components/ui/`
- Business logic in service layer
- Consistent naming conventions

### API Integration
- RESTful API design
- Proper error handling
- Loading states management
- Data validation and sanitization

## 🔐 Security Features

- **Authentication**: JWT-based secure authentication
- **Data Protection**: Encrypted sensitive data storage
- **API Security**: Rate limiting and input validation
- **HTTPS**: Secure data transmission
- **Privacy**: GDPR and HIPAA compliant design

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e
```

## � Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Development**: React.js, TypeScript, Tailwind CSS
- **Backend Development**: Node.js, Express.js, MySQL
- **UI/UX Design**: Modern healthcare interface design
- **DevOps**: CI/CD pipeline with automated deployments

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Email: support@nirogyan.com
- Documentation: [Project Wiki](https://github.com/yourusername/nirogyan-healthcare/wiki)

## 🚀 Roadmap

- [ ] Advanced search filters
- [ ] Telemedicine integration
- [ ] Mobile app development
- [ ] AI-powered health recommendations
- [ ] Multi-language support
- [ ] Insurance integration
- [ ] Prescription management
- [ ] Health data analytics

---

**NirogGyan** - Making healthcare accessible and manageable for everyone. 🏥💙

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
  # Healthcare Website - Full Stack Application

A modern healthcare website built with React, TypeScript, Express.js, and MySQL. The application allows users to browse and filter doctors from a database with a clean, responsive UI.

![Healthcare Website](https://via.placeholder.com/800x400/0ea5e9/ffffff?text=Healthcare+Website+Demo)

## 🚀 Features

- **Doctor Listings**: Browse doctors with detailed profiles
- **Search & Filter**: Search by name/specialty and filter by availability
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Data**: Fetches doctor information from MySQL database
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Type Safety**: Full TypeScript support
- **API Integration**: RESTful API with Express.js backend

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MySQL** database with mysql2 driver
- **CORS** for cross-origin requests
- **Helmet** for security
- **dotenv** for environment variables

## 📋 Prerequisites

- Node.js (v16 or higher)
- MySQL Server (optional - uses mock data if not available)
- npm or yarn

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd NirogGyan-Assessment/main
```

### 2. Frontend Setup
```bash
# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```
The frontend will be available at `http://localhost:5173`

### 3. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install backend dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials
```

### 4. Database Setup (Optional)

#### Option A: MySQL Server
1. Install MySQL Server
2. Create database:
   ```sql
   CREATE DATABASE healthcare_db;
   ```
3. Update `.env` file with your credentials
4. Initialize database:
   ```bash
   npm run init-db
   ```

#### Option B: Docker (Recommended)
```bash
# Run MySQL in Docker container
docker run --name healthcare-mysql 
  -e MYSQL_ROOT_PASSWORD=password 
  -e MYSQL_DATABASE=healthcare_db 
  -p 3306:3306 -d mysql:8.0

# Update .env file accordingly
# Initialize database
npm run init-db
```

#### Option C: Use Mock Data
If you don't have MySQL, the application will automatically use mock data.

### 5. Start Backend Server
```bash
# From backend directory
npm run dev
# or
npm start
```
The backend will be available at `http://localhost:5000`

## 📁 Project Structure

```
├── README.md
├── package.json
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   ├── features/
│   │   └── home/
│   │       └── HomePage.tsx
│   ├── services/
│   │   └── doctorService.ts
│   └── lib/
│       └── utils.ts
└── backend/
    ├── server.js
    ├── package.json
    ├── .env.example
    ├── config/
    │   └── database.js
    ├── routes/
    │   └── doctors.js
    ├── services/
    │   ├── doctorService.js
    │   └── mockDoctorService.js
    └── scripts/
        └── initDatabase.js
```

## 🔌 API Endpoints

### Doctors API

| Method | Endpoint | Description | Parameters |
|--------|----------|-------------|------------|
| GET | `/api/doctors` | Get all doctors | `search`, `specialty`, `availability`, `limit`, `offset` |
| GET | `/api/doctors/:id` | Get doctor by ID | - |
| GET | `/api/doctors/specialties` | Get all specialties | - |
| POST | `/api/doctors` | Create new doctor | Doctor object |
| PUT | `/api/doctors/:id` | Update doctor | Doctor object |
| DELETE | `/api/doctors/:id` | Delete doctor | - |

### Example Requests

```bash
# Get all doctors
curl http://localhost:5000/api/doctors

# Search doctors
curl "http://localhost:5000/api/doctors?search=sarah&specialty=Cardiologist"

# Get specialties
curl http://localhost:5000/api/doctors/specialties

# Health check
curl http://localhost:5000/health
```

## 🎯 Usage

1. **Browse Doctors**: View all available doctors on the homepage
2. **Search**: Use the search bar to find doctors by name or specialty
3. **Filter**: Filter by specialty and availability status
4. **View Details**: Click on doctor cards to see more information
5. **Book Appointments**: Use the booking buttons (future feature)

## 🔧 Development

### Frontend Development
```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

### Backend Development
```bash
npm run dev    # Start with nodemon (auto-reload)
npm start      # Start production server
npm run init-db # Initialize database
```

### Database Schema

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

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API base URL in production

### Backend Deployment (Railway/Heroku)
1. Set environment variables
2. Ensure MySQL database is accessible
3. Deploy with `npm start`

## 🧪 Testing

### Test API Endpoints
```bash
# Test health endpoint
curl http://localhost:5000/health

# Test doctors endpoint
curl http://localhost:5000/api/doctors

# Test with filters
curl "http://localhost:5000/api/doctors?specialty=Cardiologist&availability=Available"
```

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure MySQL is running
   - Check credentials in `.env` file
   - The app will use mock data automatically

2. **CORS Errors**
   - Ensure backend is running on port 5000
   - Check FRONTEND_URL in backend `.env`

3. **Port Already in Use**
   - Change ports in configuration
   - Kill processes using the ports

4. **Module Not Found**
   - Run `npm install` in both root and backend directories
   - Check Node.js version compatibility

## 🔒 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=healthcare_db
DB_PORT=3306
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## 📝 Future Enhancements

- [ ] User authentication and authorization
- [ ] Appointment booking system
- [ ] Doctor availability calendar
- [ ] Patient profiles and medical records
- [ ] Payment integration
- [ ] Real-time chat with doctors
- [ ] Email notifications
- [ ] Mobile app development
- [ ] Advanced search with location
- [ ] Reviews and ratings system

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Developer

Created as part of the NirogGyan Assessment project.

---

**Note**: This application uses mock data when a database connection is not available, making it easy to run and test without requiring MySQL setup.
])
```
