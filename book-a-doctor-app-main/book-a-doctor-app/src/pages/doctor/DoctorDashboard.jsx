import React from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  RiCalendarEventLine, 
  RiUserHeartLine, 
  RiStarFill, 
  RiMoneyDollarCircleLine,
  RiCheckLine,
  RiCloseLine
} from 'react-icons/ri';
import { toast } from 'react-toastify';

const DoctorDashboard = () => {
  const { appointments, cancelAppointment, doctorsList } = useApp();
  const { user } = useAuth();
  
  // Find doctor object matching Sarah Connor (doc-1)
  const doctorInfo = doctorsList.find((d) => d.id === 'doc-1') || { rating: 4.9, fee: 1000 };

  // Filter appointments for Dr. Sarah Connor
  const docAppointments = appointments.filter((a) => a.doctorId === 'doc-1');

  // Categorize
  const pendingAppointments = docAppointments.filter((a) => a.status === 'Pending' || a.status === 'Confirmed');
  const completedAppointments = docAppointments.filter((a) => a.status === 'Completed');
  
  // Unique patients
  const uniquePatients = new Set(docAppointments.map((a) => a.patientId)).size;

  // Calculate simulated revenue
  const totalRevenue = completedAppointments.reduce((acc, a) => acc + a.fee, 0);

  const handleCompleteApt = (id) => {
    // Complete appointment simulation
    toast.success('Consultation marked as Completed! Billing Invoice generated.');
    // We can directly update state inside the local app simulation context if needed, but simple toast works great for simulation
    appointments.forEach((a) => {
      if (a.id === id) a.status = 'Completed';
    });
  };

  const handleCancelApt = (id) => {
    if (window.confirm('Cancel this consultation?')) {
      cancelAppointment(id, 'doctor');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-premium p-6 sm:p-8 rounded-custom text-white shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
        <div className="relative z-10 space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold">Welcome, {doctorInfo.name || 'Dr. Sarah Connor'}</h1>
          <p className="text-xs text-teal-100 font-medium">Cardiology Clinic Wing • Today: {new Date().toDateString()}</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Appointments Today */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-primary/10 text-primary rounded-custom">
            <RiCalendarEventLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Consults Today</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{pendingAppointments.length} Slots</h3>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-custom">
            <RiUserHeartLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Total Consulted</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{uniquePatients} Patients</h3>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-custom">
            <RiStarFill className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Clinic Rating</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{doctorInfo.rating} ★</h3>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-teal-500/10 text-teal-500 rounded-custom">
            <RiMoneyDollarCircleLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Weekly Revenue</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

      </div>

      {/* Appointments List for Today */}
      <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-6">
        <h3 className="text-base font-bold text-darkText dark:text-darkText-dark border-b border-borderColor pb-4">
          Today's Scheduled Consultations ({pendingAppointments.length})
        </h3>

        {pendingAppointments.length === 0 ? (
          <p className="text-xs text-lightText dark:text-lightText-dark py-6 text-center">No pending appointments scheduled for today.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-borderColor dark:border-borderColor-dark text-lightText uppercase tracking-wider font-semibold">
                  <th className="pb-3">Patient Name</th>
                  <th className="pb-3">Time Slot</th>
                  <th className="pb-3">Reason</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderColor dark:divide-borderColor-dark">
                {pendingAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20">
                    <td className="py-4.5 font-bold text-darkText dark:text-darkText-dark">{apt.patientName}</td>
                    <td className="py-4.5 font-semibold text-primary">{apt.time}</td>
                    <td className="py-4.5 text-lightText dark:text-lightText-dark max-w-xs truncate" title={apt.reason}>{apt.reason}</td>
                    <td className="py-4.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-4.5 text-right flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleCompleteApt(apt.id)}
                        className="p-1.5 bg-emerald-100 hover:bg-emerald-500 hover:text-white text-emerald-800 rounded transition-all"
                        title="Mark Consult Completed"
                      >
                        <RiCheckLine className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCancelApt(apt.id)}
                        className="p-1.5 bg-rose-100 hover:bg-rose-500 hover:text-white text-rose-800 rounded transition-all"
                        title="Cancel Consult"
                      >
                        <RiCloseLine className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default DoctorDashboard;
