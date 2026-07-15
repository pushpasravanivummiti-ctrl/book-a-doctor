import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  RiHeartPulseLine, 
  RiBrainLine, 
  RiSunLine, 
  RiBodyScanLine, 
  RiUserHeartLine, 
  RiShieldCheckLine, 
  RiHeartAddLine, 
  RiMentalHealthLine, 
  RiStethoscopeLine,
  RiSearchLine,
  RiCalendarCheckLine,
  RiFolderShield2Line,
  RiCustomerService2Line,
  RiArrowRightLine,
  RiStarFill,
  RiBellLine
} from 'react-icons/ri';
import { specializations, doctors, testimonials, faqs } from '../data/mockData';
import SearchBar from '../components/SearchBar';

// Icon Map helper to load React Icons from string names in mockData
const iconMap = {
  RiHeartPulseLine: RiHeartPulseLine,
  RiBrainLine: RiBrainLine,
  RiSunLine: RiSunLine,
  RiBodyScanLine: RiBodyScanLine,
  RiUserHeartLine: RiUserHeartLine,
  RiShieldCheckLine: RiShieldCheckLine,
  RiHeartAddLine: RiHeartAddLine,
  RiMentalHealthLine: RiMentalHealthLine,
  RiStethoscopeLine: RiStethoscopeLine
};


