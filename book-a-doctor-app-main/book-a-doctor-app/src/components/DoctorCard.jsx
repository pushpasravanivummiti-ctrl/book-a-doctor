import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RiStarFill, RiMapPinLine, RiTimeLine, RiMoneyDollarCircleLine } from 'react-icons/ri';

const DoctorCard = ({ doctor }) => {
  const { id, name, specialization, qualification, experience, rating, reviewsCount, fee, hospital, image } = doctor;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-5 shadow-healthcare hover:shadow-healthcare-hover transition-shadow flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5"
    >
      {/* Doctor Image */}
      <div className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 h-44 rounded-custom overflow-hidden flex-shrink-0 border border-borderColor dark:border-borderColor-dark">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80';
          }}
        />
      </div>

      {/* Doctor Details */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-dark rounded-full">
                {specialization}
              </span>
              <h3 className="text-lg font-bold text-darkText dark:text-darkText-dark mt-1.5 hover:text-primary transition-colors">
                <Link to={`/doctors/${id}`}>{name}</Link>
              </h3>
              <p className="text-xs text-lightText dark:text-lightText-dark mt-0.5">{qualification}</p>
            </div>
            
            {/* Rating */}
            <div className="flex items-center space-x-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-900/50">
              <RiStarFill className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{rating}</span>
              <span className="text-[10px] text-lightText dark:text-lightText-dark">({reviewsCount})</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 text-xs text-lightText dark:text-lightText-dark">
            <div className="flex items-center space-x-1.5">
              <RiTimeLine className="w-4 h-4 text-primary" />
              <span>{experience} Years Experience</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <RiMapPinLine className="w-4 h-4 text-primary" />
              <span className="truncate max-w-[160px]">{hospital.split(',')[0]}</span>
            </div>
          </div>
        </div>

        {/* Action Row */}
        <div className="flex items-center justify-between border-t border-borderColor dark:border-borderColor-dark mt-4 pt-4">
          <div className="flex items-center space-x-1">
            <RiMoneyDollarCircleLine className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-darkText dark:text-darkText-dark">₹{fee}</span>
            <span className="text-[10px] text-lightText dark:text-lightText-dark">Fee</span>
          </div>

          <div className="flex space-x-2">
            <Link
              to={`/doctors/${id}`}
              className="text-xs font-semibold px-3.5 py-1.5 border border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-custom transition-colors"
            >
              View Profile
            </Link>
            <Link
              to={`/book/${id}`}
              className="text-xs font-semibold px-3.5 py-1.5 bg-primary text-white hover:bg-primary-hover rounded-custom transition-colors shadow-sm"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DoctorCard;
