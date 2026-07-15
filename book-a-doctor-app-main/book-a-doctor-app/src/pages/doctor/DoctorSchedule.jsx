import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiTimeLine, RiCalendarCheckLine } from 'react-icons/ri';

const DoctorSchedule = () => {
  const { doctorsList, toggleDoctorAvailability } = useApp();

  // Load Dr. Sarah Connor profile
  const doctor = doctorsList.find((d) => d.id === 'doc-1') || { availability: {} };
  
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
      <div className="border-b border-borderColor pb-4">
        <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
          <RiCalendarCheckLine className="w-5 h-5 text-primary" />
          Weekly Clinical Schedule Hours
        </h3>
        <p className="text-xs text-lightText mt-1">Configure weekdays on which your cardiology room accepts patient bookings.</p>
      </div>

      <div className="space-y-4">
        {weekdays.map((day) => {
          const isAvailable = !!doctor.availability[day];
          const activeSlots = doctor.availability[day] || [];

          return (
            <div
              key={day}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-borderColor dark:border-borderColor-dark rounded-custom flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h4 className="font-bold text-sm text-darkText dark:text-darkText-dark">{day}</h4>
                {isAvailable ? (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {activeSlots.map((slot) => (
                      <span
                        key={slot}
                        className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded font-semibold flex items-center gap-1"
                      >
                        <RiTimeLine className="w-3 h-3" />
                        {slot}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-rose-500 font-bold mt-1.5 block">CLOSED (No Bookings Accepted)</span>
                )}
              </div>

              <div className="flex-shrink-0">
                <button
                  onClick={() => toggleDoctorAvailability('doc-1', day)}
                  className={`w-32 py-2 rounded-custom text-xs font-bold transition-colors ${
                    isAvailable
                      ? 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-500 hover:text-white'
                      : 'bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-500 hover:text-white'
                  }`}
                >
                  {isAvailable ? 'Disable Day' : 'Enable Day'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default DoctorSchedule;
