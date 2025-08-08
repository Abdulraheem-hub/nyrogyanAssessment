# 🏥 NirogGyan - Healthcare Platform

A modern healthcare platform for booking appointments with doctors. Built with React, TypeScript, and Node.js.

## 🚀 Live Demo

**🌐 Deployed Application:** [https://main-pi-ten.vercel.app/](https://main-pi-ten.vercel.app/)

## 🎥 Video Demonstration

<div align="center">

### 📹 Full Feature Walkthrough

[![Healthcare Platform Demo](https://img.shields.io/badge/▶️_Watch_Demo-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://drive.google.com/file/d/1NVmPZu8fnXIR6gaN9qHShvufxbF8XGqS/view?usp=sharing)

</div>

**🎬 What the demo shows:**
- 🏠 **Homepage** - Doctor search and filtering functionality
- 👨‍⚕️ **Doctor Profiles** - Detailed information and specialties
- 📅 **Appointment Booking** - Interactive calendar with time slots
- 📱 **Responsive Design** - Seamless experience across devices
- 👤 **Profile Management** - User dashboard and appointment history
- 🎨 **Modern UI/UX** - Smooth animations and intuitive navigation

---

## ✨ Features

- 🔍 **Doctor Search & Filtering** - Find doctors by specialty and availability
- 📅 **Appointment Booking** - Interactive calendar with time slot selection
- 👤 **Profile Management** - View and manage appointment history
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Welcome Animation** - Interactive user onboarding

## 🛠️ Tools/Libraries Used

**Frontend:** React 19, TypeScript 5.8, Vite 7, Tailwind CSS 4, Shadcn/UI, React Router DOM 7, Radix UI, Lucide React

**Backend:** Node.js, Express.js 4, Mock Data Services, Helmet.js, CORS, Dotenv

**Tools:** ESLint 9, TypeScript ESLint, PostCSS, Autoprefixer, Nodemon

## 🚀 Quick Start

### 🌐 Try the Live Demo
Visit the deployed application: **[https://main-pi-ten.vercel.app/](https://main-pi-ten.vercel.app/)**

### 💻 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/Abdulraheem-hub/nyrogyanAssessment.git
cd nyrogyanAssessment/main

# 2. Install dependencies
npm install
cd backend && npm install && cd ..

# 3. Start development servers
# Terminal 1: Backend (using mock data)
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

**Local Access:** Frontend: http://localhost:5173 | Backend: http://localhost:5000

## 🔄 Improvements with More Time

**Authentication & Security:**
- JWT authentication system with role-based access control
- Two-factor authentication and API rate limiting
- Password reset flow with email verification

**Advanced Features:**
- Real-time notifications via WebSocket
- Payment integration (Stripe/PayPal)
- Video consultation with WebRTC
- File upload for medical records
- Geolocation for nearby doctors

**User Experience:**
- Progressive Web App (PWA) with offline support
- Dark mode toggle and internationalization
- Email notifications and review system
- Advanced calendar with recurring appointments

**Technical Improvements:**
- Comprehensive testing (Jest, Playwright)
- Performance optimization and code splitting
- CI/CD pipeline with automated deployment
- Database optimization and Redis caching
- Error monitoring and analytics

## 🚧 Challenges Faced and Solutions

**1. TypeScript Configuration Complexity**
- **Challenge:** Managing multiple TypeScript configs with strict typing
- **Solution:** Separate configs for app/node, path mapping, ESLint integration

**2. API Integration and Error Handling**
- **Challenge:** Type-safe API calls with proper error management
- **Solution:** Centralized service classes with generic fetchApi helpers

**3. Component State Management**
- **Challenge:** Complex state across calendar, booking, and filtering components
- **Solution:** React hooks with proper dependencies and Router state persistence

**4. Responsive Design Consistency**
- **Challenge:** Consistent UI across all device sizes
- **Solution:** Tailwind CSS utility classes and Shadcn/UI component system

**5. Backend API Design**
- **Challenge:** Scalable REST API with efficient data operations and realistic mock data
- **Solution:** Express.js routing, in-memory mock services, comprehensive data simulation

**6. Build and Deployment**
- **Challenge:** Optimizing builds for development and production without database dependencies
- **Solution:** Vite configuration, environment management, Vercel deployment with mock data

## 📁 Project Structure

```
src/
├── components/ui/          # Shadcn UI components
├── features/              # Feature modules (home, doctor, appointment, profile)
├── services/              # API service layers
└── lib/utils/             # Utilities

backend/
├── routes/                # API endpoints (doctors, appointments)
├── services/              # Business logic
├── config/                # Database configuration
└── scripts/               # Database initialization
```

## 🔧 Scripts

```bash
# Frontend
npm run dev         # Development server
npm run build       # Production build
npm run deploy      # Deploy to Vercel

# Backend
npm run dev         # Development with nodemon and mock data
```

## 🔧 Environment Variables

### Production Deployment
The live demo uses mock data services with no database dependencies.

### Local Development

**Frontend (.env.local):**
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
USE_MOCK_DATA=true
```

## 🧪 API Endpoints

### Live API Base URL
```
Production: https://main-pi-ten.vercel.app/api
Local: http://localhost:5000/api
```

### Available Endpoints
```
GET    /api/doctors              # Get all doctors with filters
GET    /api/doctors/:id          # Get doctor details
GET    /api/doctors/specialties  # Get specialties list
POST   /api/appointments         # Create appointment
GET    /api/appointments         # Get appointments
PUT    /api/appointments/:id     # Update appointment
DELETE /api/appointments/:id     # Cancel appointment
```

## 📄 License

MIT License - Making healthcare accessible for everyone. 🏥💙

## 🎬 Deployment Details

### Production Infrastructure
- **Frontend:** Deployed on Vercel with automatic deployments from GitHub
- **Backend API:** Deployed with mock data services and CORS configuration
- **Data:** In-memory mock data with realistic sample content
- **Domain:** [main-pi-ten.vercel.app](https://main-pi-ten.vercel.app/)
- **CI/CD:** Automatic deployments on push to main branch

### Performance & Features
- ⚡ **Fast Loading** - Optimized Vite build with code splitting
- 🔒 **Secure API** - Helmet.js security headers and CORS protection
- 📱 **Mobile First** - Responsive design tested across devices
- 🎨 **Modern UI** - Shadcn/UI components with Tailwind CSS
- 🚀 **TypeScript** - Full type safety across frontend and backend
- 💾 **Mock Data** - No database setup required, instant deployment

---

Built with ❤️ using React, TypeScript, and Node.js
