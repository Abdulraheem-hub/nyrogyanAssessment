# 🏥 NirogGyan - Healthcare Platform

A modern healthcare platform for booking appointments with doctors. Built with React, TypeScript, and Node.js.

## ✨ Features

- 🔍 **Doctor Search & Filtering** - Find doctors by specialty and availability
- 📅 **Appointment Booking** - Interactive calendar with time slot selection
- 👤 **Profile Management** - View and manage appointment history
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Welcome Animation** - Interactive user onboarding

## 🛠️ Tools/Libraries Used

**Frontend:** React 19, TypeScript 5.8, Vite 7, Tailwind CSS 4, Shadcn/UI, React Router DOM 7, Radix UI, Lucide React

**Backend:** Node.js, Express.js 4, MySQL2, Helmet.js, CORS, Dotenv

**Tools:** ESLint 9, TypeScript ESLint, PostCSS, Autoprefixer, Nodemon

## 🚀 Quick Start

```bash
# 1. Clone repository
git clone https://github.com/Abdulraheem-hub/nyrogyanAssessment.git
cd nyrogyanAssessment/main

# 2. Install dependencies
npm install
cd backend && npm install && cd ..

# 3. Setup environment
# Create backend/.env with your MySQL credentials

# 4. Initialize database
cd backend && npm run init-db && cd ..

# 5. Start development servers
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
npm run dev
```

**Access:** Frontend: http://localhost:5173 | Backend: http://localhost:5000

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
- **Challenge:** Scalable REST API with efficient database queries
- **Solution:** Express.js routing, MySQL2 promises, comprehensive validation

**6. Build and Deployment**
- **Challenge:** Optimizing builds for development and production
- **Solution:** Vite configuration, environment management, Vercel deployment

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
npm run dev         # Development with nodemon
npm run init-db     # Initialize database
```

## 🔧 Environment Variables

**Frontend (.env.local):**
```env
VITE_API_BASE_URL=https://your-api-domain.com/api
```

**Backend (.env):**
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nirogyan_db
PORT=5000
```

## 🧪 API Endpoints

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

---

Built with ❤️ using React, TypeScript, and Node.js
