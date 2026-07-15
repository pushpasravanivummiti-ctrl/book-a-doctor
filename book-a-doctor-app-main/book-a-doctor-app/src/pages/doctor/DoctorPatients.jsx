import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiUserHeartLine, RiMailLine, RiPhoneLine } from 'react-icons/ri';

const DoctorPatients = () => {
  const { appointments } = useApp();

  // Filter Dr. Sarah Connor consults
  const docAppointments = appointments.filter((a) => a.doctorId === 'doc-1');
  
  // Unique patients details map
  const patientRegistry = [];
  const processedIds = new Set();

  docAppointments.forEach((apt) => {
    if (!processedIds.has(apt.patientId)) {
      processedIds.add(apt.patientId);
      patientRegistry.push({
        id: apt.patientId,
        name: apt.patientName,
        email: apt.patientEmail || 'pranathi@example.com',
        phone: apt.patientPhone || '+91 98765 43210',
        lastConsulted: apt.date,
        reason: apt.reason
      });
    }
  });

  return (
    <div className="space-y-6 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
      <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2 border-b border-borderColor pb-4">
        <RiUserHeartLine className="w-5 h-5 text-primary" />
        Clinical Patient Registry ({patientRegistry.length})
      </h3>

      {patientRegistry.length === 0 ? (
        <p className="text-xs text-lightText dark:text-lightText-dark py-6 text-center">No patient records found in your clinical directory.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patientRegistry.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-borderColor dark:border-borderColor-dark rounded-custom space-y-3.5 shadow-xs"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-sm text-darkText dark:text-darkText-dark">{p.name}</h4>
                  <span className="text-[10px] text-lightText font-mono">Patient ID: #{p.id.slice(-6)}</span>
                </div>
                <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  Last consult: {p.lastConsulted}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-lightText dark:text-lightText-dark border-t border-dashed border-borderColor pt-3">
                <p className="flex items-center gap-1.5"><RiMailLine className="w-4 h-4 text-primary" />{p.email}</p>
                <p className="flex items-center gap-1.5"><RiPhoneLine className="w-4 h-4 text-primary" />{p.phone}</p>
                <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 mt-1">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Diagnosis reason:</span> {p.reason}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default DoctorPatients;
