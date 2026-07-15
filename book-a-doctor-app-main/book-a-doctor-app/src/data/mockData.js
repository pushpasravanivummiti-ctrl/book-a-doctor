export const specializations = [
  { id: 'cardiology', name: 'Cardiology', icon: 'RiHeartPulseLine', desc: 'Heart disease, chest pain, and heart attacks', count: 12 },
  { id: 'neurology', name: 'Neurology', icon: 'RiBrainLine', desc: 'Brain, spinal cord, and nerve disorders', count: 8 },
  { id: 'dermatology', name: 'Dermatology', icon: 'RiSunLine', desc: 'Skin, hair, nails, and cosmetic issues', count: 15 },
  { id: 'orthopedics', name: 'Orthopedics', icon: 'RiBodyScanLine', desc: 'Bone, joint, muscle, and ligament injuries', count: 10 },
  { id: 'gynecology', name: 'Gynecology', icon: 'RiUserHeartLine', desc: 'Women\'s health, pregnancy, and childbirth', count: 14 },
  { id: 'dentist', name: 'Dentist', icon: 'RiShieldCheckLine', desc: 'Dental care, scaling, fillings, and braces', count: 18 },
  { id: 'pediatrics', name: 'Pediatrics', icon: 'RiHeartAddLine', desc: 'Infant, child, and adolescent healthcare', count: 11 },
  { id: 'psychiatry', name: 'Psychiatry', icon: 'RiMentalHealthLine', desc: 'Mental health, anxiety, and therapy', count: 7 },
  { id: 'general-physician', name: 'General Physician', icon: 'RiStethoscopeLine', desc: 'General health, viral fevers, and checkups', count: 25 }
];

