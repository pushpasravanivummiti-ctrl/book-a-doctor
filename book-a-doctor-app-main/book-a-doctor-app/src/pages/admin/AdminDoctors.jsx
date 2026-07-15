import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import Modal from '../../components/Modal';
import { RiUserAddLine, RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';
import { toast } from 'react-toastify';

const AdminDoctors = () => {
  const { doctorsList, addDoctor, updateDoctor, deleteDoctor } = useApp();

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null); // null = Add Mode, docObj = Edit Mode

  // Form states
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('Cardiology');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState(5);
  const [fee, setFee] = useState(500);
  const [hospital, setHospital] = useState('');
  const [languages, setLanguages] = useState('English, Hindi');
  const [image, setImage] = useState('');
  const [bio, setBio] = useState('');
  const [workingHours, setWorkingHours] = useState('Mon - Sat: 09:00 AM - 05:00 PM');

  const openAddModal = () => {
    setEditingDoc(null);
    setName('');
    setSpecialization('Cardiology');
    setQualification('');
    setExperience(5);
    setFee(500);
    setHospital('');
    setLanguages('English, Hindi');
    setImage('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80');
    setBio('');
    setWorkingHours('Mon - Sat: 09:00 AM - 05:00 PM');
    setModalOpen(true);
  };

  const openEditModal = (doc) => {
    setEditingDoc(doc);
    setName(doc.name);
    setSpecialization(doc.specialization);
    setQualification(doc.qualification);
    setExperience(doc.experience);
    setFee(doc.fee);
    setHospital(doc.hospital);
    setLanguages(doc.languages.join(', '));
    setImage(doc.image);
    setBio(doc.bio);
    setWorkingHours(doc.workingHours);
    setModalOpen(true);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove ${name} from registration index?`)) {
      deleteDoctor(id);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !qualification || !hospital || !bio) {
      toast.error('Please fill in Name, Qualification, Hospital and Bio');
      return;
    }

    const docPayload = {
      name,
      specialization,
      specId: specialization.toLowerCase().replace(/\s+/g, '-'),
      qualification,
      experience: Number(experience),
      fee: Number(fee),
      hospital,
      languages: languages.split(',').map((l) => l.trim()),
      image,
      bio,
      workingHours
    };

    if (editingDoc) {
      updateDoctor(editingDoc.id, docPayload);
    } else {
      addDoctor(docPayload);
    }

    setModalOpen(false);
  };

  return (
    <div className="space-y-6 bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 sm:p-8 shadow-healthcare">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-borderColor pb-4 mb-6">
        <div>
          <h3 className="text-base font-bold text-darkText dark:text-darkText-dark">Doctor Directory Index</h3>
          <p className="text-xs text-lightText mt-1">Manage active clinical registrations.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4.5 py-2.5 bg-primary text-white text-xs font-bold rounded-custom hover:bg-primary-hover transition-colors"
        >
          <RiUserAddLine className="w-4.5 h-4.5" />
          Add Vetted Doctor
        </button>
      </div>

      {/* Table grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-borderColor dark:border-borderColor-dark text-lightText uppercase tracking-wider font-semibold">
              <th className="pb-3">Photo & Name</th>
              <th className="pb-3">Specialty</th>
              <th className="pb-3">Qualification</th>
              <th className="pb-3">Experience</th>
              <th className="pb-3">Fee</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderColor dark:divide-borderColor-dark">
            {doctorsList.map((doc) => (
              <tr key={doc.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/10">
                <td className="py-4.5 flex items-center space-x-3">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-10 h-10 rounded-full object-cover object-top border border-borderColor"
                  />
                  <div>
                    <h4 className="font-bold text-darkText dark:text-darkText-dark">{doc.name}</h4>
                    <span className="text-[10px] text-lightText block mt-0.5">{doc.hospital.split(',')[0]}</span>
                  </div>
                </td>
                <td className="py-4.5">
                  <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold">
                    {doc.specialization}
                  </span>
                </td>
                <td className="py-4.5 text-lightText dark:text-lightText-dark font-medium">{doc.qualification}</td>
                <td className="py-4.5 font-semibold text-darkText dark:text-darkText-dark">{doc.experience} Years</td>
                <td className="py-4.5 font-bold text-emerald-600">₹{doc.fee}</td>
                <td className="py-4.5 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(doc)}
                    className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded border border-blue-200 transition-all inline-block"
                    title="Edit Details"
                  >
                    <RiEdit2Line className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id, doc.name)}
                    className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded border border-rose-200 transition-all inline-block"
                    title="Remove Registration"
                  >
                    <RiDeleteBin6Line className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Doctor Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingDoc ? `Edit Doctor ${editingDoc.name}` : 'Register Vetted Doctor'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* name */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Doctor Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Dr. Sarah Connor"
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
                required
              />
            </div>

            {/* Speciality */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Specialization</label>
              <select
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText cursor-pointer"
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Gynecology">Gynecology</option>
                <option value="Dentist">Dentist</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Psychiatry">Psychiatry</option>
                <option value="General Physician">General Physician</option>
              </select>
            </div>

            {/* Qualification */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Qualification *</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="MD, DM (Cardiology)"
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
                required
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Experience (Years) *</label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
                min="1"
                required
              />
            </div>

            {/* Fee */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Consultation Fee (₹) *</label>
              <input
                type="number"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
                min="100"
                required
              />
            </div>

            {/* Hospital */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Hospital Clinic Affiliation *</label>
              <input
                type="text"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                placeholder="Apex Heart Institute, Mumbai"
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
                required
              />
            </div>

            {/* languages */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Languages (Comma separated)</label>
              <input
                type="text"
                value={languages}
                onChange={(e) => setLanguages(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
              />
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Working Hours</label>
              <input
                type="text"
                value={workingHours}
                onChange={(e) => setWorkingHours(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
              />
            </div>

            {/* Profile image url */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Profile Photo URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText"
              />
            </div>

            {/* bio */}
            <div className="sm:col-span-2">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-lightText mb-1.5">Professional Bio *</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Dr. Sarah is an expert in..."
                rows="3"
                className="w-full bg-slate-50 dark:bg-slate-850 text-xs px-4 py-2.5 border border-borderColor rounded-custom outline-none text-darkText resize-none"
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-4 bg-primary text-white text-xs font-bold rounded-custom hover:bg-primary-hover transition-colors"
          >
            {editingDoc ? 'Save Updates' : 'Add to Registry'}
          </button>
        </form>
      </Modal>

    </div>
  );
};

export default AdminDoctors;
