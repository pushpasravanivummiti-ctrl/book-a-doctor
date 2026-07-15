================================================================================
                 BOOK A DOCTOR APPOINTMENT SYSTEM - BACKEND API                 
================================================================================
1. SYSTEM OVERVIEW
--------------------------------------------------------------------------------
This is the backend API for the "Book a Doctor" healthcare platform.
It handles MongoDB database storage, CRUD operations, medical file uploads,
and simulated credential logins for Patients, Doctors, and Admins.
2. FEATURES
--------------------------------------------------------------------------------
* MongoDB Atlas Integration: Schema structure built with Mongoose.
* Bcrypt Password Hashing: Hashed passwords saved in the database.
* Session Authentication: Logins verify credentials and return full profiles.
* Multer File Upload: Stores patient medical reports securely.
* Database Seeder: Auto-populates specializations and default test accounts.
* CORS Enabled: Fully compatible with Vite/React frontend.
3. TECH STACK
--------------------------------------------------------------------------------
* Runtime Environment: Node.js
* Backend Framework: Express.js
* Database Engine: MongoDB (via Mongoose ODM)
* File Management: Multer
* Password Security: BcryptJS
* Utility Packages: Nodemon, Dotenv, CORS
4. DIRECTORY LAYOUT
--------------------------------------------------------------------------------
backend/
├── config/
│   └── database.js          (Mongoose connection configuration)
├── controllers/
│   ├── adminController.js   (Admin register, login, listing logic)
│   ├── appointmentController.js (Appointment CRUD and upload handler)
│   ├── doctorController.js  (Doctor registrations, profile updates)
│   ├── patientController.js (Patient registration, profile updates)
│   └── specializationController.js (Specialty categories CRUD)
├── middleware/
│   └── uploadMiddleware.js  (Multer disk storage and file extension filters)
├── models/
│   ├── Admin.js, Appointment.js, Doctor.js, Patient.js, Specialization.js
├── routes/
│   └── (Route mappings linking endpoints to controllers)
├── scripts/
│   └── seed.js              (Database seeder configuration)
├── uploads/                 (Destination folder for patient reports)
├── .env, .env.example, package.json, server.js
5. INSTALLATION & RUNNING
--------------------------------------------------------------------------------
Step 1: Set up Environment Variables
Create a file named ".env" in the backend directory with these variables:
  PORT=5000
  MONGODB_URI=mongodb://127.0.0.1:27017/book-a-doctor
Step 2: Install Packages
Run: npm install
Step 3: Run Database Seeder
Run: npm run seed
Step 4: Start the server
Run: npm run dev
(The server will launch at http://localhost:5000)
6. DEMO CREDENTIALS (PASSWORD FOR ALL IS: password123)
--------------------------------------------------------------------------------
* Patient: pranathi@example.com
* Doctor: sarah@example.com
* Admin: admin@example.com
7. API ENDPOINTS SPECIFICATION
--------------------------------------------------------------------------------
[PATIENTS API]
* POST /api/patient/register  --> Create a new patient account
* POST /api/patient/login     --> Authenticate patient credentials
* GET  /api/patient          --> List all registered patients
* GET  /api/patient/:id      --> Retrieve patient details by ID
* PUT  /api/patient/:id      --> Edit patient profile properties
* DELETE /api/patient/:id    --> Delete patient account
[DOCTORS API]
* POST /api/doctor/register  --> Register a new doctor account
* POST /api/doctor/login     --> Authenticate doctor credentials
* GET  /api/doctors          --> List all doctors (supports query ?specialization=...)
* GET  /api/doctors/:id      --> Get doctor profile details by ID
* PUT  /api/doctors/:id      --> Edit doctor hospital, schedule, or fees
* DELETE /api/doctors/:id    --> Delete doctor account
[ADMINS API]
* POST /api/admin/register   --> Create an admin account
* POST /api/admin/login      --> Authenticate admin credentials
* GET  /api/admin            --> List all administrator accounts
[APPOINTMENTS API]
* POST /api/appointments     --> Book appointment (accepts "medicalReport" file)
* GET  /api/appointments     --> List bookings (supports ?patientId=... or ?doctorId=...)
* GET  /api/appointments/:id --> Get detailed booking information
* PUT  /api/appointments/:id --> Update slot details or status (Pending/Approved/Completed/Cancelled)
* DELETE /api/appointments/:id --> Cancel and delete booking entry
[SPECIALIZATIONS API]
* POST /api/specializations     --> Create a new specialty category
* GET  /api/specializations     --> List all specialties
* PUT  /api/specializations/:id --> Edit specialization properties
* DELETE /api/specializations/:id --> Remove specialization category
8. MEDICAL REPORT UPLOADS
--------------------------------------------------------------------------------
* File field key in request: "medicalReport"
* Allowed extensions: PDF, DOC, DOCX, JPG, PNG
* Storage directory: backend/uploads/
* Static Access URL format: http://localhost:5000/uploads/[FILENAME]
