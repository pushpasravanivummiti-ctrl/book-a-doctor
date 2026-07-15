import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { 
  doctors as initialDoctors, 
  preloadedAppointments, 
  preloadedReports, 
  preloadedNotifications 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [doctorsList, setDoctorsList] = useState(initialDoctors);
  const [appointments, setAppointments] = useState(preloadedAppointments);
  const [reports, setReports] = useState(preloadedReports);
  const [notifications, setNotifications] = useState(preloadedNotifications);

  // Manage Notifications
  const addNotification = (userId, title, message, type = 'info') => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = (userId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.userId === userId ? { ...n, read: true } : n))
    );
    toast.success('All notifications marked as read');
  };

  // Appointment Actions
  const bookAppointment = (data) => {
    const { doctorId, date, time, reason, reportsList, patientInfo } = data;
    const doctor = doctorsList.find((d) => d.id === doctorId);

    if (!doctor) {
      toast.error('Doctor not found');
      return { success: false };
    }

    const newAppointment = {
      id: `apt-${Date.now()}`,
      patientId: patientInfo.id,
      patientName: patientInfo.name,
      patientEmail: patientInfo.email,
      patientPhone: patientInfo.phone,
      doctorId,
      doctorName: doctor.name,
      specialization: doctor.specialization,
      date,
      time,
      fee: doctor.fee,
      status: 'Confirmed',
      reason,
      reports: reportsList || [],
    };

    setAppointments((prev) => [newAppointment, ...prev]);

    // Add notification for patient
    addNotification(
      patientInfo.id,
      'Appointment Booked',
      `Your consultation with ${doctor.name} is confirmed for ${date} at ${time}.`,
      'success'
    );

    // Add notification for doctor
    addNotification(
      doctorId,
      'New Appointment Scheduled',
      `Patient ${patientInfo.name} has scheduled an appointment on ${date} at ${time}.`,
      'info'
    );

    toast.success(`Appointment confirmed with ${doctor.name}!`);
    return { success: true, appointment: newAppointment };
  };

  const cancelAppointment = (id, actorRole = 'patient') => {
    const apt = appointments.find((a) => a.id === id);
    if (!apt) return { success: false };

    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Cancelled' } : a))
    );

    // Notify patient
    addNotification(
      apt.patientId,
      'Appointment Cancelled',
      `The appointment with ${apt.doctorName} on ${apt.date} has been cancelled.`,
      'danger'
    );

    // Notify doctor
    addNotification(
      apt.doctorId,
      'Appointment Cancelled',
      `Patient ${apt.patientName} has cancelled the appointment for ${apt.date} at ${apt.time}.`,
      'danger'
    );

    toast.warn('Appointment cancelled successfully');
    return { success: true };
  };

  // Upload Medical Report
  const uploadReport = (data) => {
    const { patientId, patientName, fileName, fileSize, doctorName, category } = data;

    const newReport = {
      id: `rep-${Date.now()}`,
      patientId,
      patientName,
      fileName,
      fileSize,
      uploadedAt: new Date().toISOString().split('T')[0],
      doctorName: doctorName || 'General Upload',
      category: category || 'General',
    };

    setReports((prev) => [newReport, ...prev]);

    // Notify
    addNotification(
      patientId,
      'Medical Report Uploaded',
      `File ${fileName} has been added to your reports folder.`,
      'success'
    );

    toast.success('Medical report uploaded successfully');
    return { success: true };
  };

  // Doctor Availability Toggle
  const toggleDoctorAvailability = (docId, day) => {
    setDoctorsList((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const updatedAvailability = { ...doc.availability };
          if (updatedAvailability[day]) {
            delete updatedAvailability[day];
          } else {
            updatedAvailability[day] = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
          }
          return { ...doc, availability: updatedAvailability };
        }
        return doc;
      })
    );
    toast.success(`Availability updated for ${day}`);
  };

  // Admin CRUD for Doctors
  const addDoctor = (docData) => {
    const newDoc = {
      id: `doc-${Date.now()}`,
      ...docData,
      rating: 5.0,
      reviewsCount: 0,
      reviews: [],
      availability: {
        Monday: ['09:00 AM', '11:00 AM', '03:00 PM'],
        Wednesday: ['09:00 AM', '11:00 AM', '03:00 PM'],
        Friday: ['09:00 AM', '11:00 AM', '03:00 PM'],
      },
    };

    setDoctorsList((prev) => [...prev, newDoc]);
    toast.success(`Doctor ${docData.name} added successfully!`);
    return { success: true };
  };

  const updateDoctor = (docId, docData) => {
    setDoctorsList((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, ...docData } : doc))
    );
    toast.success('Doctor details updated successfully');
    return { success: true };
  };

  const deleteDoctor = (docId) => {
    setDoctorsList((prev) => prev.filter((doc) => doc.id !== docId));
    toast.warn('Doctor removed from registration system');
    return { success: true };
  };

  // Reviews Actions
  const addDoctorReview = (docId, data) => {
    const { patientName, rating, comment } = data;
    
    setDoctorsList((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const newReview = {
            id: `rev-${Date.now()}`,
            patientName,
            rating: Number(rating),
            date: new Date().toISOString().split('T')[0],
            comment,
          };
          const updatedReviews = [newReview, ...(doc.reviews || [])];
          
          // Recalculate rating
          const totalRating = updatedReviews.reduce((acc, r) => acc + r.rating, 0);
          const avgRating = (totalRating / updatedReviews.length).toFixed(1);

          return {
            ...doc,
            rating: Number(avgRating),
            reviewsCount: updatedReviews.length,
            reviews: updatedReviews,
          };
        }
        return doc;
      })
    );

    toast.success('Thank you! Your review has been submitted.');
  };

  return (
    <AppContext.Provider
      value={{
        doctorsList,
        appointments,
        reports,
        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        bookAppointment,
        cancelAppointment,
        uploadReport,
        toggleDoctorAvailability,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addDoctorReview,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
