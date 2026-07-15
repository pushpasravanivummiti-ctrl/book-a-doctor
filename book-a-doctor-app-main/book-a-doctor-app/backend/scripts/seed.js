const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from backend/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Admin = require('../models/Admin');
const Specialization = require('../models/Specialization');
const Appointment = require('../models/Appointment');

const specializationsData = [
  { name: 'Cardiology', description: 'Heart disease, chest pain, and heart attacks', image: '' },
  { name: 'Neurology', description: 'Brain, spinal cord, and nerve disorders', image: '' },
  { name: 'Dermatology', description: 'Skin, hair, nails, and cosmetic issues', image: '' },
  { name: 'Orthopedics', description: 'Bone, joint, muscle, and ligament injuries', image: '' },
  { name: 'Gynecology', description: "Women's health, pregnancy, and childbirth", image: '' },
  { name: 'Dentist', description: 'Dental care, scaling, fillings, and braces', image: '' },
  { name: 'Pediatrics', description: 'Infant, child, and adolescent healthcare', image: '' },
  { name: 'Psychiatry', description: 'Mental health, anxiety, and therapy', image: '' },
  { name: 'General Physician', description: 'General health, viral fevers, and checkups', image: '' }
];

const seedDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI is not defined in your env file.');
      process.exit(1);
    }
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for Seeding...');

    // Clear existing data
    await Patient.deleteMany();
    await Doctor.deleteMany();
    await Admin.deleteMany();
    await Specialization.deleteMany();
    await Appointment.deleteMany();

    console.log('Database cleared.');

    // Seed Specializations
    const createdSpecs = await Specialization.insertMany(specializationsData);
    console.log(`Seeded ${createdSpecs.length} specializations.`);

    // Seed Patient
    const patient = await Patient.create({
      fullName: 'Pranathi Satyavarapu',
      email: 'pranathi@example.com',
      phone: '+91 9876543210',
      password: 'password123', // Will be hashed automatically by pre-save hook
      gender: 'Female',
      age: 28,
      dob: new Date('1998-05-15'),
      bloodGroup: 'O+',
      address: 'Flat 402, Signature Residency, Madhapur, Hyderabad, India',
      medicalHistory: 'Mild Hypertension diagnosed in 2024. Allergic to penicillin.',
      profileImage: ''
    });
    console.log('Seeded default patient.');

    // Seed Doctor
    const doctor = await Doctor.create({
      name: 'Dr. Sarah Connor',
      email: 'sarah@example.com',
      password: 'password123',
      phone: '+91 9123456789',
      qualification: 'MD, DM (Cardiology), FACC',
      specialization: 'Cardiology',
      experience: 15,
      hospital: 'Apex Heart Institute, Mumbai',
      fee: 1000,
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      availableTime: ['09:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '05:00 PM'],
      bio: 'Dr. Sarah Connor is a senior interventional cardiologist with over 15 years of experience in treating complex cardiovascular conditions. She specializes in angioplasty, heart failure management, and preventive cardiology.',
      rating: 4.9,
      profileImage: ''
    });
    console.log('Seeded default doctor.');

    // Seed Admin
    await Admin.create({
      name: 'Main Administrator',
      email: 'admin@example.com',
      password: 'password123',
      phone: '+91 9998887776',
      role: 'Admin'
    });
    console.log('Seeded default admin.');

    // Seed sample appointments
    await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      date: new Date('2026-07-16'),
      time: '10:00 AM',
      reason: 'Routine ECG check-up & general high blood pressure consultation',
      status: 'Approved'
    });

    await Appointment.create({
      patient: patient._id,
      doctor: doctor._id,
      date: new Date('2026-06-15'),
      time: '09:00 AM',
      reason: 'Seasonal viral fever follow up',
      status: 'Completed'
    });

    console.log('Seeded sample appointments.');
    console.log('All seeding tasks finished successfully!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDB();
