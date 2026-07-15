import React from 'react';
import { Link } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';

const Breadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm text-lightText mb-6 overflow-x-auto whitespace-nowrap py-1">
      <Link to="/" className="hover:text-primary transition-colors">Home</Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <RiArrowRightSLine className="w-4 h-4 flex-shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-primary transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-darkText dark:text-darkText-dark">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
