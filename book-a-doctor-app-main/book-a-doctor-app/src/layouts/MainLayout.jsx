import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingChat from '../components/FloatingChat';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <FloatingChat />
    </div>
  );
};

export default MainLayout;
