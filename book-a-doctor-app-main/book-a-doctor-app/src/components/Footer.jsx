import React from 'react';
import { Link } from 'react-router-dom';
import { RiTwitterFill, RiFacebookCircleFill, RiLinkedinBoxFill, RiInstagramFill, RiHeartLine } from 'react-icons/ri';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-9 h-9 rounded-custom bg-gradient-premium flex items-center justify-center text-white font-bold text-lg">
                <span>+</span>
              </div>
              <span className="font-bold text-lg text-white tracking-tight">Book a Doctor</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Find and schedule slots with qualified medical professionals near you. Review experience, fees, and consult instantly.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full hover:text-white transition-colors">
                <RiTwitterFill className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full hover:text-white transition-colors">
                <RiFacebookCircleFill className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full hover:text-white transition-colors">
                <RiLinkedinBoxFill className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-800 hover:bg-primary rounded-full hover:text-white transition-colors">
                <RiInstagramFill className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/doctors" className="hover:text-white transition-colors">Search Doctors</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Sign In Portal</Link>
              </li>
            </ul>
          </div>

          {/* Specializations shortcut */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Specialists</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <Link to="/doctors?specialization=Cardiology" className="hover:text-white transition-colors">Cardiologists</Link>
              </li>
              <li>
                <Link to="/doctors?specialization=Dermatology" className="hover:text-white transition-colors">Dermatologists</Link>
              </li>
              <li>
                <Link to="/doctors?specialization=General Physician" className="hover:text-white transition-colors">General Physicians</Link>
              </li>
              <li>
                <Link to="/doctors?specialization=Pediatrics" className="hover:text-white transition-colors">Pediatricians</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-bold text-sm text-white mb-4">Contact Info</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="leading-relaxed">
                <span className="font-semibold text-slate-300">Helpline:</span> +91 1800-425-9999 (Toll Free)
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-slate-300">Email:</span> support@bookadoctor.com
              </li>
              <li className="leading-relaxed">
                <span className="font-semibold text-slate-300">Address:</span> Hitech City Main Road, Cyberabad, Hyderabad, Telangana 500081
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© {new Date().getFullYear()} Book a Doctor. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <RiHeartLine className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for healthcare convenience.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
