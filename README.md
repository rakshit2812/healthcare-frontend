# 🏥 Healthcare Management System

A comprehensive full-stack healthcare management system built with **Angular 20** and **Node.js/Express** featuring role-based dashboards for Patients, Doctors, and Admins with appointment scheduling, billing, and prescription management.

## 🌐 Live Demo

**Live Application Link:** [Live Application](https://doctor-healthcare-system.vercel.app)

## 📦 Repository Links

- **Frontend Repository:** [healthcare-frontend](https://github.com/rakshit2812/healthcare-frontend)
- **Backend Repository:** [healthcare-backend](https://github.com/Sarvesh2025/healthcare-backend)

---

## 🚀 Features

### Patient Dashboard
- 📅 **Book Appointments** with available doctors
- 📋 **View Medical Records** and prescription history
- 💳 **Billing & Payment Management**
- 🔔 **Appointment Notifications**

### Doctor Dashboard
- 👥 **Manage Patient Appointments**
- 💊 **Create & Manage Prescriptions**
- 📊 **View Patient Medical History**
- 📆 **Schedule Management**

### Admin Dashboard
- 👨‍⚕️ **Manage Doctors & Departments**
- 👤 **User Management** (Patients, Doctors, Staff)
- 💰 **Financial Reports & Billing Overview**
- 📈 **System Analytics & Statistics**

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Angular 20.3.0
- **Styling:** TailwindCSS 4.1.14
- **HTTP Client:** Angular HttpClient with Interceptors
- **State Management:** RxJS 7.8.0
- **Routing:** Angular Router with Guards
- **Language:** TypeScript 5.9.2

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js 4.21.2
- **Database:** MongoDB with Mongoose 7.0.0
- **Authentication:** JWT (jsonwebtoken 9.0.0)
- **Password Hashing:** bcrypt 5.1.0
- **Validation:** express-validator 6.14.3
- **CORS:** cors 2.8.5
- **Logging:** morgan 1.10.0

---

## 📋 Prerequisites

Before setting up the project locally, ensure you have the following installed:

- **Node.js** (v18.x or higher) - [Download](https://nodejs.org/)
- **npm** (v9.x or higher) - Comes with Node.js
- **MongoDB** (v6.x or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Angular CLI** (v20.3.4) - Install globally: `npm install -g @angular/cli@20.3.4`

---

## 🔧 Local Setup Instructions

### 1️⃣ Clone the Repositories

```bash
# Create a project directory
mkdir healthcare-project
cd healthcare-project

# Clone frontend repository
git clone https://github.com/rakshit2812/healthcare-frontend

# Clone backend repository
git clone https://github.com/Sarvesh2025/healthcare-backend
```

---

### 2️⃣ Backend Setup

#### Navigate to Backend Directory
```bash
cd healthcare-backend
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the root of the backend directory:

```env
# MongoDB Configuration
MONGO_URI= Your URI

# JWT Secret Key (use a strong random string)
JWT_SECRET= (Your JWT Secret)

# Server Port
PORT= port number

# Node Environment
NODE_ENV=development
```

#### Start MongoDB (if running locally)
```bash
# On Windows (if installed as service, it starts automatically)
# Or manually:
mongod

# On macOS/Linux
sudo systemctl start mongod
```

#### Run the Backend Server

**Development Mode (with auto-restart):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The backend server will start on `http://localhost:port number`

#### Verify Backend is Running
Open your browser or use curl:
```bash
curl http://localhost:port number/
# Expected response: {"ok":true,"message":"Medical backend running"}
```

---

### 3️⃣ Frontend Setup

#### Navigate to Frontend Directory (from project root)
```bash
cd ../healthcare-frontend
```

#### Install Dependencies
```bash
npm install
```

#### Configure API Endpoint (Optional)
If your backend is not running on the default URL, update the API endpoint in the service files:

Edit `src/app/services/auth.ts` (and other service files):
```typescript
// Change this line to your backend URL
private apiUrl = 'http://localhost:port number/api/auth';
```

Service files to update:
- `src/app/services/auth.ts`
- `src/app/services/patient.ts`
- `src/app/services/doctor.ts`
- `src/app/services/admin.ts`
- `src/app/services/billing.ts`

#### Start the Development Server
```bash
ng serve
```

Or use npm:
```bash
npm start
```

The frontend application will start on `http://localhost:port number`

#### Access the Application
Open your browser and navigate to:
```
http://localhost:port number
```

---

## 📁 Project Structure

### Frontend Structure
```
healthcare-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── admin-dashboard/
│   │   │   ├── doctor-dashboard/
│   │   │   ├── patient-dashboard/
│   │   │   ├── home/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── navbar/
│   │   ├── guards/              # Route guards for authentication
│   │   ├── interceptors/        # HTTP interceptors (auth tokens)
│   │   ├── services/            # API services
│   │   ├── app.routes.ts        # Application routing
│   │   └── app.config.ts        # App configuration
│   ├── styles.css               # Global styles (TailwindCSS)
│   └── main.ts
├── angular.json
├── package.json
└── tailwind.config.js
```

### Backend Structure
```
healthcare-backend/
├── src/
│   ├── models/
│   │   ├── User.js              # User model (Patient/Doctor/Admin)
│   │   ├── Appointment.js       # Appointment model
│   │   ├── Prescription.js      # Prescription model
│   │   ├── Bill.js              # Billing model
│   │   ├── Transaction.js       # Payment transactions
│   │   ├── Department.js        # Hospital departments
│   │   ├── DoctorProfile.js     # Doctor details
│   │   └── PatientProfile.js    # Patient details
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── patient.js           # Patient routes
│   │   ├── doctor.js            # Doctor routes
│   │   ├── admin.js             # Admin routes
│   │   ├── billing.js           # Billing routes
│   │   └── department.js        # Department routes
│   └── middlewares/             # Auth middleware
├── server.js                    # Entry point
├── package.json
└── .env                         # Environment variables (not in repo)
```

---

## 🧪 Testing

### Frontend Tests
```bash
cd healthcare-frontend
npm test
```

### Backend Tests
```bash
cd healthcare-backend
npm test
```

---

## 🏗️ Building for Production

### Build Frontend
```bash
cd healthcare-frontend
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Deploy Frontend
The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- Firebase Hosting
- AWS S3 + CloudFront
- GitHub Pages

### Deploy Backend
The backend can be deployed to:
- Render (currently deployed here)
- Heroku
- AWS EC2 / Elastic Beanstalk
- DigitalOcean
- Railway

---

## 🌐 API Documentation

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Patient Endpoints
- `GET /patients/profile` - Get patient profile
- `POST /patients/appointments` - Book appointment
- `GET /patients/appointments` - Get patient appointments
- `GET /patients/prescriptions` - Get prescriptions

### Doctor Endpoints
- `GET /doctors/appointments` - Get doctor appointments
- `POST /doctors/prescriptions` - Create prescription
- `GET /doctors/patients` - Get patient list

### Admin Endpoints
- `GET /admin/users` - Get all users
- `POST /admin/doctors` - Add doctor
- `GET /admin/statistics` - Get system statistics
- `GET /admin/departments` - Manage departments

### Billing Endpoints
- `GET /billing/bills` - Get bills
- `POST /billing/create` - Create bill
- `POST /billing/payment` - Process payment

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 4200 (Frontend)
npx kill-port 4200

# Kill process on port 4000 (Backend)
npx kill-port 4000
```

### MongoDB Connection Issues
- Ensure MongoDB service is running
- Check `MONGO_URI` in `.env` file
- For MongoDB Atlas, ensure IP whitelist is configured

### CORS Issues
- Ensure CORS is enabled in `server.js`
- Check if backend URL is correctly configured in frontend services

## 🙏 Acknowledgments

- Angular team for the amazing framework
- MongoDB for the flexible database
- Express.js for the robust backend framework
- TailwindCSS for the beautiful UI components

---

**Made with ❤️ for better healthcare management**