export const doctors = [
  {
    id: 'doc-1',
    name: 'Dr. Sarah Connor',
    specialization: 'Cardiology',
    specId: 'cardiology',
    qualification: 'MD, DM (Cardiology), FACC',
    experience: 15,
    rating: 4.9,
    reviewsCount: 312,
    fee: 1000,
    hospital: 'Apex Heart Institute, Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Sarah Connor is a senior interventional cardiologist with over 15 years of experience in treating complex cardiovascular conditions. She specializes in angioplasty, heart failure management, and preventive cardiology.',
    workingHours: 'Mon - Sat: 09:00 AM - 01:00 PM, 04:00 PM - 07:00 PM',
    availability: {
      Monday: ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'],
      Tuesday: ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'],
      Wednesday: ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'],
      Thursday: ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'],
      Friday: ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'],
      Saturday: ['09:00 AM', '10:00 AM', '11:00 AM']
    },
    reviews: [
      { id: 'r-1', patientName: 'John Doe', rating: 5, date: '2026-07-01', comment: 'Excellent doctor! She listened patiently and explained the treatment clearly.' },
      { id: 'r-2', patientName: 'Mary Jane', rating: 4, date: '2026-06-24', comment: 'Very professional. Staff was also courteous, though wait time was about 20 mins.' }
    ]
  },
  {
    id: 'doc-2',
    name: 'Dr. Robert Chen',
    specialization: 'Neurology',
    specId: 'neurology',
    qualification: 'MD, DM (Neurology)',
    experience: 12,
    rating: 4.8,
    reviewsCount: 198,
    fee: 1200,
    hospital: 'Neuro Care Center, Bangalore',
    languages: ['English', 'Mandarin', 'Kannada'],
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Robert Chen is a leading neurologist specializing in neuropathies, epilepsy, migraine therapies, and neurodegenerative disorders. He is dedicated to research-driven patient care.',
    workingHours: 'Mon - Fri: 10:00 AM - 04:00 PM',
    availability: {
      Monday: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      Tuesday: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      Wednesday: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      Thursday: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM'],
      Friday: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
    },
    reviews: [
      { id: 'r-3', patientName: 'David Miller', rating: 5, date: '2026-07-10', comment: 'Highly skilled! His diagnosis was spot on and treatment plan worked wonders.' }
    ]
  },
  {
    id: 'doc-3',
    name: 'Dr. Alisha Patel',
    specialization: 'Dermatology',
    specId: 'dermatology',
    qualification: 'MD (Dermatology, Venereology & Leprosy)',
    experience: 8,
    rating: 4.7,
    reviewsCount: 245,
    fee: 800,
    hospital: 'Skin & Aesthetics Clinic, Delhi',
    languages: ['English', 'Hindi', 'Gujarati'],
    image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Alisha Patel has extensive experience in clinical dermatology, hair restoration, and laser treatments. She focuses on providing personalized and scientifically proven skin therapies.',
    workingHours: 'Mon - Sat: 11:00 AM - 08:00 PM',
    availability: {
      Monday: ['11:00 AM', '12:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Tuesday: ['11:00 AM', '12:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Wednesday: ['11:00 AM', '12:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Thursday: ['11:00 AM', '12:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Friday: ['11:00 AM', '12:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Saturday: ['11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM']
    },
    reviews: [
      { id: 'r-4', patientName: 'Samantha Green', rating: 5, date: '2026-07-08', comment: 'Solved my chronic acne problem in just a month! Very reassuring doctor.' }
    ]
  },
  {
    id: 'doc-4',
    name: 'Dr. Marcus Vance',
    specialization: 'Orthopedics',
    specId: 'orthopedics',
    qualification: 'MS (Orthopedics), M.Ch',
    experience: 18,
    rating: 4.9,
    reviewsCount: 420,
    fee: 1100,
    hospital: 'Joint & Bone Care Clinic, Chennai',
    languages: ['English', 'Tamil', 'Telugu'],
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Marcus Vance is a renowned orthopedic surgeon with specialization in joint replacements, sports injuries, and complex arthroscopic procedures. He is known for minimally invasive surgeries.',
    workingHours: 'Mon - Sat: 08:00 AM - 12:00 PM, 03:00 PM - 06:00 PM',
    availability: {
      Monday: ['08:00 AM', '09:00 AM', '03:00 PM', '04:00 PM'],
      Wednesday: ['08:00 AM', '09:00 AM', '03:00 PM', '04:00 PM'],
      Friday: ['08:00 AM', '09:00 AM', '03:00 PM', '04:00 PM'],
      Saturday: ['08:00 AM', '10:00 AM']
    },
    reviews: [
      { id: 'r-5', patientName: 'Arthur Dent', rating: 5, date: '2026-07-02', comment: 'Fantastic knee replacement surgery. I am walking comfortably again after months!' }
    ]
  },
  {
    id: 'doc-5',
    name: 'Dr. Elena Rostova',
    specialization: 'Gynecology',
    specId: 'gynecology',
    qualification: 'MD, DGO (Obstetrics & Gynecology)',
    experience: 14,
    rating: 4.8,
    reviewsCount: 388,
    fee: 900,
    hospital: 'Women & Child Wellness Center, Pune',
    languages: ['English', 'Russian', 'Marathi'],
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Elena Rostova offers compassionate prenatal care, infertility management, and high-risk pregnancy control. She has spent over 14 years empowering women to make informed healthcare choices.',
    workingHours: 'Mon - Fri: 09:00 AM - 05:00 PM',
    availability: {
      Monday: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      Tuesday: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      Wednesday: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      Thursday: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'],
      Friday: ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM']
    },
    reviews: []
  },
  {
    id: 'doc-6',
    name: 'Dr. Neil Gaiman',
    specialization: 'Dentist',
    specId: 'dentist',
    qualification: 'BDS, MDS (Orthodontics)',
    experience: 10,
    rating: 4.6,
    reviewsCount: 154,
    fee: 600,
    hospital: 'Healthy Smile Clinic, Hyderabad',
    languages: ['English', 'Telugu', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Neil Gaiman is an orthodontics specialist dedicated to bringing back beautiful smiles. He does dental implants, root canals, and cosmetic smile designs.',
    workingHours: 'Mon - Sat: 10:00 AM - 02:00 PM, 05:00 PM - 09:00 PM',
    availability: {
      Monday: ['10:00 AM', '11:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Tuesday: ['10:00 AM', '11:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Wednesday: ['10:00 AM', '11:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Thursday: ['10:00 AM', '11:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Friday: ['10:00 AM', '11:00 AM', '05:00 PM', '06:00 PM', '07:00 PM'],
      Saturday: ['10:00 AM', '11:00 AM', '05:00 PM', '06:00 PM']
    },
    reviews: []
  },
  {
    id: 'doc-7',
    name: 'Dr. Maya Lin',
    specialization: 'Pediatrics',
    specId: 'pediatrics',
    qualification: 'MD (Pediatrics), DCH',
    experience: 9,
    rating: 4.9,
    reviewsCount: 220,
    fee: 700,
    hospital: 'Kids Choice Hospital, Kolkata',
    languages: ['English', 'Bengali', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Maya Lin is highly passionate about child growth monitoring, vaccinations, childhood allergies, and nutrition guidance. She provides a child-friendly environment during treatments.',
    workingHours: 'Mon - Fri: 10:00 AM - 06:00 PM',
    availability: {
      Monday: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
      Tuesday: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
      Wednesday: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
      Thursday: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
      Friday: ['10:00 AM', '12:00 PM', '02:00 PM', '04:00 PM']
    },
    reviews: []
  },
  {
    id: 'doc-8',
    name: 'Dr. Jonathan Crane',
    specialization: 'Psychiatry',
    specId: 'psychiatry',
    qualification: 'MD (Psychiatry), DPM',
    experience: 16,
    rating: 4.5,
    reviewsCount: 108,
    fee: 1500,
    hospital: 'Arkham Wellness Institute, Gurgaon',
    languages: ['English', 'Hindi'],
    image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Jonathan Crane is an experienced mental health practitioner specializing in cognitive behavioral therapy, anxiety treatments, clinical depression, and stress management.',
    workingHours: 'Mon - Fri: 02:00 PM - 08:00 PM',
    availability: {
      Monday: ['02:00 PM', '03:00 PM', '05:00 PM', '06:00 PM'],
      Wednesday: ['02:00 PM', '03:00 PM', '05:00 PM', '06:00 PM'],
      Thursday: ['02:00 PM', '03:00 PM', '05:00 PM', '06:00 PM'],
      Friday: ['02:00 PM', '03:00 PM', '05:00 PM', '06:00 PM']
    },
    reviews: []
  },
  {
    id: 'doc-9',
    name: 'Dr. Samuel Jackson',
    specialization: 'General Physician',
    specId: 'general-physician',
    qualification: 'MBBS, MD (General Medicine)',
    experience: 20,
    rating: 4.8,
    reviewsCount: 512,
    fee: 500,
    hospital: 'City General Clinic, Mumbai',
    languages: ['English', 'Hindi', 'Tamil'],
    image: 'https://images.unsplash.com/photo-1582750433449-649352e3f43f?auto=format&fit=crop&w=400&q=80',
    bio: 'Dr. Samuel Jackson has been a dedicated general physician for over two decades. He manages acute illnesses, lifestyle disorders (diabetes, thyroid, hypertension), and regular health packages.',
    workingHours: 'Mon - Sat: 08:00 AM - 02:00 PM, 05:00 PM - 08:00 PM',
    availability: {
      Monday: ['08:00 AM', '09:00 AM', '11:00 AM', '05:00 PM', '06:00 PM'],
      Tuesday: ['08:00 AM', '09:00 AM', '11:00 AM', '05:00 PM', '06:00 PM'],
      Wednesday: ['08:00 AM', '09:00 AM', '11:00 AM', '05:00 PM', '06:00 PM'],
      Thursday: ['08:00 AM', '09:00 AM', '11:00 AM', '05:00 PM', '06:00 PM'],
      Friday: ['08:00 AM', '09:00 AM', '11:00 AM', '05:00 PM', '06:00 PM'],
      Saturday: ['08:00 AM', '09:00 AM', '11:00 AM']
    },
    reviews: []
  }
];

export const preloadedAppointments = [
  {
    id: 'apt-1',
    patientId: 'pat-1',
    patientName: 'Pranathi Satyavarapu',
    patientEmail: 'pranathi@example.com',
    patientPhone: '+91 9876543210',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Connor',
    specialization: 'Cardiology',
    date: '2026-07-16',
    time: '10:00 AM',
    fee: 1000,
    status: 'Confirmed',
    reason: 'Routine ECG check-up & general high blood pressure consultation',
    reports: [
      { name: 'ECG_Report_June.pdf', size: '1.2 MB' }
    ]
  },
  {
    id: 'apt-2',
    patientId: 'pat-1',
    patientName: 'Pranathi Satyavarapu',
    patientEmail: 'pranathi@example.com',
    patientPhone: '+91 9876543210',
    doctorId: 'doc-3',
    doctorName: 'Dr. Alisha Patel',
    specialization: 'Dermatology',
    date: '2026-07-20',
    time: '12:00 PM',
    fee: 800,
    status: 'Pending',
    reason: 'Mild allergic reaction on arms, consulting for skin cream advice.',
    reports: []
  },
  {
    id: 'apt-3',
    patientId: 'pat-1',
    patientName: 'Pranathi Satyavarapu',
    patientEmail: 'pranathi@example.com',
    patientPhone: '+91 9876543210',
    doctorId: 'doc-9',
    doctorName: 'Dr. Samuel Jackson',
    specialization: 'General Physician',
    date: '2026-06-15',
    time: '09:00 AM',
    fee: 500,
    status: 'Completed',
    reason: 'Seasonal viral fever & prescription renewal',
    reports: []
  },
  {
    id: 'apt-4',
    patientId: 'pat-2',
    patientName: 'John Doe',
    patientEmail: 'johndoe@example.com',
    patientPhone: '+91 9988776655',
    doctorId: 'doc-1',
    doctorName: 'Dr. Sarah Connor',
    specialization: 'Cardiology',
    date: '2026-07-15',
    time: '11:00 AM',
    fee: 1000,
    status: 'Completed',
    reason: 'Chest pain evaluation',
    reports: []
  }
];

export const preloadedReports = [
  {
    id: 'rep-1',
    patientId: 'pat-1',
    patientName: 'Pranathi Satyavarapu',
    fileName: 'ECG_Report_June.pdf',
    fileSize: '1.2 MB',
    uploadedAt: '2026-06-30',
    doctorName: 'Dr. Sarah Connor',
    category: 'Cardiology'
  },
  {
    id: 'rep-2',
    patientId: 'pat-1',
    patientName: 'Pranathi Satyavarapu',
    fileName: 'Blood_Test_Report_May.pdf',
    fileSize: '2.4 MB',
    uploadedAt: '2026-05-18',
    doctorName: 'Dr. Samuel Jackson',
    category: 'General Physician'
  }
];

export const preloadedNotifications = [
  {
    id: 'notif-1',
    userId: 'pat-1',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Sarah Connor on 2026-07-16 at 10:00 AM has been confirmed.',
    type: 'success',
    timestamp: '2 hours ago',
    read: false
  },
  {
    id: 'notif-2',
    userId: 'pat-1',
    title: 'Medical Report Uploaded',
    message: 'ECG_Report_June.pdf has been uploaded and linked to your health card.',
    type: 'info',
    timestamp: '1 day ago',
    read: true
  },
  {
    id: 'notif-3',
    userId: 'doc-1',
    title: 'New Booking Request',
    message: 'Patient John Doe booked a slot for 2026-07-15 at 11:00 AM.',
    type: 'warning',
    timestamp: '3 hours ago',
    read: false
  }
];

export const testimonials = [
  {
    id: 't-1',
    name: 'David Warnock',
    rating: 5,
    role: 'Patient',
    comment: 'The absolute best experience for doctor search. I booked a slot with Dr. Sarah and within 5 minutes got my confirmation. Clean UI!',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 't-2',
    name: 'Samantha Reed',
    rating: 5,
    role: 'Patient',
    comment: 'Managing reports was always a chore. Being able to upload medical records straight while booking saved me from carrying heavy papers.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80'
  },
  {
    id: 't-3',
    name: 'Dr. Sarah Connor',
    rating: 5,
    role: 'Cardiologist',
    comment: 'As a medical provider, the calendar toggle and availability scheduler in Book a Doctor are very easy to use. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=100&q=80'
  }
];

export const faqs = [
  {
    id: 'faq-1',
    question: 'How do I book an appointment?',
    answer: 'Navigate to the Doctors section, search and filter by specialization, hospital, or rating. Select your preferred doctor, click on "Book Appointment", choose an available date and time slot, upload any prior medical records, and click Confirm.'
  },
  {
    id: 'faq-2',
    question: 'Can I cancel or reschedule my appointment?',
    answer: 'Yes! You can manage all your appointments in the Patient Dashboard. Go to the "Appointments" tab and click the Cancel button. The system will instantly free up the slot and notify the doctor.'
  },
  {
    id: 'faq-3',
    question: 'Are my uploaded medical records secure?',
    answer: 'Absolutely. Book a Doctor encrypts all uploaded documents on storage. They are only shared securely with the doctor you are consulting for diagnostic purposes.'
  },
  {
    id: 'faq-4',
    question: 'Is there a consultation fee for using this platform?',
    answer: 'No, Book a Doctor does not charge patients a booking fee. You only pay the listed consultation fee directly to the doctor or hospital at the clinic or during virtual consults.'
  }
];
