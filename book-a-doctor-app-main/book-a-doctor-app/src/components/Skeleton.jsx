import React from 'react';

export const Skeleton = ({ className }) => {
  return (
    <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded ${className}`}></div>
  );
};

export const DoctorCardSkeleton = () => {
  return (
    <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 animate-pulse">
      <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-200 dark:bg-slate-700 rounded-custom flex-shrink-0"></div>
      <div className="flex-grow space-y-3">
        <div className="h-5 bg-slate-200 dark:bg-slate-700 w-1/3 rounded"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/4 rounded"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 w-1/2 rounded"></div>
        <div className="flex space-x-2 pt-2">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-16 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 w-20 rounded"></div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full md:w-36 space-y-3 md:space-y-0">
        <div className="h-4 bg-slate-200 dark:bg-slate-700 w-12 rounded self-end"></div>
        <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded-custom w-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;
