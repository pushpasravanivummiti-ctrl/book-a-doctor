import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';

const DashboardLayout = () => {
  const { user, userRole } = useAuth();

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      <div className="flex-grow flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-6 md:gap-8">
        <Sidebar role={userRole} />
        <div className="flex-grow min-w-0">
          <Outlet />
        </div>
      </div>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default DashboardLayout;
