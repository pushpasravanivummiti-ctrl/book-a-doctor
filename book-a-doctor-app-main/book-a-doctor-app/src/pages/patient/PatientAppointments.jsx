import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import AppointmentCard from '../../components/AppointmentCard';
import Modal from '../../components/Modal';
import EmptyState from '../../components/EmptyState';
import { RiStarFill } from 'react-icons/ri';
import { toast } from 'react-toastify';

const PatientAppointments = () => {
  const { user } = useAuth();
  const { appointments, cancelAppointment, addDoctorReview } = useApp();
  
  // States
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedApt, setSelectedApt] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // Filter specific to active patient user
  const userAppointments = appointments.filter((a) => a.patientId === user?.id);

  const upcomingAppointments = userAppointments.filter(
    (a) => a.status === 'Confirmed' || a.status === 'Pending'
  );
  const historyAppointments = userAppointments.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled'
  );

  const handleCancelClick = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment slot?')) {
      cancelAppointment(id, 'patient');
    }
  };

  const handleReviewClick = (apt) => {
    setSelectedApt(apt);
    setRating(5);
    setComment('');
    setReviewModalOpen(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please enter your review feedback');
      return;
    }

    addDoctorReview(selectedApt.doctorId, {
      patientName: user.name,
      rating,
      comment
    });

    setReviewModalOpen(false);
    setSelectedApt(null);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. Upcoming Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider border-b border-borderColor dark:border-borderColor-dark pb-3">
          Upcoming Consultations ({upcomingAppointments.length})
        </h2>

        {upcomingAppointments.length === 0 ? (
          <EmptyState
            title="No Scheduled Appointments"
            message="You do not have any pending or confirmed doctor visits. Head to search directory to book a slot."
          />
        ) : (
          <div className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onCancel={handleCancelClick}
                userRole="patient"
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. History Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider border-b border-borderColor dark:border-borderColor-dark pb-3">
          Appointment History ({historyAppointments.length})
        </h2>

        {historyAppointments.length === 0 ? (
          <p className="text-xs text-lightText dark:text-lightText-dark py-4 text-center">No past visits recorded.</p>
        ) : (
          <div className="space-y-4">
            {historyAppointments.map((apt) => (
              <AppointmentCard
                key={apt.id}
                appointment={apt}
                onWriteReview={handleReviewClick}
                userRole="patient"
              />
            ))}
          </div>
        )}
      </div>

      {/* Review Modal popup */}
      <Modal
        isOpen={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        title={`Review Dr. ${selectedApt?.doctorName}`}
      >
        <form onSubmit={handleReviewSubmit} className="space-y-4">
          <p className="text-xs text-lightText leading-relaxed">
            Please share your feedback regarding your consultation on {selectedApt && new Date(selectedApt.date).toDateString()} for {selectedApt?.reason}.
          </p>

          <div className="flex items-center space-x-3">
            <span className="text-xs font-semibold text-darkText dark:text-darkText-dark">Rating:</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setRating(val)}
                  className="p-1 hover:scale-115 transition-transform"
                >
                  <RiStarFill className={`w-6 h-6 ${val <= rating ? 'text-amber-500' : 'text-slate-200 dark:text-slate-700'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Comments</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="How was the diagnostics, wait time, and explaination of dosage?..."
              rows="4"
              className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-custom transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default PatientAppointments;
