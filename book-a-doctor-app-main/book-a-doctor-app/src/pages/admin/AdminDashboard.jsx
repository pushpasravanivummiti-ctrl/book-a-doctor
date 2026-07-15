import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  RiBriefcaseLine, 
  RiShieldUserLine, 
  RiCalendarEventLine, 
  RiMoneyDollarCircleLine,
  RiInformationLine
} from 'react-icons/ri';

const AdminDashboard = () => {
  const { doctorsList, appointments } = useApp();

  const totalDoctors = doctorsList.length;
  
  // Total unique patients
  const totalPatients = new Set(appointments.map((a) => a.patientId)).size || 1;

  // Active appointments
  const activeApts = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending');
  
  // Completed appointments
  const completedApts = appointments.filter((a) => a.status === 'Completed');

  // Revenue calculation
  const totalRevenue = completedApts.reduce((acc, a) => acc + a.fee, 0);

  // SVG Chart: Weekly Revenue simulated values
  const revenueData = [
    { day: 'Mon', val: 3000 },
    { day: 'Tue', val: 4500 },
    { day: 'Wed', val: 6200 },
    { day: 'Thu', val: 5100 },
    { day: 'Fri', val: 7800 },
    { day: 'Sat', val: 4000 }
  ];
  const maxVal = Math.max(...revenueData.map((d) => d.val));

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-premium p-6 sm:p-8 rounded-custom text-white shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
        <div className="relative z-10 space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold">Admin Console</h1>
          <p className="text-xs text-teal-100 font-medium">Healthcare registration dashboard & master database stats.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Doctors */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-primary/10 text-primary rounded-custom">
            <RiBriefcaseLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Total Doctors</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{totalDoctors} Registered</h3>
          </div>
        </div>

        {/* Total Patients */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-custom">
            <RiShieldUserLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Total Patients</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{totalPatients} Registered</h3>
          </div>
        </div>

        {/* Active Appointments */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-custom">
            <RiCalendarEventLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Active Slots</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{activeApts.length} Pending</h3>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-teal-500/10 text-teal-500 rounded-custom">
            <RiMoneyDollarCircleLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Total Earnings</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">₹{totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

      </div>

      {/* Analytics Chart and recent activity log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* SVG Analytics Bar Chart */}
        <div className="lg:col-span-8 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-6">
          <h3 className="text-base font-bold text-darkText dark:text-darkText-dark border-b border-borderColor pb-4">
            Weekly Consults Earning Growth
          </h3>
          
          <div className="flex flex-col items-center py-4">
            {/* Visual Bar Chart */}
            <div className="flex items-end justify-between w-full max-w-lg h-48 px-4 border-b border-l border-borderColor">
              {revenueData.map((d) => {
                const barHeight = (d.val / maxVal) * 100;
                return (
                  <div key={d.day} className="flex flex-col items-center flex-grow group relative">
                    {/* Tooltip value */}
                    <span className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[9px] px-2 py-0.5 rounded font-bold">
                      ₹{d.val}
                    </span>
                    {/* Bar */}
                    <div
                      className="w-8 sm:w-11 bg-gradient-premium rounded-t-lg group-hover:opacity-90 transition-all cursor-pointer"
                      style={{ height: `${barHeight}%` }}
                    ></div>
                    {/* Label */}
                    <span className="text-[10px] font-semibold text-lightText mt-2">{d.day}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-lightText mt-4 flex items-center gap-1">
              <RiInformationLine className="w-4 h-4 text-primary" />
              Hover bars to inspect daily clinic consult billing aggregates.
            </p>
          </div>
        </div>

        {/* Activity Logs */}
        <div className="lg:col-span-4 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
          <h3 className="font-bold text-sm text-darkText dark:text-darkText-dark uppercase tracking-wider border-b border-borderColor pb-4">Activity Logs</h3>

          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {appointments.slice(0, 4).map((apt) => (
              <div key={apt.id} className="text-xs space-y-1 pb-3 border-b border-borderColor border-dashed">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-darkText dark:text-darkText-dark">{apt.patientName}</span>
                  <span className="text-[9px] text-lightText">{apt.date}</span>
                </div>
                <p className="text-lightText dark:text-lightText-dark leading-normal">
                  Booked <span className="font-semibold text-primary">{apt.doctorName}</span> ({apt.specialization}) slot at {apt.time}.
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
