import React from 'react';
import { RiCalendarEventLine, RiTimeLine, RiMapPinLine, RiAttachmentLine } from 'react-icons/ri';

const AppointmentCard = ({ appointment, onCancel, onWriteReview, userRole }) => {
  const { id, doctorName, patientName, specialization, date, time, status, reason, fee, reports } = appointment;

  const statusColors = {
    Pending: 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    Confirmed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
    Completed: 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200 dark:border-blue-900/50',
    Cancelled: 'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
      {/* Information block */}
      <div className="flex-grow space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusColors[status]}`}>
            {status}
          </span>
          <span className="text-xs text-lightText dark:text-lightText-dark font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            {specialization}
          </span>
          <span className="text-xs text-lightText dark:text-lightText-dark font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
            ID: #{id.slice(-6)}
          </span>
        </div>

        <div>
          <h4 className="font-bold text-darkText dark:text-darkText-dark text-base">
            {userRole === 'doctor' ? `Patient: ${patientName}` : `Consultation with ${doctorName}`}
          </h4>
          <p className="text-xs text-lightText dark:text-lightText-dark mt-1 flex items-center gap-1">
            <span className="font-semibold text-darkText dark:text-darkText-dark">Reason:</span> {reason}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-lightText dark:text-lightText-dark">
          <div className="flex items-center gap-1.5">
            <RiCalendarEventLine className="w-4 h-4 text-primary" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <RiTimeLine className="w-4 h-4 text-primary" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-darkText dark:text-darkText-dark">Fee:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">₹{fee}</span>
          </div>
        </div>

        {/* Uploaded reports list if any */}
        {reports && reports.length > 0 && (
          <div className="flex items-center gap-2 pt-1.5">
            <span className="text-xs font-semibold text-darkText dark:text-darkText-dark flex items-center gap-1">
              <RiAttachmentLine className="w-3.5 h-3.5 text-slate-500" />
              Attachments:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {reports.map((rep, index) => (
                <span
                  key={index}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 text-lightText dark:text-lightText-dark px-2 py-0.5 rounded border border-borderColor dark:border-borderColor-dark cursor-pointer hover:bg-slate-200 transition-colors"
                  title={`${rep.name} (${rep.size || 'N/A'})`}
                >
                  {rep.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Button Actions block */}
      <div className="flex sm:flex-row flex-col gap-2 w-full md:w-auto md:self-center">
        {(status === 'Pending' || status === 'Confirmed') && (
          <button
            onClick={() => onCancel(id)}
            className="w-full md:w-auto text-xs font-semibold px-4 py-2 border border-danger text-danger hover:bg-danger hover:text-white rounded-custom transition-all"
          >
            Cancel Appointment
          </button>
        )}
        
        {status === 'Completed' && userRole === 'patient' && onWriteReview && (
          <button
            onClick={() => onWriteReview(appointment)}
            className="w-full md:w-auto text-xs font-semibold px-4 py-2 bg-secondary text-white hover:bg-secondary-hover rounded-custom transition-colors"
          >
            Leave a Review
          </button>
        )}
      </div>
    </div>
  );
};

export default AppointmentCard;
