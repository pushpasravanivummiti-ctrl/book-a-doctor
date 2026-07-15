import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSearchLine, RiMapPin2Line, RiCloseLine } from 'react-icons/ri';
import { doctors, specializations } from '../data/mockData';

const SearchBar = ({ onSearch, initialQuery = '', placeholder = 'Search doctors, specializations, clinics...' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [location, setLocation] = useState('All Cities');
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  // Handle outside clicks to close suggestion box
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions list
  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length === 0) {
      setSuggestions([]);
      return;
    }

    const filteredDocs = doctors
      .filter((d) => d.name.toLowerCase().includes(val.toLowerCase()))
      .map((d) => ({ type: 'doctor', id: d.id, name: d.name, spec: d.specialization }));

    const filteredSpecs = specializations
      .filter((s) => s.name.toLowerCase().includes(val.toLowerCase()))
      .map((s) => ({ type: 'specialization', id: s.id, name: s.name }));

    setSuggestions([...filteredSpecs, ...filteredDocs].slice(0, 6));
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (item) => {
    setShowSuggestions(false);
    if (item.type === 'doctor') {
      navigate(`/doctors/${item.id}`);
    } else {
      navigate(`/doctors?specialization=${item.name}`);
      if (onSearch) onSearch(item.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuggestions(false);
    if (onSearch) {
      onSearch(query);
    } else {
      navigate(`/doctors?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    if (onSearch) onSearch('');
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto z-20">
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-stretch bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare overflow-hidden p-1.5 gap-2 md:gap-0">
        
        {/* City Filter */}
        <div className="flex items-center px-4 py-2 bg-slate-50 dark:bg-slate-800/40 rounded-custom md:rounded-r-none md:border-r border-borderColor dark:border-borderColor-dark flex-shrink-0">
          <RiMapPin2Line className="w-5 h-5 text-primary mr-2" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-transparent font-medium text-sm text-darkText dark:text-darkText-dark outline-none cursor-pointer pr-4"
          >
            <option value="All Cities">All Cities</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
          </select>
        </div>

        {/* Input area */}
        <div className="flex-grow flex items-center px-4 py-2 relative">
          <RiSearchLine className="w-5 h-5 text-lightText mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim().length > 0 && setShowSuggestions(true)}
            placeholder={placeholder}
            className="w-full bg-transparent text-sm text-darkText dark:text-darkText-dark outline-none font-medium placeholder-lightText"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 rounded-full text-lightText hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1"
            >
              <RiCloseLine className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Action Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-custom md:rounded-l-none transition-colors"
        >
          Search
        </button>
      </form>

      {/* Suggestion Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom shadow-2xl overflow-hidden z-30 divide-y divide-borderColor dark:divide-borderColor-dark">
          {suggestions.map((item, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(item)}
              className="px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer flex items-center justify-between text-sm transition-colors"
            >
              <div className="flex items-center">
                <RiSearchLine className="w-4 h-4 text-lightText mr-3" />
                <span className="font-semibold text-darkText dark:text-darkText-dark">{item.name}</span>
                {item.type === 'doctor' && (
                  <span className="text-xs text-lightText dark:text-lightText-dark ml-2">({item.spec})</span>
                )}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-lightText">
                {item.type}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
