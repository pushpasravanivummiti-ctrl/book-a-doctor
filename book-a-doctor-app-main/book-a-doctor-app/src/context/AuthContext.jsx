import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const mockUsers = {
  patient: {
    id: 'pat-1',
    name: 'Pranathi Satyavarapu',
    email: 'pranathi@example.com',
    phone: '+91 9876543210',
    dob: '1998-05-15',
    gender: 'Female',
    address: 'Flat 402, Signature Residency, Madhapur, Hyderabad, India',
    medicalHistory: 'Mild Hypertension diagnosed in 2024. Allergic to penicillin.',
    role: 'patient',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  doctor: {
    id: 'doc-1', // Corresponds to Dr. Sarah Connor in doctors list
    name: 'Dr. Sarah Connor',
    email: 'sarah@example.com',
    phone: '+91 9123456789',
    role: 'doctor',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=150&q=80'
  },
  admin: {
    id: 'adm-1',
    name: 'Main Administrator',
    email: 'admin@example.com',
    phone: '+91 9998887776',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(mockUsers.patient);
  const [userRole, setUserRole] = useState('patient'); // patient, doctor, admin

  const login = (email, password, role = 'patient') => {
    // Basic mock authentication
    const selectedRole = role.toLowerCase();
    const mockUser = mockUsers[selectedRole] || mockUsers.patient;
    
    // Simulate updating session
    const loggedUser = {
      ...mockUser,
      email: email || mockUser.email
    };
    
    setUser(loggedUser);
    setUserRole(selectedRole);
    return { success: true, user: loggedUser };
  };

  const register = (userData) => {
    const newUser = {
      id: `pat-${Date.now()}`,
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone || '',
      dob: userData.dob || '',
      gender: userData.gender || 'Other',
      address: userData.address || '',
      medicalHistory: '',
      role: 'patient',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };
    
    setUser(newUser);
    setUserRole('patient');
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    setUserRole('guest');
  };

  const updateProfile = (profileData) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        ...profileData
      };
    });
    return { success: true };
  };

  const switchRole = (role) => {
    const targetRole = role.toLowerCase();
    if (mockUsers[targetRole]) {
      setUser(mockUsers[targetRole]);
      setUserRole(targetRole);
    } else {
      setUser(null);
      setUserRole('guest');
    }
  };

  return (
    <AuthContext.Provider value={{ user, userRole, login, register, logout, updateProfile, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
