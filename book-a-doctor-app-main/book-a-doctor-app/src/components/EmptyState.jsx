import React from 'react';
import { RiInboxArchiveLine } from 'react-icons/ri';

const EmptyState = ({ title = 'No results found', message = 'Try modifying your search or filters to find what you are looking for.', icon: Icon = RiInboxArchiveLine, children }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare">
      <div className="p-4 bg-primary/10 rounded-full mb-4 text-primary">
        <Icon className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-bold text-darkText dark:text-darkText-dark mb-1">{title}</h3>
      <p className="text-sm text-lightText dark:text-lightText-dark max-w-sm mb-6">{message}</p>
      {children}
    </div>
  );
};

export default EmptyState;
