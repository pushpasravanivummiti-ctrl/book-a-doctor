import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Doctors from './pages/Doctors';
import DoctorDetails from './pages/DoctorDetails';
import BookAppointment from './pages/BookAppointment';
import Contact from './pages/Contact';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';

// Patient Dashboard Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientReports from './pages/patient/PatientReports';
import PatientProfile from './pages/patient/PatientProfile';

// Doctor Dashboard Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorPatients from './pages/doctor/DoctorPatients';
import DoctorSchedule from './pages/doctor/DoctorSchedule';

// Admin Dashboard Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminAppointments from './pages/admin/AdminAppointments';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              
              {/* Public Facing Pages wrapped in MainLayout */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="doctors" element={<Doctors />} />
                <Route path="doctors/:id" element={<DoctorDetails />} />
                <Route path="book/:id" element={<BookAppointment />} />
                <Route path="contact" element={<Contact />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Route>

              {/* Private Dashboard Pages wrapped in DashboardLayout */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                
                {/* Patient Subroutes */}
                <Route path="patient" element={<PatientDashboard />} />
                <Route path="patient/appointments" element={<PatientAppointments />} />
                <Route path="patient/reports" element={<PatientReports />} />
                <Route path="patient/profile" element={<PatientProfile />} />

                {/* Doctor Subroutes */}
                <Route path="doctor" element={<DoctorDashboard />} />
                <Route path="doctor/patients" element={<DoctorPatients />} />
                <Route path="doctor/schedule" element={<DoctorSchedule />} />

                {/* Admin Subroutes */}
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/doctors" element={<AdminDoctors />} />
                <Route path="admin/patients" element={<AdminPatients />} />
                <Route path="admin/appointments" element={<AdminAppointments />} />

              </Route>

            </Routes>
          </BrowserRouter>
          
          {/* Global Alert Notification Toast */}
          <ToastContainer
            position="bottom-left"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
