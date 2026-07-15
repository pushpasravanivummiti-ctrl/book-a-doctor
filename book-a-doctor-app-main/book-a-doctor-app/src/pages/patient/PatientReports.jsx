import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { RiFileAddLine, RiFolderShield2Line, RiDownloadLine, RiAttachmentLine } from 'react-icons/ri';
import { toast } from 'react-toastify';

const PatientReports = () => {
  const { user } = useAuth();
  const { reports, uploadReport } = useApp();

  // Filter specific to active patient user
  const userReports = reports.filter((r) => r.patientId === user?.id);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadReport({
      patientId: user.id,
      patientName: user.name,
      fileName: file.name,
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      doctorName: 'Self Uploaded',
      category: 'General'
    });
  };

  const handleDownload = (name) => {
    toast.success(`Simulated Download: file "${name}" requested successfully.`);
  };

  return (
    <div className="space-y-6">
      
      {/* File Uploader */}
      <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-4">
        <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2">
          <RiFileAddLine className="w-5 h-5 text-primary" />
          Upload Health Report
        </h3>
        
        <div className="border border-dashed border-borderColor dark:border-borderColor-dark rounded-custom p-6 text-center hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer relative group">
          <input
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileUpload}
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
          />
          <RiFileAddLine className="w-8 h-8 text-lightText mx-auto group-hover:text-primary transition-colors" />
          <p className="text-xs font-semibold text-darkText dark:text-darkText-dark mt-2">Drag files or click here to upload</p>
          <p className="text-[10px] text-lightText mt-1">Supports PDF, PNG, JPG (Max 5MB)</p>
        </div>
      </div>

      {/* Reports Listing */}
      <div className="bg-card dark:bg-card-dark border border-borderColor dark:border-borderColor-dark rounded-custom p-6 shadow-healthcare space-y-6">
        <h3 className="text-base font-bold text-darkText dark:text-darkText-dark flex items-center gap-2 border-b border-borderColor pb-4">
          <RiFolderShield2Line className="w-5 h-5 text-primary" />
          Medical Records Folder ({userReports.length})
        </h3>

        {userReports.length === 0 ? (
          <p className="text-xs text-lightText py-6 text-center">No uploaded medical documents found in this session.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {userReports.map((rep) => (
              <div
                key={rep.id}
                className="p-4 bg-slate-50 dark:bg-slate-800/40 border border-borderColor dark:border-borderColor-dark rounded-custom flex items-center justify-between shadow-xs hover:border-primary transition-colors"
              >
                <div className="flex items-center space-x-3.5 overflow-hidden">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-full flex-shrink-0">
                    <RiAttachmentLine className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="font-bold text-xs text-darkText dark:text-darkText-dark truncate" title={rep.fileName}>
                      {rep.fileName}
                    </h4>
                    <div className="flex items-center space-x-2 text-[10px] text-lightText mt-1">
                      <span>{rep.fileSize}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-600 dark:text-slate-400 capitalize">{rep.category}</span>
                    </div>
                    <span className="text-[9px] text-lightText block mt-0.5">Uploaded on {rep.uploadedAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(rep.fileName)}
                  className="p-2 bg-white dark:bg-slate-800 hover:bg-primary hover:text-white rounded-full border border-borderColor text-lightText dark:text-lightText-dark transition-all flex-shrink-0"
                  title="Download File"
                >
                  <RiDownloadLine className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default PatientReports;
