import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import { RiUser3Line, RiShieldLine } from 'react-icons/ri';

const PatientProfile = () => {
  const { user, updateProfile } = useAuth();
  
  // Local form states
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [dob, setDob] = useState(user?.dob || '');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [address, setAddress] = useState(user?.address || '');
  const [medicalHistory, setMedicalHistory] = useState(user?.medicalHistory || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.error('Name cannot be empty');
      return;
    }

    const res = updateProfile({
      name,
      phone,
      dob,
      gender,
      address,
      medicalHistory
    });

    if (res.success) {
      toast.success('Health card profile updated successfully!');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Profile Card Info */}
      <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare flex items-center space-x-4">
        <img
          src={user?.avatar}
          alt={user?.name}
          className="w-16 h-16 rounded-full border border-primary object-cover"
        />
        <div>
          <h2 className="text-lg font-bold text-darkText dark:text-darkText-dark">{user?.name}</h2>
          <p className="text-xs text-lightText dark:text-lightText-dark capitalize">{user?.role} Session Card</p>
          <span className="text-[10px] text-lightText dark:text-lightText-dark block mt-0.5">ID: {user?.id}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Profile details Form */}
        <div className="lg:col-span-8 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
          <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2 border-b border-borderColor pb-4 mb-6">
            <RiUser3Line className="w-5 h-5 text-primary" />
            Demographics & Details
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                  required
                />
              </div>

              {/* Email (Readonly in mock) */}
              <div>
                <label className="block text-[10px] font-bold text-lightText uppercase tracking-wider mb-1.5">Email Address (Readonly)</label>
                <input
                  type="email"
                  value={user?.email}
                  disabled
                  className="w-full bg-slate-100 dark:bg-slate-800/60 text-xs px-4 py-3 border border-borderColor dark:border-borderColor-dark rounded-custom outline-none text-lightText cursor-not-allowed"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                />
              </div>

              {/* DOB */}
              <div>
                <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark cursor-pointer"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Address */}
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Home Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                />
              </div>

            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-custom transition-colors"
            >
              Update Demographics
            </button>
          </form>
        </div>

        {/* Medical History section */}
        <div className="lg:col-span-4 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
          <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2 border-b border-borderColor pb-4 mb-6">
            <RiShieldLine className="w-5 h-5 text-primary" />
            Clinical Health Card
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Chronic Medical History</label>
              <textarea
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="List clinical records, chronic allergies (e.g. penicillin, dust), prior surgeries, or general blood type..."
                rows="6"
                className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 border border-borderColor dark:border-borderColor-dark rounded-custom outline-none focus:border-primary text-darkText dark:text-darkText-dark resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-secondary hover:bg-secondary-hover text-white text-xs font-bold rounded-custom transition-colors"
            >
              Save Medical Card
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};

export default PatientProfile;
