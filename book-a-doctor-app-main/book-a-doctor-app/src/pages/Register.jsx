import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      toast.warning('You must agree to the Terms of Service');
      return;
    }

    const res = register({ fullName, email, phone, dob, gender, address });
    if (res.success) {
      toast.success('Registration successful! Welcome aboard.');
      navigate('/dashboard/patient');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row bg-slate-50 dark:bg-slate-900/30">
      
      {/* Left side banner */}
      <div className="md:w-5/12 bg-gradient-premium p-10 md:p-16 flex flex-col justify-between text-white relative">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-custom bg-white/20 flex items-center justify-center font-bold">
              <span>+</span>
            </div>
            <span className="font-bold text-base">Book a Doctor</span>
          </Link>
        </div>

        <div className="relative z-10 space-y-4 my-12">
          <h2 className="text-3xl font-bold leading-tight">Create your Patient Account</h2>
          <p className="text-xs text-teal-100/90 leading-relaxed font-normal">
            Gain access to hundreds of vetted medical specialists, review details, book consultation slots, upload reports, and check health timelines securely.
          </p>
        </div>

        <div className="relative z-10 text-[10px] text-teal-100/70">
          © {new Date().getFullYear()} Book a Doctor. All data is securely encrypted.
        </div>
      </div>

      {/* Right side form */}
      <div className="md:w-7/12 p-8 sm:p-12 md:p-16 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-xl space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-darkText dark:text-darkText-dark">Join Book a Doctor</h2>
            <p className="text-xs text-lightText dark:text-lightText-dark mt-1">Get started with your free digital health card</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Full Name *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Email Address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Mailing Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Apartment, Street, City"
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Password *</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                required
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Confirm Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-card dark:bg-card-dark text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                required
              />
            </div>

            {/* Terms checkbox */}
            <div className="sm:col-span-2 mt-2">
              <label className="flex items-start space-x-2.5 text-xs text-lightText dark:text-lightText-dark cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary mt-0.5"
                />
                <span>I agree to the Book a Doctor Terms of Service, Privacy Policy and HIPAA disclosures.</span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="sm:col-span-2 mt-4">
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-custom transition-colors shadow-lg"
              >
                Create Free Account
              </button>
            </div>

          </form>

          <div className="text-center mt-6">
            <p className="text-xs text-lightText dark:text-lightText-dark">
              Already have a health account?{' '}
              <Link to="/login" className="text-primary hover:underline font-bold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;
