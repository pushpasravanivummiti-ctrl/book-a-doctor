import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import { 
  RiMenu3Line, 
  RiCloseLine, 
  RiSunLine, 
  RiMoonLine, 
  RiBellLine, 
  RiUser3Line, 
  RiDashboardLine, 
  RiLogoutBoxRLine,
  RiCheckDoubleLine
} from 'react-icons/ri';

const Navbar = () => {
  const { user, userRole, switchRole, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  
  const notifRef = useRef(null);
  const profileRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Close menus on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setNotifDropdownOpen(false);
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  // Handle outside click to close dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter notifications for active user
  const userNotifs = notifications.filter(
    (n) => n.userId === user?.id || (userRole === 'doctor' && n.userId === 'doc-1')
  );
  const unreadCount = userNotifs.filter((n) => !n.read).length;

  const getDashboardPath = () => {
    if (userRole === 'patient') return '/dashboard/patient';
    if (userRole === 'doctor') return '/dashboard/doctor';
    if (userRole === 'admin') return '/dashboard/admin';
    return '/';
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Doctors', path: '/doctors' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-card/90 dark:bg-card-dark/90 backdrop-blur-md border-b border-borderColor dark:border-borderColor-dark shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-custom bg-gradient-premium flex items-center justify-center text-white font-bold text-xl shadow-md">
                <span>+</span>
              </div>
              <div>
                <span className="font-bold text-xl text-darkText dark:text-darkText-dark tracking-tight">Book a Doctor</span>
                <span className="block text-[9px] text-lightText dark:text-lightText-dark uppercase tracking-widest font-semibold">Healthcare Made Simple</span>
              </div>
            </Link>
          </div>

          {/* Center Links - Desktop */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors ${
                    isActive
                      ? 'text-primary'
                      : 'text-lightText dark:text-lightText-dark hover:text-primary dark:hover:text-primary-dark'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right Action Icons & Role switcher */}
          <div className="hidden md:flex items-center space-x-4">
            
            {/* Quick Demo Role Switcher */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-custom text-xs">
              <span className="text-[10px] text-lightText dark:text-lightText-dark font-bold px-2">Role:</span>
              {['Patient', 'Doctor', 'Admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    navigate(role === 'Patient' ? '/dashboard/patient' : role === 'Doctor' ? '/dashboard/doctor' : '/dashboard/admin');
                  }}
                  className={`px-2.5 py-1 rounded-custom font-semibold transition-all ${
                    userRole === role.toLowerCase()
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-lightText dark:text-lightText-dark hover:text-darkText'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-lightText dark:text-lightText-dark hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
              title="Toggle Dark Mode"
            >
              {theme === 'dark' ? <RiSunLine className="w-5 h-5" /> : <RiMoonLine className="w-5 h-5" />}
            </button>

            {/* Notifications Dropdown Container */}
            {user && (
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="p-2 text-lightText dark:text-lightText-dark hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors relative"
                >
                  <RiBellLine className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-danger text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-white">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-80 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-borderColor dark:border-borderColor-dark flex items-center justify-between">
                      <span className="font-bold text-sm text-darkText dark:text-darkText-dark">Notifications</span>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => markAllNotificationsRead(user.id)}
                          className="text-[10px] text-primary hover:underline font-semibold flex items-center gap-0.5"
                        >
                          <RiCheckDoubleLine className="w-3.5 h-3.5" />
                          Mark all read
                        </button>
                      )}
                    </div>
                    <div className="max-h-64 overflow-y-auto divide-y divide-borderColor dark:divide-borderColor-dark">
                      {userNotifs.length === 0 ? (
                        <div className="p-6 text-center text-xs text-lightText dark:text-lightText-dark">
                          No notifications yet.
                        </div>
                      ) : (
                        userNotifs.map((notif) => (
                          <div
                            key={notif.id}
                            onClick={() => markNotificationRead(notif.id)}
                            className={`p-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer ${
                              !notif.read ? 'bg-primary/5 font-semibold' : ''
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-darkText dark:text-darkText-dark">{notif.title}</span>
                              <span className="text-[9px] text-lightText font-normal">{notif.timestamp}</span>
                            </div>
                            <p className="text-[11px] text-lightText dark:text-lightText-dark mt-1 font-normal leading-normal">
                              {notif.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-borderColor dark:border-borderColor-dark text-center bg-slate-50 dark:bg-slate-800/60">
                      <Link to="/notifications" className="text-xs text-primary font-bold hover:underline">
                        See all alerts
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown Container */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-custom transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full border border-primary/20 object-cover"
                  />
                  <span className="text-xs font-semibold text-darkText dark:text-darkText-dark max-w-[100px] truncate hidden lg:inline">
                    {user.name.split(' ')[0]}
                  </span>
                </button>

                {/* Profile Panel */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom shadow-xl overflow-hidden z-50 divide-y divide-borderColor dark:divide-borderColor-dark">
                    <div className="p-4 flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <div className="overflow-hidden">
                        <h4 className="text-xs font-bold text-darkText dark:text-darkText-dark truncate">{user.name}</h4>
                        <p className="text-[10px] text-lightText dark:text-lightText-dark capitalize truncate">{userRole}</p>
                      </div>
                    </div>
                    <div className="py-1">
                      <Link
                        to={getDashboardPath()}
                        className="px-4 py-2 text-xs text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <RiDashboardLine className="w-4 h-4 text-primary" />
                        Dashboard
                      </Link>
                      <Link
                        to={userRole === 'patient' ? '/dashboard/patient/profile' : '#'}
                        className="px-4 py-2 text-xs text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2"
                      >
                        <RiUser3Line className="w-4 h-4 text-primary" />
                        Profile Settings
                      </Link>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-xs text-danger hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2"
                      >
                        <RiLogoutBoxRLine className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-xs font-semibold px-4 py-2 border border-primary text-primary hover:bg-primary/5 rounded-custom transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-xs font-semibold px-4 py-2 bg-primary text-white hover:bg-primary-hover rounded-custom transition-colors shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}

          </div>

          {/* Burger Menu - Mobile */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-lightText rounded-full"
            >
              {theme === 'dark' ? <RiSunLine className="w-5 h-5" /> : <RiMoonLine className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-lightText hover:text-darkText rounded-full"
            >
              {mobileMenuOpen ? <RiCloseLine className="w-6 h-6" /> : <RiMenu3Line className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-borderColor dark:border-borderColor-dark bg-card dark:bg-card-dark px-4 py-4 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="block px-3 py-2 text-base font-semibold text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-custom"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Role Switcher */}
          <div className="border-t border-borderColor dark:border-borderColor-dark pt-3">
            <p className="text-xs text-lightText font-bold px-3 mb-2">Review Role Dashboards:</p>
            <div className="flex space-x-2 px-3">
              {['Patient', 'Doctor', 'Admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    navigate(role === 'Patient' ? '/dashboard/patient' : role === 'Doctor' ? '/dashboard/doctor' : '/dashboard/admin');
                  }}
                  className={`px-3 py-1.5 text-xs rounded-custom font-semibold ${
                    userRole === role.toLowerCase()
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-lightText dark:text-lightText-dark'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-borderColor dark:border-borderColor-dark pt-3 space-y-2">
            {user ? (
              <>
                <Link
                  to={getDashboardPath()}
                  className="block px-3 py-2 text-base font-semibold text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-custom"
                >
                  Go to {userRole.toUpperCase()} Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-base font-semibold text-danger hover:bg-rose-50 dark:hover:bg-rose-950/10 rounded-custom"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 px-3">
                <Link
                  to="/login"
                  className="text-center font-semibold px-4 py-2 border border-primary text-primary rounded-custom"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="text-center font-semibold px-4 py-2 bg-primary text-white rounded-custom"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
