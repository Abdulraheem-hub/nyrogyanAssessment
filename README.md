# HealthFirst - Healthcare Website

A modern healthcare website built with React, TypeScript, and Shadcn UI components. This platform allows users to find doctors, book appointments, and manage their health records.

## 🚀 Features

- **Simple Welcome Message**: Clean notification for first-time visitors about the demo account
- **Doctor Search & Filtering**: Find doctors by specialty, availability, and ratings
- **Appointment Booking**: Schedule appointments with real-time availability
- **Sample Account**: Pre-configured demo account for immediate testing
- **Responsive Design**: Modern, clean interface that works on all devices  
- **Component Library**: Built with Shadcn UI components for consistency
- **TypeScript**: Full type safety throughout the application
- **Feature-First Architecture**: Organized codebase with feature-based structure

## ✨ Welcome Message

The application shows a simple welcome dialog for users visiting the home page:

- **Shows on home page visits**: Displays every time someone loads the home page (/)
- **Auto-dismisses**: Closes automatically after 8 seconds
- **Clear messaging**: Simple explanation that user is logged into a default account
- **Demo account info**: Shows that all features can be tested immediately
- **Non-intrusive**: Clean, minimal design that doesn't overwhelm users

### Testing the Welcome Message

In development mode:
- Press `Ctrl+Shift+W` to manually trigger the welcome message
- Or simply visit/refresh the home page to see it

## 🛠️ Tech Stack

- **Frontend**: React.js with TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn UI
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Authentication**: JWT (planned)
- **Backend**: Node.js + Express.js (planned)
- **Database**: SQL (planned)

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd healthcare-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Build

To build the project for production:

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/ui/          # Shadcn UI components
├── features/              # Feature-based modules
│   └── home/             # Homepage components
├── lib/                  # Utility functions
├── assets/               # Static assets
└── App.tsx              # Main app component
```

## 🎨 Design

The design is based on a clean, modern healthcare interface featuring:
- Professional color scheme with slate and blue accents
- Card-based doctor listings with ratings and availability
- Intuitive search and filtering capabilities
- Accessible navigation and user interface

## 🔧 Development

- Uses feature-first architecture for scalability
- TypeScript for type safety
- Tailwind CSS for styling
- Shadcn UI for consistent components
- ESLint for code quality

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
