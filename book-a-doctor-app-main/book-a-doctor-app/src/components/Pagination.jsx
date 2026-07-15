import React from 'react';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 border border-borderColor dark:border-borderColor-dark rounded-custom bg-card dark:bg-card-dark text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RiArrowLeftSLine className="w-5 h-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 font-medium rounded-custom border transition-colors ${
            currentPage === page
              ? 'bg-primary border-primary text-white'
              : 'border-borderColor dark:border-borderColor-dark bg-card dark:bg-card-dark text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 border border-borderColor dark:border-borderColor-dark rounded-custom bg-card dark:bg-card-dark text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <RiArrowRightSLine className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
