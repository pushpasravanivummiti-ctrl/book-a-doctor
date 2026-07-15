import React from 'react';
import { useApp } from '../../context/AppContext';
import { RiShieldUserLine, RiMailLine, RiPhoneLine, RiMapPinLine } from 'react-icons/ri';

const AdminPatients = () => {
  const { appointments } = useApp();

  // Extract unique patient details from master appointments list
  const patientRegistry = [];
  const processedIds = new Set();

  appointments.forEach((apt) => {
    if (!processedIds.has(apt.patientId)) {
      processedIds.add(apt.patientId);
      patientRegistry.push({
        id: apt.patientId,
        name: apt.patientName,
        email: apt.patientEmail || 'patient@example.com',
        phone: apt.patientPhone || '+91 98765 43210',
        dateJoined: '2026-06-01' // Mock registration date
      });
    }
  });

  return (
    <div className="space-y-6 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
      <div className="border-b border-borderColor pb-4 mb-6">
        <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
          <RiShieldUserLine className="w-5 h-5 text-primary" />
          Patient Registry Master Index
        </h3>
        <p className="text-xs text-lightText mt-1">Review active patient accounts.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-borderColor dark:border-borderColor-dark text-lightText uppercase tracking-wider font-semibold">
              <th className="pb-3">Patient ID</th>
              <th className="pb-3">Name</th>
              <th className="pb-3">Email Address</th>
              <th className="pb-3">Phone Number</th>
              <th className="pb-3">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderColor dark:divide-borderColor-dark">
            {patientRegistry.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10">
                <td className="py-4.5 font-mono font-bold text-primary">#{p.id.slice(-6)}</td>
                <td className="py-4.5 font-bold text-darkText dark:text-darkText-dark">{p.name}</td>
                <td className="py-4.5 text-lightText dark:text-lightText-dark font-medium flex items-center gap-1.5 py-4.5">
                  <RiMailLine className="w-4 h-4 text-primary" />
                  {p.email}
                </td>
                <td className="py-4.5 text-lightText dark:text-lightText-dark font-semibold">
                  <RiPhoneLine className="w-4 h-4 text-primary mr-1 inline-block" />
                  {p.phone}
                </td>
                <td className="py-4.5 text-lightText dark:text-lightText-dark">{p.dateJoined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminPatients;
