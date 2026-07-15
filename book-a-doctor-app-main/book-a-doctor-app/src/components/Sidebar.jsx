import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiCalendarEventLine, 
  RiAttachment2, 
  RiUser3Line, 
  RiBellLine,
  RiShieldUserLine,
  RiTimeLine,
  RiUserHeartLine,
  RiBriefcaseLine
} from 'react-icons/ri';

const Sidebar = ({ role }) => {
  const location = useLocation();

  const menuItems = {
    patient: [
      { label: 'Dashboard', path: '/dashboard/patient', icon: RiDashboardLine, end: true },
      { label: 'Appointments', path: '/dashboard/patient/appointments', icon: RiCalendarEventLine },
      { label: 'Medical Reports', path: '/dashboard/patient/reports', icon: RiAttachment2 },
      { label: 'My Profile', path: '/dashboard/patient/profile', icon: RiUser3Line }
    ],
    doctor: [
      { label: 'Overview', path: '/dashboard/doctor', icon: RiDashboardLine, end: true },
      { label: 'My Patients', path: '/dashboard/doctor/patients', icon: RiUserHeartLine },
      { label: 'Schedule Hours', path: '/dashboard/doctor/schedule', icon: RiTimeLine }
    ],
    admin: [
      { label: 'Overview', path: '/dashboard/admin', icon: RiDashboardLine, end: true },
      { label: 'Doctors', path: '/dashboard/admin/doctors', icon: RiBriefcaseLine },
      { label: 'Patients', path: '/dashboard/admin/patients', icon: RiShieldUserLine },
      { label: 'Appointments', path: '/dashboard/admin/appointments', icon: RiCalendarEventLine }
    ]
  };

  const currentMenu = menuItems[role] || [];

  return (
    <aside className="w-full md:w-64 bg-card dark:bg-card-dark border-r border-borderColor dark:border-borderColor-dark min-h-[calc(100vh-80px)] flex flex-col p-4 flex-shrink-0">
      <div className="space-y-1.5 flex-grow">
        {currentMenu.map((item, index) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={index}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center space-x-3.5 px-4 py-3 text-sm font-semibold rounded-custom transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md'
                    : 'text-lightText dark:text-lightText-dark hover:text-darkText dark:hover:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-custom mt-6 border border-dashed border-borderColor dark:border-borderColor-dark text-center">
        <p className="text-[10px] text-lightText dark:text-lightText-dark uppercase tracking-wider font-bold">Log Session</p>
        <span className="text-xs font-semibold text-darkText dark:text-darkText-dark mt-1 block truncate capitalize">
          {role} mode
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
