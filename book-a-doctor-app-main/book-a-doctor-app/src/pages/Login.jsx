import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { RiMailLine, RiLockLine, RiGoogleFill, RiFacebookCircleFill } from 'react-icons/ri';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('patient'); // default role login
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all credentials');
      return;
    }

    const res = login(email, password, role);
    if (res.success) {
      toast.success(`Welcome back, ${res.user.name}!`);
      
      // Redirect based on role if no specific redirect is set
      if (redirect === '/') {
        if (role === 'patient') navigate('/dashboard/patient');
        else if (role === 'doctor') navigate('/dashboard/doctor');
        else if (role === 'admin') navigate('/dashboard/admin');
      } else {
        navigate(redirect);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-slate-50 dark:bg-slate-900/30">
      {/* Dynamic background shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-accent/10 blur-3xl -z-10"></div>

      {/* Glassmorphism Card Wrapper */}
      <div className="max-w-4xl w-full bg-card/85 dark:bg-card-dark/80 backdrop-blur-md rounded-custom shadow-2xl border border-borderColor dark:border-borderColor-dark overflow-hidden flex flex-col md:flex-row min-h-[550px] z-10">
        
        {/* Left Side Illustration */}
        <div className="md:w-1/2 bg-gradient-premium p-10 flex flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          
          <div className="relative z-10 space-y-2">
            <h3 className="font-bold text-2xl">Book a Doctor</h3>
            <p className="text-[10px] text-teal-100 uppercase tracking-widest font-semibold">Healthcare Made Simple</p>
          </div>

          <div className="relative z-10 space-y-4 my-8">
            <h2 className="text-3xl font-bold tracking-tight leading-snug">
              Welcome back to <br />your health portal
            </h2>
            <p className="text-xs text-slate-100/90 leading-relaxed font-normal">
              Sign in to manage upcoming consultations, access records, review doctor availability, and download clinical prescriptions instantly.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/20 text-xs text-teal-100/80">
            Forgot password? Contact support helpline.
          </div>
        </div>

        {/* Right Side Form */}
        <div className="md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-darkText dark:text-darkText-dark">Welcome Back</h2>
            <p className="text-xs text-lightText dark:text-lightText-dark mt-1">Please enter your credentials to login</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selection dropdown */}
            <div>
              <label className="block text-xs font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-2">Login As</label>
              <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-custom">
                {['Patient', 'Doctor', 'Admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setRole(r.toLowerCase());
                      setEmail(r === 'Patient' ? 'pranathi@example.com' : r === 'Doctor' ? 'sarah@example.com' : 'admin@example.com');
                    }}
                    className={`py-1.5 rounded-custom text-xs font-semibold transition-all ${
                      role === r.toLowerCase()
                        ? 'bg-primary text-white shadow-sm'
                        : 'text-lightText hover:text-darkText dark:hover:text-darkText-dark'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-2">Email Address</label>
              <div className="relative">
                <RiMailLine className="absolute left-4 top-3.5 text-lightText w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-slate-100/60 dark:bg-slate-800/40 text-xs px-11 py-3.5 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <RiLockLine className="absolute left-4 top-3.5 text-lightText w-5 h-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-100/60 dark:bg-slate-800/40 text-xs px-11 py-3.5 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                  required
                />
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-lightText dark:text-lightText-dark cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); toast.info("Check console for mock login credentials."); }} className="text-primary hover:underline font-semibold">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-custom transition-colors shadow-lg shadow-primary/10"
            >
              Sign In
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6">
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-borderColor dark:border-borderColor-dark w-full"></div>
              <span className="absolute bg-card dark:bg-card-dark px-3 text-[10px] text-lightText font-semibold uppercase tracking-wider">
                Or Continue With
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { login('google@gmail.com', '123', role); toast.success('Google Login simulated'); navigate('/dashboard/patient'); }}
                className="flex items-center justify-center space-x-2 py-2.5 border border-borderColor dark:border-borderColor-dark rounded-custom hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-darkText dark:text-darkText-dark font-medium transition-colors"
              >
                <RiGoogleFill className="w-4 h-4 text-red-500" />
                <span>Google</span>
              </button>
              <button
                onClick={() => { login('facebook@facebook.com', '123', role); toast.success('Facebook Login simulated'); navigate('/dashboard/patient'); }}
                className="flex items-center justify-center space-x-2 py-2.5 border border-borderColor dark:border-borderColor-dark rounded-custom hover:bg-slate-50 dark:hover:bg-slate-800 text-xs text-darkText dark:text-darkText-dark font-medium transition-colors"
              >
                <RiFacebookCircleFill className="w-4 h-4 text-blue-600" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-xs text-lightText dark:text-lightText-dark">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary hover:underline font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
