import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { 
  RiBellLine, 
  RiCheckDoubleLine,
  RiCheckboxCircleLine,
  RiCalendarEventLine,
  RiFileCheckLine,
  RiErrorWarningLine
} from 'react-icons/ri';
import { toast } from 'react-toastify';

const Notifications = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // all, unread, read

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState title="Access Restricted" message="Please sign in to access your notification logs.">
          <a href="/login" className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-custom">Sign In</a>
        </EmptyState>
      </div>
    );
  }

  // Filter user notifications
  const userNotifs = notifications.filter((n) => n.userId === user.id);
  const unreadCount = userNotifs.filter((n) => !n.read).length;

  const filteredNotifs = userNotifs.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const getNotifIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('confirm') || t.includes('book')) return RiCheckboxCircleLine;
    if (t.includes('calendar') || t.includes('schedule') || t.includes('time')) return RiCalendarEventLine;
    if (t.includes('report') || t.includes('file') || t.includes('record')) return RiFileCheckLine;
    return RiBellLine;
  };

  const getNotifColor = (type) => {
    if (type === 'success') return 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/20';
    if (type === 'warning') return 'text-amber-500 bg-amber-500/10 dark:bg-amber-950/20';
    if (type === 'danger') return 'text-rose-500 bg-rose-500/10 dark:bg-rose-950/20';
    return 'text-primary bg-primary/10 dark:bg-primary/20';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Notifications Hub' }]} />

      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-borderColor dark:border-borderColor-dark pb-6">
          <div>
            <h1 className="text-2xl font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
              <RiBellLine className="w-6 h-6 text-primary" />
              Notifications
            </h1>
            <p className="text-xs text-lightText dark:text-lightText-dark mt-1">
              You have {unreadCount} unread system alerts in this session.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={() => markAllNotificationsRead(user.id)}
              className="text-xs font-bold text-primary dark:text-primary-dark hover:underline flex items-center gap-1 flex-shrink-0"
            >
              <RiCheckDoubleLine className="w-4 h-4" />
              Mark all as read
            </button>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex gap-2">
          {['all', 'unread', 'read'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-custom text-xs font-semibold border capitalize transition-all ${
                filter === f
                  ? 'bg-primary border-primary text-white shadow-sm'
                  : 'bg-card border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark hover:bg-slate-50'
              }`}
            >
              {f} Alerts
            </button>
          ))}
        </div>

        {/* List render */}
        {filteredNotifs.length === 0 ? (
          <EmptyState
            title="Notification Log Empty"
            message={`You do not have any ${filter !== 'all' ? filter : ''} notifications in your clinical inbox.`}
            icon={RiBellLine}
          />
        ) : (
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom shadow-healthcare divide-y divide-borderColor dark:divide-borderColor-dark overflow-hidden">
            {filteredNotifs.map((n) => {
              const Icon = getNotifIcon(n.title);
              const colorClass = getNotifColor(n.type);
              return (
                <div
                  key={n.id}
                  onClick={() => markNotificationRead(n.id)}
                  className={`p-5 flex items-start space-x-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors ${
                    !n.read ? 'bg-primary/5 font-semibold' : ''
                  }`}
                >
                  <div className={`p-2.5 rounded-full flex-shrink-0 ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-darkText dark:text-darkText-dark">{n.title}</h4>
                      <span className="text-[10px] text-lightText font-medium">{n.timestamp}</span>
                    </div>
                    <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed font-normal">
                      {n.message}
                    </p>
                    {!n.read && (
                      <span className="inline-block text-[9px] font-bold text-primary dark:text-primary-dark mt-1">
                        ● Mark as read
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Notifications;
