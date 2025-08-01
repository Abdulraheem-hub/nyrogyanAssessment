# 🏥 NirogGyan - Healthcare Platform

A modern healthcare website built with React, TypeScript, and Node.js. Find doctors, book appointments, and manage healthcare seamlessly.

## ✨ Features

- 🔍 **Doctor Search & Filtering** - Find doctors by specialty and availability
- 📅 **Appointment Booking** - Schedule appointments with real-time availability
- 🎨 **Modern UI** - Built with Shadcn UI and Tailwind CSS
- 📱 **Responsive Design** - Works on all devices
- 🔒 **Secure** - JWT authentication and data protection

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI, Vite
- **Backend**: Node.js, Express.js, MySQL
- **Tools**: ESLint, Git

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Git

### Installation

1. **Clone and setup:**
```bash
git clone https://github.com/yourusername/nirogyan-healthcare.git
cd nirogyan-healthcare
npm install
```

2. **Backend setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
```

3. **Start development:**
```bash
# Frontend (from root)
npm run dev

# Backend (new terminal, from backend/)
npm run dev
```

4. **Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📁 Project Structure

```
src/
├── components/ui/          # Shadcn UI components
├── features/              # Feature modules (home, doctor, appointment)
├── services/              # API services
└── lib/                   # Utilities

backend/
├── routes/                # API endpoints
├── services/              # Business logic
├── config/                # Database config
└── scripts/               # Database scripts
```

## 🔧 Scripts

```bash
# Frontend
npm run dev         # Development server
npm run build       # Production build
npm run preview     # Preview build

# Backend
npm run dev         # Development with nodemon
npm start           # Production server
npm run init-db     # Initialize database
```

## 🚀 Deploy to Vercel

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically

```bash
npm install -g vercel
vercel login
vercel
```

## 🔧 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=nirogyan_db
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**NirogGyan** - Making healthcare accessible and manageable for everyone. 🏥💙
