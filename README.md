================================================================================
           BOOK A DOCTOR - HEALTHCARE APPOINTMENT SYSTEM (FULL STACK)           
================================================================================
1. PROJECT OVERVIEW
--------------------------------------------------------------------------------
Book a Doctor is a complete full-stack web application designed to connect 
patients, medical doctors, and administrators. 
* Patients can search for doctors by specialization, book appointments, and 
  upload medical history files.
* Doctors can manage their patient list, toggle availability schedules, and 
  review patient reports.
* Admins can manage registrations, view dashboard analytics, and monitor bookings.
--------------------------------------------------------------------------------
2. PROJECT ARCHITECTURE
--------------------------------------------------------------------------------
The project is divided into two main environments:
* FRONTEND (Root Directory): 
  A modern, responsive React web interface compiled using Vite. It connects 
  to the backend API using Axios for client-side routing, dashboard management, 
  and notification toast alerts.
* BACKEND (backend/ Directory): 
  An Express.js REST API server connecting to MongoDB. It handles authentication 
  checks, CRUD endpoints, database seeding, and static report uploads.
--------------------------------------------------------------------------------
3. TECH STACKS
--------------------------------------------------------------------------------
[FRONTEND TECH STACK]
- Framework: React (v19)
- Build System: Vite
- CSS Styling: Tailwind CSS & Vanilla CSS
- Animations: Framer Motion
- Icons Pack: React Icons
- Routing: React Router DOM (v7)
- Alerts: React Toastify
- API Calls: Axios
[BACKEND TECH STACK]
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (via Mongoose ODM)
- File Uploads: Multer
- Security: BcryptJS
- Server Monitoring: Nodemon
- Environment Config: Dotenv, CORS
--------------------------------------------------------------------------------
4. FOLDER STRUCTURE
--------------------------------------------------------------------------------
book-a-doctor-app/
│
├── backend/                       <-- BACKEND COMPONENT
│   ├── config/database.js         (Mongoose DB configuration)
│   ├── controllers/               (API controllers for routes)
│   ├── middleware/                (Multer file uploads rules)
│   ├── models/                    (Mongoose DB schema models)
│   ├── routes/                    (API route declarations)
│   ├── scripts/seed.js            (Initial database seed data)
│   ├── uploads/                   (Uploaded medical reports folder)
│   ├── server.js                  (Backend Entrypoint)
│   └── .env                       (Backend Environment settings)
│
├── public/                        (Static public assets)
├── src/                           <-- FRONTEND COMPONENT
│   ├── assets/                    (App images and icons)
│   ├── components/                (Navbar, Footer, Sidebar, Modals, Cards)
│   ├── context/                   (Auth, Theme, and App state providers)
│   ├── data/                      (Mock backup data)
│   ├── layouts/                   (Main and Dashboard UI structures)
│   ├── pages/                     (Dashboard views: Patient, Doctor, Admin)
│   ├── App.jsx                    (Frontend Routing configurations)
│   └── main.jsx                   (React entry DOM mounting)
│
├── tailwind.config.js             (Tailwind compilation rules)
├── vite.config.js                 (Vite compilation setups)
└── package.json                   (Frontend script and dependency lists)
--------------------------------------------------------------------------------
5. STEP-BY-STEP SETUP AND RUN INSTRUCTIONS
--------------------------------------------------------------------------------
[PREREQUISITES]
Make sure you have Node.js and MongoDB installed and running on your computer.
---
[STEP 1: CONFIGURING THE BACKEND]
1. Open your terminal and navigate to the "backend" directory:
   cd backend
2. Create a file named ".env" and add the database connection properties:
   PORT=5000
   MONGODB_URI=mongodb://127.0.0.1:27017/book-a-doctor
3. Install the backend package dependencies:
   npm install
4. Run the database seeding command to populate initial profiles and doctors:
   npm run seed
5. Start the backend developer server:
   npm run dev
   (The backend will listen on: http://localhost:5000)
---
[STEP 2: CONFIGURING THE FRONTEND]
1. Open a new terminal window at the project root directory (book-a-doctor-app/).
2. Install the frontend packages:
   npm install
3. Run the frontend development server:
   npm run dev
   (The frontend will listen on: http://localhost:5173)
--------------------------------------------------------------------------------
6. DEMO CREDENTIALS (PASSWORD: password123)
--------------------------------------------------------------------------------
Use these preloaded credentials to access different sections of the app:
* PATIENT DASHBOARD:
  - Email: pranathi@example.com
  - Password: password123
* DOCTOR DASHBOARD:
  - Email: sarah@example.com
  - Password: password123
* ADMIN DASHBOARD:
  - Email: admin@example.com
  - Password: password123
--------------------------------------------------------------------------------
7. DATA COMMUNICATIONS FLOW
--------------------------------------------------------------------------------
1. Client Form Submission: User inputs data on the UI (e.g. books appointment).
2. API Trigger: Frontend fires an Axios POST call to http://localhost:5000/api.
3. Upload Processing: If a report is attached, Multer interceptor saves it to 
   /uploads/ and generates a filepath.
4. Database Interaction: Express controller validates schema and writes it to 
   the MongoDB database.
5. Response Rendering: Backend returns a success status back to Axios, updating 
   the React context states and triggering a Toast notification.
================================================================================
