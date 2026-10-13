import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  AlertCircle, 
  CheckCircle2,
  Loader2,
  Send,
  RotateCcw,
  Phone,
  Mail
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import EmailClientModal from '../components/EmailClientModal';
import { formatDriverApplication } from '../utils/emailFormatters';
import { submitCareerForm } from '../services/formSubmissionService';

export default function CareersPage() {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    cityProvince: '',
    position: 'Hotshot Driver (Class 1)',
    experienceYears: '3-5 years',
    licenseClass: 'Class 1 Commercial',
    hasValidLicense: 'Yes',
    transportExperience: '',
    coverLetter: '',
    consent: false,
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [resumeError, setResumeError] = useState('');
  const [errors, setErrors] = useState({});

  // Webform Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // Submission / Modal State (Fallback)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preparedEmail, setPreparedEmail] = useState({
    subject: '',
    body: '',
    htmlBody: '',
    mailtoUrl: '',
  });

  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    validateAndSetFile(file);
  };

  const validateAndSetFile = (file) => {
    setResumeError('');
    if (!file) {
      setResumeFile(null);
      return;
    }

    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      setResumeError('Please upload a valid PDF, DOC, or DOCX document.');
      setResumeFile(null);
      return;
    }

    if (file.size > maxFileSize) {
      setResumeError('File size exceeds the 10 MB limit. Please select a smaller file.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    if (errors.resume) {
      setErrors((prev) => ({ ...prev, resume: '' }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.cityProvince.trim()) newErrors.cityProvince = 'City and Province is required';

    if (!resumeFile) {
      newErrors.resume = 'A resume file (PDF, DOC, DOCX) is required';
    }

    if (!formData.consent) {
      newErrors.consent = 'You must confirm the certification acknowledgment';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission (Direct Webform via AJAX)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    const res = await submitCareerForm(formData, resumeFile);

    setIsSubmitting(false);

    const formatted = formatDriverApplication(formData, resumeFile);
    setPreparedEmail({
      subject: formatted.subject,
      body: formatted.plainText,
      htmlBody: formatted.html,
      mailtoUrl: formatted.mailtoUrl,
    });

    if (res.success) {
      setSubmittedData({
        ...formData,
        resumeFileName: resumeFile ? resumeFile.name : 'Attached Resume',
        fileSize: resumeFile ? (resumeFile.size / 1024).toFixed(1) : '',
      });
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        cityProvince: '',
        position: 'Hotshot Driver (Class 1)',
        experienceYears: '3-5 years',
        licenseClass: 'Class 1 Commercial',
        hasValidLicense: 'Yes',
        transportExperience: '',
        coverLetter: '',
        consent: false,
      });
      setResumeFile(null);
    } else {
      setSubmitError(res.error || 'Failed to submit driver application online.');
      setIsModalOpen(true);
    }
  };

  return (
    <div className="bg-[#0B0B0D] text-gray-200 overflow-x-hidden">
      {/* Header */}
      <section className="relative py-12 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Careers & Opportunities
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Join the Brothers Hotshot Services Team
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Interested in driving with us? Complete the application form and send your resume to our recruitment email.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {submitSuccess ? (
            <div className="rounded-2xl bg-[#131317] border border-[#D4AF37]/50 p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-400" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                  Application Submitted Online
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Thank You, {submittedData?.fullName}!
                </h2>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Your driver application for <strong>{submittedData?.position}</strong> along with your resume (<span className="text-[#D4AF37] font-mono">{submittedData?.resumeFileName}</span>) has been transmitted directly to our recruitment team in Red Deer, AB.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto p-4 sm:p-5 rounded-xl bg-black/60 border border-white/10 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Position Applied:</span>
                  <span className="font-bold text-white">{submittedData?.position}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Experience / License:</span>
                  <span className="font-semibold text-gray-200">
                    {submittedData?.experienceYears} • {submittedData?.licenseClass}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Applicant Location:</span>
                  <span className="font-semibold text-gray-200">{submittedData?.cityProvince}</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-gray-400">Confirmation Contact:</span>
                  <span className="font-semibold text-gray-200">
                    {submittedData?.phone} • {submittedData?.email}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-2">
                  <span className="text-gray-400">Sent To Dispatch:</span>
                  <span className="font-mono text-[#D4AF37] font-semibold">{BUSINESS_INFO.email}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                We review all Class 1 / hotshot driving submissions and follow up promptly with qualified applicants.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs sm:text-sm shadow-xl min-h-[46px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Recruitment: {BUSINESS_INFO.phone}</span>
                </a>
                {preparedEmail.mailtoUrl && (
                  <a
                    href={preparedEmail.mailtoUrl}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm min-h-[46px]"
                  >
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>Open Direct Email Draft</span>
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setSubmitSuccess(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-xs sm:text-sm min-h-[46px] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Submit Another Application</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Direct Webform Notice Box */}
              <div className="mb-8 sm:mb-10 p-4 sm:p-5 rounded-2xl bg-[#17171F] border border-[#D4AF37]/40 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs sm:text-sm">
                  <p className="font-bold text-white text-sm sm:text-base">
                    Direct Webform Application
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Submit your qualifications and upload your resume directly to our central dispatch and recruitment operations in Red Deer, AB. We promptly review all driver applications.
                  </p>
                </div>
              </div>

              {submitError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs space-y-2">
                  <p className="font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Online Submission Issue: {submitError}</span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-semibold text-xs hover:bg-white/15 cursor-pointer"
                  >
                    <span>Open Email Client Backup</span>
                  </button>
                </div>
              )}

              {/* Form Card */}
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-4 sm:p-8 lg:p-10 shadow-2xl">
                <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10" noValidate>
              {/* 1. PERSONAL INFORMATION */}
              <div className="space-y-5 sm:space-y-6">
                <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] text-xs flex items-center justify-center font-mono">1</span>
                    <span>Personal Information</span>
                  </h2>
                  <span className="text-xs text-gray-400">* Required fields</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Full Name <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. John MacDonald"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        errors.fullName ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Email Address <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. john@example.com"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        errors.email ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Phone Number <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 587-000-0000"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        errors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* City and Province */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      City and Province <span className="text-[#D4AF37]">*</span>
                    </label>
                    <input
                      type="text"
                      name="cityProvince"
                      value={formData.cityProvince}
                      onChange={handleChange}
                      placeholder="e.g. Red Deer, AB"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        errors.cityProvince ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.cityProvince && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.cityProvince}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* 2. DRIVING INFORMATION */}
              <div className="space-y-5 sm:space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] text-xs flex items-center justify-center font-mono">2</span>
                    <span>Driving Information</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  {/* Position Applying For */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Position Applying For <span className="text-[#D4AF37]">*</span>
                    </label>
                    <select
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none transition-colors"
                    >
                      <option value="Hotshot Driver (Class 1)">Hotshot Driver (Class 1)</option>
                      <option value="Hotshot Driver (Class 3 / Air Brake)">Hotshot Driver (Class 3 / Air Brake)</option>
                      <option value="Hotshot Driver (Class 5 with Q Endorsement)">Hotshot Driver (Class 5 with Q Endorsement)</option>
                      <option value="Owner Operator - Hotshot Unit">Owner Operator - Hotshot Unit</option>
                      <option value="Regional Expedited Courier Driver">Regional Expedited Courier Driver</option>
                    </select>
                  </div>

                  {/* Years of Driving Experience */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Years of Driving Experience
                    </label>
                    <select
                      name="experienceYears"
                      value={formData.experienceYears}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none transition-colors"
                    >
                      <option value="1-2 years">1 - 2 years</option>
                      <option value="3-5 years">3 - 5 years</option>
                      <option value="5-10 years">5 - 10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  {/* Driver's License Class */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Driver's License Class
                    </label>
                    <select
                      name="licenseClass"
                      value={formData.licenseClass}
                      onChange={handleChange}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none transition-colors"
                    >
                      <option value="Class 1 Commercial">Class 1 Commercial (Semi / Heavy Combination)</option>
                      <option value="Class 2 Commercial">Class 2 Commercial</option>
                      <option value="Class 3 Commercial">Class 3 Heavy Commercial Truck</option>
                      <option value="Class 5 GDL / Standard">Class 5 (Standard Driver)</option>
                      <option value="Class 5 with Q Endorsement">Class 5 with Air Brake (Q) Endorsement</option>
                    </select>
                  </div>

                  {/* Valid Driver's License (Yes/No) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Do you have a Valid Driver's License? <span className="text-[#D4AF37]">*</span>
                    </label>
                    <div className="flex gap-6 pt-1">
                      <label className="flex items-center gap-2.5 cursor-pointer py-1">
                        <input
                          type="radio"
                          name="hasValidLicense"
                          value="Yes"
                          checked={formData.hasValidLicense === 'Yes'}
                          onChange={handleChange}
                          className="accent-[#D4AF37] w-5 h-5 cursor-pointer"
                        />
                        <span className="text-white font-medium text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2.5 cursor-pointer py-1">
                        <input
                          type="radio"
                          name="hasValidLicense"
                          value="No"
                          checked={formData.hasValidLicense === 'No'}
                          onChange={handleChange}
                          className="accent-[#D4AF37] w-5 h-5 cursor-pointer"
                        />
                        <span className="text-gray-400 text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Previous Transportation Experience (optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300 block">
                    Previous Transportation Experience (optional)
                  </label>
                  <textarea
                    name="transportExperience"
                    rows={3}
                    value={formData.transportExperience}
                    onChange={handleChange}
                    placeholder="Briefly describe previous hotshot, flatbed, gooseneck, or cargo securement experience..."
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* 3. RESUME UPLOAD */}
              <div className="space-y-4 sm:space-y-5">
                <div className="border-b border-white/10 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] text-xs flex items-center justify-center font-mono">3</span>
                    <span>Resume Upload</span>
                  </h2>
                  <span className="text-xs text-[#D4AF37] font-semibold">* Required file</span>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-semibold text-gray-300 block">
                    Upload Resume (PDF, DOC, or DOCX) <span className="text-[#D4AF37]">*</span>
                  </label>

                  {/* Upload Drop Zone / Input */}
                  <div className={`relative border-2 border-dashed ${
                    errors.resume || resumeError ? 'border-red-500 bg-red-950/10' : resumeFile ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/20 hover:border-[#D4AF37]/50 bg-black/40'
                  } rounded-2xl p-5 sm:p-6 text-center transition-all cursor-pointer`}>
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {resumeFile ? (
                      <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white break-all px-2">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-[#D4AF37] mt-0.5 font-mono">
                            {(resumeFile.size / 1024).toFixed(1)} KB • Ready to attach
                          </p>
                        </div>
                        <p className="text-xs text-gray-400 pt-1">
                          Tap to choose another file
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-12 h-12 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                          <Upload className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Tap to upload your resume
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            Accepted: <strong className="text-gray-300">PDF, DOC, DOCX</strong> (Max 10 MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Validation feedback */}
                  {(errors.resume || resumeError) && (
                    <p className="text-xs text-red-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{resumeError || errors.resume}</span>
                    </p>
                  )}

                  {/* Direct upload note */}
                  <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 text-xs text-gray-300 space-y-1">
                    <p className="font-semibold text-[#F5E6B3] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Direct File Attachment:</span>
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                      Your selected document will be uploaded and transmitted directly with your application to <strong className="text-gray-300">{BUSINESS_INFO.email}</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. ADDITIONAL INFORMATION */}
              <div className="space-y-5 sm:space-y-6">
                <div className="border-b border-white/10 pb-3">
                  <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#D4AF37]/20 text-[#D4AF37] text-xs flex items-center justify-center font-mono">4</span>
                    <span>Additional Information</span>
                  </h2>
                </div>

                {/* Cover Letter or Message (optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300 block">
                    Cover Letter or Message (optional)
                  </label>
                  <textarea
                    name="coverLetter"
                    rows={4}
                    value={formData.coverLetter}
                    onChange={handleChange}
                    placeholder="Provide any additional details, availability, current schedule, or personal introduction..."
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors"
                  />
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-1.5">
                  <label className="flex items-start gap-3 cursor-pointer py-1">
                    <input
                      type="checkbox"
                      name="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 accent-[#D4AF37] w-5 h-5 rounded cursor-pointer shrink-0"
                    />
                    <span className="text-xs text-gray-300 leading-relaxed">
                      I certify that the information provided in this driver application is accurate and complete to the best of my knowledge.
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.consent}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2 sm:pt-4 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 sm:px-8 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[50px] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-[#0B0B0D]" />
                      <span>Submitting Driver Application...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-[#0B0B0D]" />
                      <span>Submit Driver Application Online</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] sm:text-xs text-center text-gray-400">
                  Direct online submission to recruitment at <strong className="text-gray-300">{BUSINESS_INFO.email}</strong>.
                </p>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  </section>

      {/* Confirmation & Email Client Modal */}
      <EmailClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Send Driver Application by Email"
        recipient={BUSINESS_INFO.email}
        subject={preparedEmail.subject}
        body={preparedEmail.body}
        htmlBody={preparedEmail.htmlBody}
        mailtoUrl={preparedEmail.mailtoUrl}
        selectedFile={resumeFile}
        isJobApplication={true}
      />
    </div>
  );
}
