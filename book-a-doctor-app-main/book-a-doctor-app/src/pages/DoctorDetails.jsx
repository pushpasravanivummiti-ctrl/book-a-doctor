import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { 
  RiStarFill, 
  RiMapPinLine, 
  RiTimeLine, 
  RiMoneyDollarCircleLine, 
  RiTranslate,
  RiShieldCheckLine,
  RiChat4Line
} from 'react-icons/ri';
import { toast } from 'react-toastify';

const DoctorDetails = () => {
  const { id } = useParams();
  const { doctorsList, addDoctorReview } = useApp();
  const { user } = useAuth();
  
  // Local Review Form States
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  
  const doctor = doctorsList.find((doc) => doc.id === id);

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState
          title="Doctor Profile Not Found"
          message="The doctor ID you are looking for does not exist in our registration directories."
        >
          <Link to="/doctors" className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-custom">
            Back to Doctors Directory
          </Link>
        </EmptyState>
      </div>
    );
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error('Please enter your review comments');
      return;
    }

    addDoctorReview(doctor.id, {
      patientName: user ? user.name : 'Anonymous Patient',
      rating,
      comment
    });

    setComment('');
    setRating(5);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Doctors', path: '/doctors' },
          { label: doctor.name }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Profile Summary Card */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Header Card */}
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-custom overflow-hidden flex-shrink-0 border border-borderColor dark:border-borderColor-dark mx-auto">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-grow space-y-4 text-center sm:text-left flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-dark rounded-full">
                  {doctor.specialization}
                </span>
                <h1 className="text-2xl font-bold text-darkText dark:text-darkText-dark mt-2.5">{doctor.name}</h1>
                <p className="text-xs text-lightText dark:text-lightText-dark mt-1 font-semibold">{doctor.qualification}</p>
                <p className="text-xs text-lightText dark:text-lightText-dark mt-1 flex items-center justify-center sm:justify-start gap-1">
                  <RiMapPinLine className="w-4 h-4 text-primary" />
                  {doctor.hospital}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2 border-t border-borderColor dark:border-borderColor-dark mt-4">
                <div className="flex items-center space-x-1">
                  <RiStarFill className="w-4.5 h-4.5 text-amber-500" />
                  <span className="text-sm font-bold text-darkText dark:text-darkText-dark">{doctor.rating}</span>
                  <span className="text-xs text-lightText dark:text-lightText-dark">({doctor.reviewsCount} Patient Reviews)</span>
                </div>
                <div className="text-xs text-lightText dark:text-lightText-dark border-l border-borderColor pl-4 flex items-center gap-1.5">
                  <RiTranslate className="w-4 h-4 text-primary" />
                  <span>{doctor.languages.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Biography Card */}
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare space-y-4">
            <h3 className="text-lg font-bold text-darkText dark:text-darkText-dark">Biography</h3>
            <p className="text-xs sm:text-sm text-lightText dark:text-lightText-dark leading-relaxed font-normal">
              {doctor.bio}
            </p>
          </div>

          {/* 3. Patient Reviews List */}
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare space-y-6">
            <div className="flex items-center justify-between border-b border-borderColor dark:border-borderColor-dark pb-4">
              <h3 className="text-lg font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
                <RiChat4Line className="w-5 h-5 text-primary" />
                Patient Reviews ({doctor.reviewsCount})
              </h3>
            </div>

            {doctor.reviews && doctor.reviews.length === 0 ? (
              <p className="text-xs text-lightText dark:text-lightText-dark py-4 text-center">No reviews submitted yet for this doctor.</p>
            ) : (
              <div className="space-y-6 divide-y divide-borderColor dark:divide-borderColor-dark">
                {doctor.reviews.map((rev, index) => (
                  <div key={rev.id} className={index > 0 ? "pt-5" : ""}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-xs text-darkText dark:text-darkText-dark">{rev.patientName}</h4>
                        <span className="text-[9px] text-lightText">{rev.date}</span>
                      </div>
                      <div className="flex items-center space-x-0.5 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-900/50">
                        <RiStarFill className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-400">{rev.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-lightText dark:text-lightText-dark mt-2.5 leading-relaxed">
                      "{rev.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Leave a review section */}
            <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-borderColor dark:border-borderColor-dark space-y-4">
              <h4 className="text-sm font-bold text-darkText dark:text-darkText-dark">Leave your Consultation Review</h4>
              
              <div className="flex items-center space-x-3">
                <span className="text-xs text-lightText dark:text-lightText-dark font-medium">Rating:</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setRating(val)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <RiStarFill className={`w-6 h-6 ${val <= rating ? 'text-amber-500' : 'text-slate-200 dark:text-slate-700'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your detailed experience with doctor's diagnostics, explanation of treatment and clinic environment..."
                  rows="3"
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded-custom transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

        </div>

        {/* Right Side: Appointment booking shortcut Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-5">
            <h3 className="text-base font-bold text-darkText dark:text-darkText-dark">Consultation Details</h3>

            <div className="space-y-3.5 border-b border-borderColor dark:border-borderColor-dark pb-4 text-xs text-lightText dark:text-lightText-dark">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><RiTimeLine className="w-4 h-4 text-primary" />Experience:</span>
                <span className="font-bold text-darkText dark:text-darkText-dark">{doctor.experience} Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><RiMoneyDollarCircleLine className="w-4 h-4 text-primary" />Doctor Fee:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{doctor.fee}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><RiShieldCheckLine className="w-4 h-4 text-primary" />Availability:</span>
                <span className="font-semibold text-emerald-600">Available</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-lightText">Working Hours</span>
              <p className="text-xs text-darkText dark:text-darkText-dark leading-relaxed">{doctor.workingHours}</p>
            </div>

            <Link
              to={`/book/${doctor.id}`}
              className="w-full block text-center font-bold px-6 py-3.5 bg-primary text-white hover:bg-primary-hover rounded-custom transition-all shadow-md shadow-primary/10"
            >
              Book Appointment
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DoctorDetails;
