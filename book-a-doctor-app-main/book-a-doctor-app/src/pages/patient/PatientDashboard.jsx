import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  RiCalendarEventLine, 
  RiHistoryLine, 
  RiFolderShieldLine, 
  RiProfileLine,
  RiArrowRightLine,
  RiInformationLine
} from 'react-icons/ri';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { appointments, reports } = useApp();

  // Filter specific to active patient user
  const userAppointments = appointments.filter((a) => a.patientId === user?.id);
  const userReports = reports.filter((r) => r.patientId === user?.id);

  const upcomingAppointments = userAppointments.filter(
    (a) => a.status === 'Confirmed' || a.status === 'Pending'
  );
  const historyAppointments = userAppointments.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled'
  );

  const nearestApt = upcomingAppointments.length > 0 ? upcomingAppointments[0] : null;

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-premium p-6 sm:p-8 rounded-custom text-white shadow-md relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
        <div className="relative z-10 space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold">Hello, {user?.name}!</h1>
          <p className="text-xs text-teal-100 font-medium">
            Welcome to your digital healthcare panel. Check your upcoming slots and medical records.
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Upcoming */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-primary/10 text-primary rounded-custom">
            <RiCalendarEventLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Upcoming Consults</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{upcomingAppointments.length}</h3>
          </div>
        </div>

        {/* Card 2: Completed */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-custom">
            <RiHistoryLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Completed Visits</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{historyAppointments.length}</h3>
          </div>
        </div>

        {/* Card 3: Medical Docs */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare flex items-center space-x-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-custom">
            <RiFolderShieldLine className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Uploaded Records</span>
            <h3 className="text-xl font-bold text-darkText dark:text-darkText-dark mt-0.5">{userReports.length} Files</h3>
          </div>
        </div>

        {/* Card 4: Profile Completion */}
        <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-lightText uppercase tracking-wider font-bold">Profile Completion</span>
            <span className="text-xs font-bold text-primary">85%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </div>

      </div>

      {/* Main Grid: Nearest Appointment & Fast CTAs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Nearest Appointment Card */}
        <div className="lg:col-span-8 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
          <div className="flex items-center justify-between border-b border-borderColor dark:border-borderColor-dark pb-4">
            <h3 className="font-bold text-sm text-darkText dark:text-darkText-dark uppercase tracking-wider">Upcoming Consult Focal</h3>
            <Link to="/dashboard/patient/appointments" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
              See All <RiArrowRightLine className="w-4.5 h-4.5" />
            </Link>
          </div>

          {nearestApt ? (
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-custom border border-borderColor dark:border-borderColor-dark space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-base text-darkText dark:text-darkText-dark">{nearestApt.doctorName}</h4>
                  <span className="text-xs text-primary font-semibold">{nearestApt.specialization}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {nearestApt.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs text-lightText">
                <div>
                  <span className="font-bold text-darkText dark:text-darkText-dark block">Date & Time Slot</span>
                  <span className="block mt-0.5">{new Date(nearestApt.date).toDateString()}</span>
                  <span className="block font-semibold text-primary">{nearestApt.time}</span>
                </div>
                <div>
                  <span className="font-bold text-darkText dark:text-darkText-dark block">Consultation Reason</span>
                  <span className="block mt-0.5 truncate max-w-[200px]" title={nearestApt.reason}>
                    {nearestApt.reason}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 text-center space-y-3.5 bg-slate-50 dark:bg-slate-800/40 border border-borderColor rounded-custom">
              <RiInformationLine className="w-8 h-8 text-primary mx-auto" />
              <p className="text-xs text-lightText dark:text-lightText-dark max-w-sm mx-auto">
                You do not have any pending or confirmed upcoming doctor visits scheduled.
              </p>
              <Link to="/doctors" className="inline-block px-5 py-2 bg-primary text-white text-xs font-bold rounded-custom">
                Book Consultation Now
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions Shortcuts */}
        <div className="lg:col-span-4 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
          <h3 className="font-bold text-sm text-darkText dark:text-darkText-dark uppercase tracking-wider border-b border-borderColor pb-4">Digital Services</h3>
          
          <div className="space-y-2">
            <Link
              to="/doctors"
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-custom border hover:border-primary transition-all text-xs font-semibold text-darkText dark:text-darkText-dark"
            >
              <span>Book Appointment Slot</span>
              <span className="text-primary font-bold">→</span>
            </Link>
            <Link
              to="/dashboard/patient/reports"
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-custom border hover:border-primary transition-all text-xs font-semibold text-darkText dark:text-darkText-dark"
            >
              <span>Upload Medical Records</span>
              <span className="text-primary font-bold">→</span>
            </Link>
            <Link
              to="/contact"
              className="w-full flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-custom border hover:border-primary transition-all text-xs font-semibold text-darkText dark:text-darkText-dark"
            >
              <span>Inquire Helpline Desk</span>
              <span className="text-primary font-bold">→</span>
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
};

export default PatientDashboard;
