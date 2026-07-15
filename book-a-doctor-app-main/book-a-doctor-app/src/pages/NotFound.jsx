import React from 'react';
import { Link } from 'react-router-dom';
import { RiMentalHealthLine, RiHomeLine } from 'react-icons/ri';

const NotFound = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-900/30">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
          <RiMentalHealthLine className="w-12 h-12" />
        </div>
        <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-bounce">
          404 Error
        </span>
      </div>

      <h1 className="text-4xl font-extrabold text-darkText dark:text-darkText-dark tracking-tight">Page Not Found</h1>
      <p className="text-sm text-lightText dark:text-lightText-dark max-w-sm mx-auto mt-2 leading-relaxed">
        The clinic wing or medical document you are looking for has been moved, archived, or is currently unavailable.
      </p>

      <div className="mt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-6 py-3 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-custom shadow-md"
        >
          <RiHomeLine className="w-4 h-4" />
          Back to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
