import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import DoctorCard from '../components/DoctorCard';
import Breadcrumb from '../components/Breadcrumb';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import EmptyState from '../components/EmptyState';
import { DoctorCardSkeleton } from '../components/Skeleton';
import { RiFilterLine, RiCloseLine, RiRefreshLine } from 'react-icons/ri';

const Doctors = () => {
  const { doctorsList } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // States
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedSpec, setSelectedSpec] = useState(searchParams.get('specialization') || 'All');
  const [selectedHospital, setSelectedHospital] = useState('All');
  const [minExperience, setMinExperience] = useState(0);
  const [minRating, setMinRating] = useState(0);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const doctorsPerPage = 5;

  // Sync with URL params
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const spec = searchParams.get('specialization') || 'All';
    setSearchQuery(search);
    setSelectedSpec(spec);
    setCurrentPage(1);
  }, [searchParams]);

  // Handle Search submit
  const handleSearchSubmit = (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // Update Search Params
    const newParams = {};
    if (query) newParams.search = query;
    if (selectedSpec && selectedSpec !== 'All') newParams.specialization = selectedSpec;
    setSearchParams(newParams);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 400);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedSpec('All');
    setSelectedHospital('All');
    setMinExperience(0);
    setMinRating(0);
    setSearchParams({});
  };

  // Extract unique filter categories
  const specializationsList = ['All', ...new Set(doctorsList.map((d) => d.specialization))];
  const hospitalsList = ['All', ...new Set(doctorsList.map((d) => d.hospital.split(',')[0]))];

  // Filtering Logic
  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSearch = searchQuery
      ? doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesSpec = selectedSpec === 'All' ? true : doc.specialization === selectedSpec;

    const matchesHospital =
      selectedHospital === 'All' ? true : doc.hospital.startsWith(selectedHospital);

    const matchesExperience = doc.experience >= minExperience;
    
    const matchesRating = doc.rating >= minRating;

    return matchesSearch && matchesSpec && matchesHospital && matchesExperience && matchesRating;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);
  const indexOfLastDoc = currentPage * doctorsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoc, indexOfLastDoc);

  const handlePageChange = (pageNumber) => {
    setIsLoading(true);
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Doctors Index' }]} />

      <div className="space-y-8">
        
        {/* Header Search */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-darkText dark:text-darkText-dark">Find Doctors</h1>
          <p className="text-xs text-lightText dark:text-lightText-dark max-w-xl">
            Book slots with doctors verified under medical standards. Upload files and review fees upfront.
          </p>
          <SearchBar onSearch={handleSearchSubmit} initialQuery={searchQuery} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          
          {/* 1. Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare flex-shrink-0">
            <div className="flex items-center justify-between border-b border-borderColor dark:border-borderColor-dark pb-4 mb-6">
              <span className="font-bold text-sm text-darkText dark:text-darkText-dark flex items-center gap-1.5">
                <RiFilterLine className="w-4 h-4 text-primary" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[10px] font-bold text-primary dark:text-primary-dark hover:underline flex items-center gap-0.5"
              >
                <RiRefreshLine className="w-3.5 h-3.5" />
                Reset
              </button>
            </div>

            <div className="space-y-6">
              {/* Specialization Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">Specialization</label>
                <select
                  value={selectedSpec}
                  onChange={(e) => {
                    setSelectedSpec(e.target.value);
                    const newParams = {};
                    if (searchQuery) newParams.search = searchQuery;
                    if (e.target.value !== 'All') newParams.specialization = e.target.value;
                    setSearchParams(newParams);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-3.5 py-2.5 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none text-darkText dark:text-darkText-dark cursor-pointer"
                >
                  {specializationsList.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">Hospital Center</label>
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-3.5 py-2.5 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none text-darkText dark:text-darkText-dark cursor-pointer"
                >
                  {hospitalsList.map((hosp) => (
                    <option key={hosp} value={hosp}>
                      {hosp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">
                  Min Experience ({minExperience} Years)
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="w-full accent-primary h-2 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer mt-2"
                />
                <div className="flex justify-between text-[10px] text-lightText mt-1">
                  <span>0 Yr</span>
                  <span>10 Yrs</span>
                  <span>20 Yrs</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">
                  Minimum Rating ({minRating === 0 ? 'Any' : `${minRating} ★ & above`})
                </label>
                <div className="flex gap-2.5 mt-2">
                  {[0, 4.5, 4.7, 4.9].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMinRating(val)}
                      className={`flex-grow py-2 rounded-custom text-xs font-semibold border transition-all ${
                        minRating === val
                          ? 'bg-primary border-primary text-white shadow-sm'
                          : 'bg-slate-50 border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark hover:bg-slate-100'
                      }`}
                    >
                      {val === 0 ? 'Any' : `${val}★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Mobile Filter Button Drawer trigger */}
          <div className="flex lg:hidden items-center justify-between w-full border border-borderColor dark:border-borderColor-dark bg-card dark:bg-card-dark rounded-custom p-4 shadow-sm">
            <span className="text-xs font-semibold text-lightText dark:text-lightText-dark">
              Found {filteredDoctors.length} verified doctors
            </span>
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-custom text-xs font-bold"
            >
              <RiFilterLine className="w-4 h-4" />
              Adjust Filters
            </button>
          </div>

          {/* 2. Doctor Cards List */}
          <div className="flex-grow w-full space-y-6">
            
            {/* List metadata */}
            <div className="hidden lg:flex items-center justify-between">
              <span className="text-xs font-semibold text-lightText dark:text-lightText-dark">
                Showing {indexOfFirstDoc + 1} - {Math.min(indexOfLastDoc, filteredDoctors.length)} of {filteredDoctors.length} doctors
              </span>
            </div>

            {/* Render List */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((s) => (
                  <DoctorCardSkeleton key={s} />
                ))}
              </div>
            ) : currentDoctors.length === 0 ? (
              <EmptyState
                title="No Vetted Doctors Found"
                message="We couldn't find any doctor matching your active combination of query and filters. Try resetting to defaults."
              >
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-primary text-white text-xs font-bold rounded-custom hover:bg-primary-hover transition-colors"
                >
                  Clear All Filters
                </button>
              </EmptyState>
            ) : (
              <div className="space-y-5">
                {currentDoctors.map((doc) => (
                  <DoctorCard key={doc.id} doctor={doc} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!isLoading && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>

        </div>

      </div>

      {/* Mobile filter slide-over drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            onClick={() => setMobileFilterOpen(false)}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
          />

          {/* Drawer container */}
          <div className="relative w-80 max-w-xs bg-card dark:bg-card-dark h-full flex flex-col p-6 shadow-2xl overflow-y-auto border-l border-borderColor dark:border-borderColor-dark z-10">
            <div className="flex items-center justify-between border-b border-borderColor dark:border-borderColor-dark pb-4 mb-6">
              <span className="font-bold text-sm text-darkText dark:text-darkText-dark">Adjust Filters</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-lightText hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <RiCloseLine className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 flex-grow">
              {/* Specialization Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">Specialization</label>
                <select
                  value={selectedSpec}
                  onChange={(e) => {
                    setSelectedSpec(e.target.value);
                    const newParams = {};
                    if (searchQuery) newParams.search = searchQuery;
                    if (e.target.value !== 'All') newParams.specialization = e.target.value;
                    setSearchParams(newParams);
                  }}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-3.5 py-2.5 border border-borderColor rounded-custom outline-none text-darkText dark:text-darkText-dark"
                >
                  {specializationsList.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              {/* Hospital Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">Hospital</label>
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-3.5 py-2.5 border border-borderColor rounded-custom outline-none text-darkText dark:text-darkText-dark"
                >
                  {hospitalsList.map((hosp) => (
                    <option key={hosp} value={hosp}>
                      {hosp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Experience Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">
                  Experience ({minExperience}+ Yrs)
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={minExperience}
                  onChange={(e) => setMinExperience(Number(e.target.value))}
                  className="w-full accent-primary mt-2"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText dark:text-lightText-dark mb-2">Min Rating</label>
                <div className="flex gap-2 mt-2">
                  {[0, 4.5, 4.7, 4.9].map((val) => (
                    <button
                      key={val}
                      onClick={() => setMinRating(val)}
                      className={`flex-grow py-2 rounded-custom text-xs font-semibold border transition-all ${
                        minRating === val
                          ? 'bg-primary border-primary text-white'
                          : 'bg-slate-50 border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark'
                      }`}
                    >
                      {val === 0 ? 'Any' : `${val}★`}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-borderColor dark:border-borderColor-dark mt-6 flex gap-2">
              <button
                onClick={() => {
                  handleResetFilters();
                  setMobileFilterOpen(false);
                }}
                className="w-1/2 py-3 border border-borderColor dark:border-borderColor-dark text-xs font-semibold rounded-custom text-darkText dark:text-darkText-dark"
              >
                Reset All
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-1/2 py-3 bg-primary text-white text-xs font-semibold rounded-custom"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Doctors;
