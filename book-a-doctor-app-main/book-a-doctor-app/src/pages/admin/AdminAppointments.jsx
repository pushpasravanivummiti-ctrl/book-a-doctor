import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiCalendarEventLine, RiCloseCircleLine } from 'react-icons/ri';

const AdminAppointments = () => {
  const { appointments, cancelAppointment } = useApp();

  const handleCancelClick = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment system-wide?')) {
      cancelAppointment(id, 'admin');
    }
  };

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    Confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
    Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900/50',
    Cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
  };

  return (
    <div className="space-y-6 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
      <div className="border-b border-borderColor pb-4 mb-6">
        <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
          <RiCalendarEventLine className="w-5 h-5 text-primary" />
          Master Appointment Consultation Schedule
        </h3>
        <p className="text-xs text-lightText mt-1">System-wide monitoring of doctor booking slots.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-borderColor dark:border-borderColor-dark text-lightText uppercase tracking-wider font-semibold">
              <th className="pb-3">Appt ID</th>
              <th className="pb-3">Patient Name</th>
              <th className="pb-3">Doctor Consultation</th>
              <th className="pb-3">Date & Time</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderColor dark:divide-borderColor-dark">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10">
                <td className="py-4.5 font-mono font-bold text-lightText">#{apt.id.slice(-6)}</td>
                <td className="py-4.5 font-bold text-darkText dark:text-darkText-dark">{apt.patientName}</td>
                <td className="py-4.5 font-semibold text-primary">
                  {apt.doctorName}
                  <span className="block text-[9px] text-lightText font-normal">{apt.specialization}</span>
                </td>
                <td className="py-4.5 text-lightText dark:text-lightText-dark font-medium">
                  {apt.date}
                  <span className="block text-[10px] text-primary font-bold">{apt.time}</span>
                </td>
                <td className="py-4.5">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${statusColors[apt.status]}`}>
                    {apt.status}
                  </span>
                </td>
                <td className="py-4.5 text-right">
                  {(apt.status === 'Pending' || apt.status === 'Confirmed') ? (
                    <button
                      onClick={() => handleCancelClick(apt.id)}
                      className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded border border-rose-200 transition-all inline-block"
                      title="Cancel System Appointment"
                    >
                      <RiCloseCircleLine className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-[10px] text-lightText italic">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminAppointments;
