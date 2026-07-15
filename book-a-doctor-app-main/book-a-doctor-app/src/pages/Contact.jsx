import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import { toast } from 'react-toastify';
import { 
  RiMailLine, 
  RiPhoneLine, 
  RiMapPinLine, 
  RiTimeLine,
  RiSendPlaneLine,
  RiCustomerServiceLine
} from 'react-icons/ri';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Consultation');
  const [message, setMessage] = useState('');
  
  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill in Name, Email and Message');
      return;
    }
    
    // Simulate inquiry submit
    toast.success('Your message has been sent to our desk! We will reply within 12 hours.');
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: 'Contact Us' }]} />

      <div className="space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h1 className="text-3xl font-bold text-darkText dark:text-darkText-dark">Get in Touch</h1>
          <p className="text-sm text-lightText dark:text-lightText-dark leading-relaxed">
            Have questions about clinical availability, medical document privacy, or refunds? Drop us a query.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Contact details card */}
            <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-6">
              <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
                <RiCustomerServiceLine className="w-5 h-5 text-primary" />
                Helpline Details
              </h3>

              <div className="space-y-5 text-xs text-lightText dark:text-lightText-dark">
                
                {/* phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-primary/10 text-primary rounded-full flex-shrink-0">
                    <RiPhoneLine className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-darkText dark:text-darkText-dark">Toll-Free Numbers</h4>
                    <p className="mt-0.5 font-medium">+91 1800-425-9999</p>
                    <p className="text-[10px]">Emergency Hotline: +91 1800-425-1111</p>
                  </div>
                </div>

                {/* email */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-primary/10 text-primary rounded-full flex-shrink-0">
                    <RiMailLine className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-darkText dark:text-darkText-dark">Email Support</h4>
                    <p className="mt-0.5 font-medium">support@bookadoctor.com</p>
                    <p className="text-[10px]">Corporate inquiries: admin@bookadoctor.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-primary/10 text-primary rounded-full flex-shrink-0">
                    <RiMapPinLine className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-darkText dark:text-darkText-dark">Main Office Location</h4>
                    <p className="mt-0.5 font-medium leading-relaxed">
                      Level 4, Cyber Towers, Hitech City Main Road, Cyberabad, Hyderabad, Telangana 500081
                    </p>
                  </div>
                </div>

                {/* working hours */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 bg-primary/10 text-primary rounded-full flex-shrink-0">
                    <RiTimeLine className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-darkText dark:text-darkText-dark">Customer Desk Hours</h4>
                    <p className="mt-0.5 font-medium">Monday - Saturday: 08:00 AM - 08:00 PM</p>
                    <p className="text-[10px]">Sundays: Emergency clinical triage support only</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Center Column: Inquiry Form */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare space-y-6">
              <h3 className="text-lg font-bold text-darkText dark:text-darkText-dark">Send a Message</h3>
              
              <form onSubmit={handleInquirySubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* name */}
                <div>
                  <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                    required
                  />
                </div>

                {/* email */}
                <div>
                  <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                    required
                  />
                </div>

                {/* phone */}
                <div>
                  <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 99999 88888"
                    className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Query Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 rounded-custom border border-borderColor dark:border-borderColor-dark outline-none focus:border-primary text-darkText dark:text-darkText-dark cursor-pointer"
                  >
                    <option value="General Consultation">General Inquiry</option>
                    <option value="Appointment Cancellation">Appointment Cancellation</option>
                    <option value="Medical Report Storage">Medical Report Storage</option>
                    <option value="Doctor Registration">Doctor Registration</option>
                    <option value="Technical Bug">Technical Bug</option>
                  </select>
                </div>

                {/* message */}
                <div className="sm:col-span-2">
                  <label className="block text-[10px] font-bold text-darkText dark:text-darkText-dark uppercase tracking-wider mb-1.5">Inquiry Details *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write details about your query here..."
                    rows="4"
                    className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 border border-borderColor dark:border-borderColor-dark rounded-custom outline-none focus:border-primary text-darkText dark:text-darkText-dark resize-none"
                    required
                  />
                </div>

                {/* submit */}
                <div className="sm:col-span-2 mt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-custom shadow-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <RiSendPlaneLine className="w-4 h-4" />
                    Submit Inquiry Desk
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

        {/* Custom SVG Google Maps Placeholder */}
        <section className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
          <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
            <RiMapPinLine className="w-5 h-5 text-primary" />
            Clinic Headquarters Map Locator
          </h3>

          <div className="w-full h-80 rounded-custom bg-slate-100 dark:bg-slate-800 border border-borderColor dark:border-borderColor-dark overflow-hidden flex items-center justify-center relative">
            
            {/* SVG Grid representation of city map */}
            <svg className="absolute inset-0 w-full h-full opacity-35 dark:opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              <path d="M 0 100 Q 150 120 300 240 T 600 350" fill="none" stroke="#2563EB" strokeWidth="12" opacity="0.3" />
              <path d="M 200 0 Q 300 200 450 300 T 800 400" fill="none" stroke="#14B8A6" strokeWidth="8" opacity="0.2" />
            </svg>

            {/* Locator pin */}
            <div className="relative z-10 text-center space-y-3.5 max-w-sm p-6 glassmorphism rounded-custom border shadow-lg animate-bounce">
              <RiMapPinLine className="w-10 h-10 text-danger mx-auto fill-danger" />
              <div>
                <h4 className="font-bold text-xs text-darkText dark:text-darkText-dark">Cyber Towers, Hyderabad</h4>
                <p className="text-[10px] text-lightText dark:text-lightText-dark mt-1">Level 4, Sector 1, Cyberabad</p>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 bg-slate-900/80 text-white text-[10px] px-3 py-1.5 rounded-full font-semibold">
              Interactive Google Maps simulated visualizer
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;
