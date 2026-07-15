Book a Doctor Appointment System - Backend API
This is the backend API for the Book a Doctor healthcare appointment booking platform. It handles data storage, CRUD operations, file uploads for medical reports, and basic simulated login authentication for Patients, Doctors, and Admins.

🚀 Features
MongoDB Atlas Integration: Relational-like schemas set up using Mongoose.
Bcrypt Password Hashing: Hashed passwords saved in database tables with pre-save triggers.
Zero-Token Session Authentication: Clean simulated logins that verify credentials and return full user data profiles.
Multer File Upload: Allows patients/doctors to upload medical reports and securely stores them.
Dynamic Preloaded Database Seed: Auto-populates specializations, default test user credentials, and sample appointments.
CORS & Static Files: Fully compatible with Vite/React frontend, serving static files out of the /uploads folder.
🛠️ Tech Stack
Runtime: Node.js
Framework: Express.js
Database: MongoDB (via Mongoose ODM)
File Upload: Multer
Security: BcryptJS
Dev Tooling: Nodemon, Dotenv, CORS
📂 Project Structure
text


backend/
├── config/
│   └── database.js          # Mongoose database connection setup
├── controllers/
│   ├── adminController.js   # Admin registers, logins, lists
│   ├── appointmentController.js # Appointment creation, status updates, listings
│   ├── doctorController.js  # Doctor profile registration, updates, lists
│   ├── patientController.js # Patient profile registrations, updates, lists
│   └── specializationController.js # Specialty category management
├── middleware/
│   └── uploadMiddleware.js  # Multer file storage & upload filtering
├── models/
│   ├── Admin.js             # Admin Mongoose model
│   ├── Appointment.js       # Appointment Mongoose model
│   ├── Doctor.js            # Doctor Mongoose model
│   ├── Patient.js           # Patient Mongoose model
│   └── Specialization.js    # Specialization Mongoose model
├── routes/
│   ├── adminRoutes.js
│   ├── appointmentRoutes.js
│   ├── doctorRoutes.js
│   ├── patientRoutes.js
│   └── specializationRoutes.js
├── scripts/
│   └── seed.js              # Clear DB & seeds mock doctors, patients, and admins
├── uploads/                 # Storage folder for uploaded reports (git-ignored)
├── .env                     # System environment file
├── .env.example             # Env reference template
├── package.json
└── server.js                # Application entrypoint
⚙️ Installation & Setup
1. Configure the Environment Variables
Create a .env file in the backend/ root directory and copy the contents from .env.example:

env


PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/book-a-doctor
(Replace mongodb://127.0.0.1:27017/book-a-doctor with your MongoDB Atlas Connection String if you are using Atlas)

2. Install Project Dependencies
Run this command from inside the backend/ directory:

bash


npm install
3. Seed the Database
Run the preloaded database seeder script to populate default patient, doctor, and admin users:

bash


npm run seed
4. Run the Server
Run the Express application in development mode (with Nodemon automatic restarts):

bash


npm run dev
The server will boot up on http://localhost:5000.

🔑 Seeded Demo Credentials
Use the following preloaded credentials to log in during development:

Role	Email Address	Password	Name / Details
Patient	pranathi@example.com	password123	Pranathi Satyavarapu
Doctor	sarah@example.com	password123	Dr. Sarah Connor (Cardiology)
Admin	admin@example.com	password123	Main Administrator
📡 API Endpoints Reference
1. Patients (/api/patient)
Method	Endpoint	Description	Payload Example
POST	/api/patient/register	Register a new Patient	{ fullName, email, password, phone, ... }
POST	/api/patient/login	Login Patient (Bcrypt validation)	{ email, password }
GET	/api/patient	Get all Patients	None
GET	/api/patient/:id	Get single Patient profile	None
PUT	/api/patient/:id	Update Patient details	{ address, age, bloodGroup, ... }
DELETE	/api/patient/:id	Delete Patient profile	None
2. Doctors (/api/doctor and /api/doctors)
Method	Endpoint	Description	Payload Example
POST	/api/doctor/register	Register a new Doctor	{ name, email, password, specialization, ... }
POST	/api/doctor/login	Login Doctor	{ email, password }
GET	/api/doctors	Get all Doctors (Supports query ?specialization=...)	None
GET	/api/doctors/:id	Get single Doctor profile	None
PUT	/api/doctors/:id	Update Doctor details	{ hospital, fee, bio, availableTime, ... }
DELETE	/api/doctors/:id	Delete Doctor profile	None
3. Admins (/api/admin)
Method	Endpoint	Description	Payload Example
POST	/api/admin/register	Register a new Admin	{ name, email, password, phone }
POST	/api/admin/login	Login Admin	{ email, password }
GET	/api/admin	Get all Admins	None
4. Appointments (/api/appointments)
Method	Endpoint	Description	Payload Example / Notes
POST	/api/appointments	Book new appointment	Uses multipart/form-data for optional medicalReport file upload
GET	/api/appointments	Get appointments	Supports filters ?patientId=... or ?doctorId=...
GET	/api/appointments/:id	Get detailed booking info	Populates full Doctor and Patient detail references
PUT	/api/appointments/:id	Update booking status/date	Status values: 'Pending', 'Approved', 'Completed', 'Cancelled'
DELETE	/api/appointments/:id	Delete booking entry	None
5. Specializations (/api/specializations)
Method	Endpoint	Description	Payload Example
POST	/api/specializations	Create a medical specialty	{ name, description, image }
GET	/api/specializations	Get all specialties	None
PUT	/api/specializations/:id	Edit specialty details	{ name, description, image }
DELETE	/api/specializations/:id	Remove specialty	None
