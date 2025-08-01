# 🚀 Deployment Guide for NirogGyan Healthcare Platform

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Push your code to GitHub
3. **Online SQL Database**: Have your database credentials ready

## 📋 Step-by-Step Deployment

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Login to Vercel

```bash
vercel login
```

### 3. Prepare Environment Variables

Create a `.env` file in the `backend` folder with your online SQL database credentials:

```env
DB_HOST=your-online-sql-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=nirogyan_db
JWT_SECRET=your-super-secure-jwt-secret-key
PORT=5000
NODE_ENV=production
```

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel CLI

```bash
# Build the project
npm run build

# Deploy to production
vercel --prod
```

#### Option B: Deploy via Vercel Dashboard

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### 5. Configure Environment Variables in Vercel

In your Vercel dashboard:

1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add the following variables:

**For Backend (API):**
```
DB_HOST=your-online-sql-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=nirogyan_db
JWT_SECRET=your-super-secure-jwt-secret-key
NODE_ENV=production
```

**For Frontend:**
```
VITE_API_BASE_URL=https://your-app-name.vercel.app/api
```

### 6. Database Setup

Since you're using an online SQL server, make sure:

1. Your database is accessible from external connections
2. The database `nirogyan_db` exists
3. Run the database initialization script:

```bash
# If you have direct access to your database
cd backend
node scripts/initDatabase.js
```

Or manually create the required tables using the SQL scripts in the backend folder.

### 7. Update Frontend API URL

After deployment, update your environment variables in Vercel:

```
VITE_API_BASE_URL=https://your-actual-vercel-url.vercel.app/api
```

### 8. Test Deployment

Visit your deployed URLs:
- **Frontend**: `https://your-app-name.vercel.app`
- **API Health Check**: `https://your-app-name.vercel.app/api/health`
- **Doctors API**: `https://your-app-name.vercel.app/api/doctors`

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Check your database credentials
   - Ensure your database allows external connections
   - Verify the database name exists

2. **API Routes Not Working**
   - Check the `vercel.json` configuration
   - Ensure all environment variables are set in Vercel

3. **Frontend Can't Connect to API**
   - Update `VITE_API_BASE_URL` with your actual Vercel URL
   - Redeploy after changing environment variables

### Debug Commands:

```bash
# Check build locally
npm run build
npm run preview

# Check API locally
cd backend
npm start

# Deploy with debug info
vercel --debug
```

## 🔄 Continuous Deployment

Once connected to GitHub, Vercel will automatically:
- Deploy on every push to the main branch
- Create preview deployments for pull requests
- Run build checks before deployment

## 📝 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API health check returns OK
- [ ] Doctor search works
- [ ] Appointment booking functions
- [ ] Database connections are successful
- [ ] All environment variables are set
- [ ] SSL certificate is active (automatic with Vercel)

## 🌐 Custom Domain (Optional)

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

---

Your NirogGyan Healthcare Platform should now be live! 🎉
