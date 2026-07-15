import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import Breadcrumb from '../components/Breadcrumb';
import EmptyState from '../components/EmptyState';
import { toast } from 'react-toastify';
import { 
  RiCalendarCheckLine, 
  RiTimeLine, 
  RiFileAddLine, 
  RiDeleteBinLine, 
  RiMoneyDollarCircleLine,
  RiInformationLine
} from 'react-icons/ri';

const BookAppointment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { doctorsList, bookAppointment, uploadReport } = useApp();
  const { user } = useAuth();
  
  const doctor = doctorsList.find((doc) => doc.id === id);

  // States
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [reason, setReason] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Generate calendar dates (Next 7 days)
  useEffect(() => {
    if (!doctor) return;

    const days = [];
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dayName = weekdays[d.getDay()];
      
      // Only include if doctor has availability for this day name
      if (doctor.availability[dayName]) {
        days.push({
          dateStr: d.toISOString().split('T')[0],
          dayName: dayName,
          dateLabel: d.getDate(),
          monthLabel: d.toLocaleDateString('en-US', { month: 'short' }),
          weekdayLabel: d.toLocaleDateString('en-US', { weekday: 'short' })
        });
      }
    }

    setAvailableDays(days);
    if (days.length > 0) {
      setSelectedDate(days[0].dateStr);
    }
  }, [doctor]);

  // Update slots when date selection changes
  useEffect(() => {
    if (!doctor || !selectedDate) return;
    
    // Find weekday name for chosen date
    const d = new Date(selectedDate);
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = weekdays[d.getDay()];
    
    const slots = doctor.availability[dayName] || [];
    setAvailableSlots(slots);
    setSelectedTime(slots[0] || '');
  }, [selectedDate, doctor]);

  if (!doctor) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <EmptyState title="Doctor Profile Not Found" message="Please return to the list and select a valid doctor.">
          <Link to="/doctors" className="px-6 py-2 bg-primary text-white text-xs font-bold rounded-custom">
            Back to Doctors List
          </Link>
        </EmptyState>
      </div>
    );
  }

  // Handle mock file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const mockFile = {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1) + ' MB'
    };

    setUploadedFiles((prev) => [...prev, mockFile]);

    // Also register inside user reports context for dashboard
    if (user) {
      uploadReport({
        patientId: user.id,
        patientName: user.name,
        fileName: file.name,
        fileSize: mockFile.size,
        doctorName: doctor.name,
        category: doctor.specialization
      });
    }

    toast.success(`Mock Upload: ${file.name} uploaded successfully!`);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
    toast.info('File removed from appointment draft');
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error('Please choose a valid Date and Time Slot');
      return;
    }
    if (!reason.trim()) {
      toast.error('Please specify a brief reason for your consultation');
      return;
    }

    const patientInfo = user || {
      id: `guest-${Date.now()}`,
      name: 'Guest Patient',
      email: 'guest@example.com',
      phone: '+91 99999 88888'
    };

    const res = bookAppointment({
      doctorId: doctor.id,
      date: selectedDate,
      time: selectedTime,
      reason,
      reportsList: uploadedFiles,
      patientInfo
    });

    if (res.success) {
      navigate('/dashboard/patient/appointments');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Doctors', path: '/doctors' },
          { label: doctor.name, path: `/doctors/${doctor.id}` },
          { label: 'Book Consultation' }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Booking Form */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Doctor Quick view */}
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare flex items-center space-x-4">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-16 h-16 rounded-custom object-cover object-top border border-borderColor"
            />
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-dark rounded-full">
                {doctor.specialization}
              </span>
              <h2 className="text-lg font-bold text-darkText dark:text-darkText-dark mt-1">{doctor.name}</h2>
              <p className="text-xs text-lightText dark:text-lightText-dark">{doctor.qualification} • {doctor.hospital.split(',')[0]}</p>
            </div>
          </div>

          <form onSubmit={handleConfirmBooking} className="space-y-6">
            
            {/* Step 1: Date Calendar Picker */}
            <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
              <h3 className="text-sm font-bold text-darkText dark:text-darkText-dark flex items-center gap-1.5 uppercase tracking-wider">
                <RiCalendarCheckLine className="w-5 h-5 text-primary" />
                1. Select Consultation Date
              </h3>

              {availableDays.length === 0 ? (
                <p className="text-xs text-lightText py-4">No available working days generated this week. Check schedule details.</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-2">
                  {availableDays.map((day) => {
                    const isSelected = selectedDate === day.dateStr;
                    return (
                      <button
                        key={day.dateStr}
                        type="button"
                        onClick={() => { setSelectedDate(day.dateStr); setSelectedTime(''); }}
                        className={`p-3.5 rounded-custom border text-center transition-all ${
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark hover:bg-slate-100'
                        }`}
                      >
                        <span className="block text-[10px] font-bold uppercase tracking-wider opacity-80">{day.weekdayLabel}</span>
                        <span className="block text-xl font-bold my-1">{day.dateLabel}</span>
                        <span className="block text-[10px] font-semibold">{day.monthLabel}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 2: Time Slots */}
            <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
              <h3 className="text-sm font-bold text-darkText dark:text-darkText-dark flex items-center gap-1.5 uppercase tracking-wider">
                <RiTimeLine className="w-5 h-5 text-primary" />
                2. Choose Timing Slot
              </h3>

              {availableSlots.length === 0 ? (
                <p className="text-xs text-lightText dark:text-lightText-dark py-4 flex items-center gap-1 bg-amber-50 dark:bg-amber-950/20 p-4 border border-amber-200 dark:border-amber-900/50 rounded-custom">
                  <RiInformationLine className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  Select a consultation date above to display available appointment slots.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  {availableSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 rounded-custom border text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-primary border-primary text-white shadow-md'
                            : 'bg-slate-50 dark:bg-slate-800/40 border-borderColor dark:border-borderColor-dark text-darkText dark:text-darkText-dark hover:bg-slate-100'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 3: Medical Notes & Reports */}
            <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
              <h3 className="text-sm font-bold text-darkText dark:text-darkText-dark flex items-center gap-1.5 uppercase tracking-wider">
                <RiFileAddLine className="w-5 h-5 text-primary" />
                3. Visit Reason & Medical Documents
              </h3>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Reason for Visit *</label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Describe clinical concerns briefly (e.g. chronic chest tightness, follow-up on medication, seasonal allergies)..."
                    rows="3"
                    className="w-full bg-slate-50 dark:bg-slate-800 text-xs px-4 py-3 border border-borderColor dark:border-borderColor-dark rounded-custom outline-none focus:border-primary text-darkText dark:text-darkText-dark resize-none"
                    required
                  />
                </div>

                {/* File Upload Component */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-2">Upload Medical Records (Optional)</label>
                  <div className="border border-dashed border-borderColor dark:border-borderColor-dark rounded-custom p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors relative cursor-pointer group">
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                    />
                    <RiFileAddLine className="w-8 h-8 text-lightText mx-auto group-hover:text-primary transition-colors" />
                    <p className="text-xs font-semibold text-darkText dark:text-darkText-dark mt-2.5">Drag files or click here to upload</p>
                    <p className="text-[10px] text-lightText mt-1">Supports PDF, PNG, JPG (Max 5MB)</p>
                  </div>

                  {/* Uploaded draft files */}
                  {uploadedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-lightText">Files linked to appointment:</p>
                      {uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800 border border-borderColor dark:border-borderColor-dark rounded-custom text-xs">
                          <span className="font-semibold text-darkText dark:text-darkText-dark truncate max-w-sm">{file.name} ({file.size})</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFile(idx)}
                            className="p-1 rounded text-danger hover:bg-rose-50 dark:hover:bg-rose-950/20"
                          >
                            <RiDeleteBinLine className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit block */}
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white text-sm font-bold rounded-custom shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              Confirm Appointment Slot
            </button>

          </form>
        </div>

        {/* Right Side: Billing Breakdown Summary */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-5">
            <h3 className="text-base font-bold text-darkText dark:text-darkText-dark">Booking Invoice</h3>

            <div className="space-y-3.5 border-b border-borderColor dark:border-borderColor-dark pb-4 text-xs text-lightText">
              <div className="flex justify-between">
                <span>Doctor Consultation Fee</span>
                <span className="font-semibold text-darkText dark:text-darkText-dark">₹{doctor.fee}</span>
              </div>
              <div className="flex justify-between">
                <span>Booking Services Fee</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Administrative Charges</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-bold text-darkText dark:text-darkText-dark mt-4">
              <span className="flex items-center gap-1"><RiMoneyDollarCircleLine className="w-4 h-4 text-primary" />Total Payable Fee</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-base">₹{doctor.fee}</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 rounded-custom border border-borderColor dark:border-borderColor-dark flex items-start gap-2.5 text-[10px] text-lightText dark:text-lightText-dark leading-relaxed">
              <RiInformationLine className="w-4.5 h-4.5 text-primary flex-shrink-0 mt-0.5" />
              <span>Payments are processed directly at the clinic before consult. Cancellation is free.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookAppointment;