// Simple Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const end = numericValue;
    if (start === end) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
    if (incrementTime < 10) incrementTime = 10; // Cap to avoid CPU overload

    const timer = setInterval(() => {
      start += Math.ceil(end / 100); // Step up by 1%
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [numericValue, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const featured = doctors.filter((doc) => doc.rating >= 4.8).slice(0, 3);

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-transparent to-transparent dark:from-slate-900/40 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-dark rounded-full text-xs font-semibold tracking-wide">
                🏥 Premium Healthcare Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-darkText dark:text-darkText-dark leading-[1.1]">
                Book Trusted Doctors <br />
                <span className="text-gradient-premium">Anytime, Anywhere</span>
              </h1>
              <p className="text-base sm:text-lg text-lightText dark:text-lightText-dark max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Find experienced doctors, schedule appointments instantly, upload medical reports securely, and receive appointment reminders.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/doctors"
                  className="w-full sm:w-auto text-center font-semibold px-8 py-4 bg-primary text-white hover:bg-primary-hover rounded-custom transition-all shadow-lg hover:shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Book Appointment
                  <RiArrowRightLine className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
                <Link
                  to="/doctors"
                  className="w-full sm:w-auto text-center font-semibold px-8 py-4 border border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark hover:bg-slate-50 dark:hover:bg-slate-800 rounded-custom transition-colors"
                >
                  Explore Doctors
                </Link>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px] rounded-full bg-gradient-premium absolute -z-10 opacity-10 dark:opacity-20 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80"
                alt="Doctor Consultation"
                className="w-full max-w-md sm:max-w-lg object-cover rounded-custom shadow-2xl border border-borderColor dark:border-borderColor-dark rotate-1 hover:rotate-0 transition-transform duration-500"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Search Bar Widget overlay */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-30">
        <SearchBar placeholder="Search by name, specialization, or clinics..." />
      </section>

      {/* 2. Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card dark:bg-card-dark rounded-custom shadow-healthcare border border-borderColor dark:border-borderColor-dark p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center divide-y md:divide-y-0 md:divide-x divide-borderColor dark:divide-borderColor-dark">
            <div className="space-y-1.5 py-4 md:py-0">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value="1000+" />
              </h2>
              <p className="text-xs text-lightText dark:text-lightText-dark uppercase tracking-wider font-semibold">Registered Doctors</p>
            </div>
            <div className="space-y-1.5 py-4 md:py-0">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value="50000+" />
              </h2>
              <p className="text-xs text-lightText dark:text-lightText-dark uppercase tracking-wider font-semibold">Happy Patients</p>
            </div>
            <div className="space-y-1.5 py-4 md:py-0">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value="150000+" />
              </h2>
              <p className="text-xs text-lightText dark:text-lightText-dark uppercase tracking-wider font-semibold">Appointments Completed</p>
            </div>
            <div className="space-y-1.5 py-4 md:py-0">
              <h2 className="text-3xl md:text-4xl font-bold text-primary">
                <AnimatedCounter value="98%" />
              </h2>
              <p className="text-xs text-lightText dark:text-lightText-dark uppercase tracking-wider font-semibold">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Specialization Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-darkText dark:text-darkText-dark">Find Doctors by Specialization</h2>
          <p className="text-sm text-lightText dark:text-lightText-dark leading-relaxed">
            Get instant consults for any query. Select a specialty to view experienced board-certified doctors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializations.map((spec) => {
            const SpecIcon = iconMap[spec.icon] || RiStethoscopeLine;
            return (
              <Link
                key={spec.id}
                to={`/doctors?specialization=${encodeURIComponent(spec.name)}`}
                className="group p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare hover:shadow-healthcare-hover transition-all flex items-start space-x-4 hover:-translate-y-1"
              >
                <div className="p-3 bg-primary/10 group-hover:bg-primary text-primary group-hover:text-white rounded-custom transition-colors flex-shrink-0">
                  <SpecIcon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-darkText dark:text-darkText-dark group-hover:text-primary transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-xs text-lightText dark:text-lightText-dark mt-1 leading-relaxed">
                    {spec.desc}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-primary dark:text-primary-dark mt-3">
                    {spec.count} Doctors Available →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. Featured Doctors */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-4 text-center sm:text-left">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-darkText dark:text-darkText-dark">Meet Our Featured Doctors</h2>
            <p className="text-sm text-lightText dark:text-lightText-dark">
              High-rated professionals dedicated to your heart, skin, and family health.
            </p>
          </div>
          <Link
            to="/doctors"
            className="text-sm font-semibold text-primary dark:text-primary-dark hover:underline flex items-center gap-1 flex-shrink-0"
          >
            Explore All Doctors <RiArrowRightLine className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((doc) => (
            <div
              key={doc.id}
              className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom overflow-hidden shadow-healthcare hover:shadow-healthcare-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 bg-primary text-white rounded-full">
                    {doc.specialization}
                  </span>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-darkText dark:text-darkText-dark">{doc.name}</h3>
                    <div className="flex items-center space-x-0.5 text-amber-500">
                      <RiStarFill className="w-4 h-4" />
                      <span className="text-xs font-bold text-darkText dark:text-darkText-dark">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-xs text-lightText dark:text-lightText-dark">{doc.qualification}</p>
                  <p className="text-xs text-lightText dark:text-lightText-dark font-medium">{doc.hospital}</p>
                  <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed line-clamp-2">
                    {doc.bio}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-borderColor dark:border-borderColor-dark mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-lightText block">Consultation Fee</span>
                  <span className="text-sm font-bold text-emerald-600">₹{doc.fee}</span>
                </div>
                <Link
                  to={`/book/${doc.id}`}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-custom hover:bg-primary-hover transition-colors shadow-sm"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Services Section */}
      <section className="bg-slate-50 dark:bg-slate-900/30 py-20 border-y border-borderColor dark:border-borderColor-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-darkText dark:text-darkText-dark">Our Healthcare Services</h2>
            <p className="text-sm text-lightText dark:text-lightText-dark">
              We provide comprehensive medical assistance with digital security and ease.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare space-y-4">
              <div className="w-12 h-12 rounded-custom bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <RiCalendarCheckLine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Easy Appointment Booking</h3>
              <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed">
                Check real-time slot availability for morning, afternoon, or evening and book instantly with a single click.
              </p>
            </div>

            <div className="p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare space-y-4">
              <div className="w-12 h-12 rounded-custom bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <RiFolderShield2Line className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Medical Records Vault</h3>
              <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed">
                Securely upload and share your health documents, prescriptions, and ECG logs directly with your consulting doctors.
              </p>
            </div>

            <div className="p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare space-y-4">
              <div className="w-12 h-12 rounded-custom bg-teal-500/10 text-teal-500 flex items-center justify-center">
                <RiHeartPulseLine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Online Consultation</h3>
              <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed">
                Connect with specialists for video, audio, or text chat consults from the safety and comfort of your home.
              </p>
            </div>

            <div className="p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare space-y-4">
              <div className="w-12 h-12 rounded-custom bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <RiBellLine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Appointment Reminders</h3>
              <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed">
                Get push, email, and dashboard notifications for upcoming doctor appointments and report updates.
              </p>
            </div>

            <div className="p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare space-y-4">
              <div className="w-12 h-12 rounded-custom bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <RiShieldCheckLine className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Secure Payments</h3>
              <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed">
                Integrated encrypted portals for digital invoicing. Pay only for the doctors fee with zero administrative charges.
              </p>
            </div>

            <div className="p-6 bg-card dark:bg-card-dark rounded-custom border border-borderColor dark:border-borderColor-dark shadow-healthcare space-y-4">
              <div className="w-12 h-12 rounded-custom bg-purple-500/10 text-purple-500 flex items-center justify-center">
                <RiCustomerService2Line className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">24x7 Customer Support</h3>
              <p className="text-xs text-lightText dark:text-lightText-dark leading-relaxed">
                Our support team and virtual AI chatbot are available round the clock to resolve booking and report issues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-darkText dark:text-darkText-dark">How Book a Doctor Works</h2>
          <p className="text-sm text-lightText dark:text-lightText-dark">
            Complete your slot booking in four quick steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          <div className="text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto shadow-md">1</div>
            <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Search Doctor</h3>
            <p className="text-xs text-lightText dark:text-lightText-dark max-w-[200px] mx-auto leading-relaxed">
              Find specialists by typing name, clinical concern, or filter by fee and rating.
            </p>
          </div>

          <div className="text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto shadow-md">2</div>
            <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Choose Slot</h3>
            <p className="text-xs text-lightText dark:text-lightText-dark max-w-[200px] mx-auto leading-relaxed">
              Select an available day on the doctor calendar and pick your morning/afternoon timing.
            </p>
          </div>

          <div className="text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto shadow-md">3</div>
            <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Book & Upload</h3>
            <p className="text-xs text-lightText dark:text-lightText-dark max-w-[200px] mx-auto leading-relaxed">
              Provide booking details, attach files/medical reports, and confirm.
            </p>
          </div>

          <div className="text-center space-y-4 relative">
            <div className="w-16 h-16 rounded-full bg-primary text-white text-xl font-bold flex items-center justify-center mx-auto shadow-md">4</div>
            <h3 className="font-bold text-base text-darkText dark:text-darkText-dark">Visit Doctor</h3>
            <p className="text-xs text-lightText dark:text-lightText-dark max-w-[200px] mx-auto leading-relaxed">
              Arrive at the designated hospital clinic or join the virtual consult session on time.
            </p>
          </div>

        </div>
      </section>

      {/* 7. Testimonials Section */}
      <section className="bg-slate-900 text-slate-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-3xl font-bold text-white">What Our Patients Say</h2>
            <p className="text-sm text-slate-400">
              Read reviews from thousands of satisfied patient consultations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="bg-slate-800 border border-slate-700/60 p-6 rounded-custom flex flex-col justify-between space-y-6"
              >
                <p className="text-xs text-slate-300 italic leading-relaxed">
                  "{t.comment}"
                </p>
                <div className="flex items-center space-x-3.5 border-t border-slate-700/60 pt-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-white">{t.name}</h4>
                    <span className="text-[10px] text-primary uppercase font-bold">{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQs Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-3xl font-bold text-darkText dark:text-darkText-dark font-poppins">Frequently Asked Questions</h2>
          <p className="text-sm text-lightText dark:text-lightText-dark">
            Find answers to commonly asked questions about booking consultations.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={faq.id}
                className="border border-borderColor dark:border-borderColor-dark bg-card dark:bg-card-dark rounded-custom overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-6 py-5 font-semibold text-sm md:text-base text-darkText dark:text-darkText-dark flex items-center justify-between focus:outline-none"
                >
                  <span>{faq.question}</span>
                  <span className="text-xl text-primary">{isOpen ? '−' : '+'}</span>
                </button>
                
                {isOpen && (
                  <div className="px-6 pb-5 text-xs md:text-sm text-lightText dark:text-lightText-dark leading-relaxed border-t border-borderColor dark:border-borderColor-dark pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Home;
