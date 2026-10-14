import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Truck, 
  Cpu, 
  Wrench, 
  Layers, 
  Zap, 
  Compass, 
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  Send,
  Upload,
  FileText,
  AlertCircle,
  ExternalLink,
  Maximize2,
  X,
  Camera,
  Loader2,
  Calendar,
  RotateCcw,
  Mail
} from 'lucide-react';
import { BUSINESS_INFO, FLEET_IMAGES } from '../data/businessInfo';
import { SERVICES } from '../data/servicesData';
import { SERVICE_AREAS } from '../data/serviceAreasData';
import EmailClientModal from '../components/EmailClientModal';
import DeliveryServicesSection from '../components/DeliveryServicesSection';
import { 
  formatQuoteInquiry, 
  formatContactInquiry, 
  formatDriverApplication,
  openEmailAppOrWebmail
} from '../utils/emailFormatters';
import { submitQuoteForm, submitContactForm, submitCareerForm } from '../services/formSubmissionService';

const iconMap = {
  Truck: Truck,
  Cpu: Cpu,
  Wrench: Wrench,
  Layers: Layers,
  Zap: Zap,
  MapPin: MapPin,
  Compass: Compass,
  ShieldCheck: ShieldCheck,
};

export default function HomePage() {
  // Modal State for Official Brand Flyer
  const [showBrandModal, setShowBrandModal] = useState(false);
  // Modal State for Fleet & Marketing Graphics Lightbox
  const [lightboxImage, setLightboxImage] = useState(null);

  // Active prominent setup for Fleet View showcase
  const [activeFleetItem, setActiveFleetItem] = useState(FLEET_IMAGES[1] || FLEET_IMAGES[0]);
  // Active image for hero setup card (default to prominent pickup truck and trailer)
  const [heroActiveImage, setHeroActiveImage] = useState(FLEET_IMAGES[1]?.url || BUSINESS_INFO.logoUrl);

  // Lock background scroll when either modal is open
  useEffect(() => {
    if (showBrandModal || lightboxImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showBrandModal, lightboxImage]);

  // Modal State for Email Client
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    subject: '',
    body: '',
    htmlBody: '',
    mailtoUrl: '',
    selectedFile: null,
    isJobApplication: false,
    quoteDetails: null,
  });

  // Quote Form State
  const [quoteData, setQuoteData] = useState({
    customerName: '',
    email: '',
    phone: '',
    pickupLocation: '',
    deliveryLocation: '',
    loadType: 'Hotshot Delivery Services',
    pickupDate: '',
    dimensionsWeight: '',
    additionalDetails: '',
  });
  const [quoteErrors, setQuoteErrors] = useState({});
  const [isQuoteSubmitting, setIsQuoteSubmitting] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [submittedQuoteData, setSubmittedQuoteData] = useState(null);
  const [quoteSubmitError, setQuoteSubmitError] = useState('');

  // Careers Form State
  const [careerData, setCareerData] = useState({
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
  const [careerErrors, setCareerErrors] = useState({});
  const [isCareerSubmitting, setIsCareerSubmitting] = useState(false);
  const [careerSuccess, setCareerSuccess] = useState(false);
  const [submittedCareerData, setSubmittedCareerData] = useState(null);
  const [careerSubmitError, setCareerSubmitError] = useState('');

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Transportation Inquiry',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState({});
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);
  const [submittedContactData, setSubmittedContactData] = useState(null);
  const [contactSubmitError, setContactSubmitError] = useState('');

  // -------------------------------------------------------------
  // Quote Form Handlers
  // -------------------------------------------------------------
  const handleQuoteChange = (e) => {
    const { name, value } = e.target;
    setQuoteData((prev) => ({ ...prev, [name]: value }));
    if (quoteErrors[name]) setQuoteErrors((prev) => ({ ...prev, [name]: '' }));
    if (quoteSubmitError) setQuoteSubmitError('');
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!quoteData.customerName.trim()) errs.customerName = 'Customer Name is required';
    if (!quoteData.email.trim()) errs.email = 'Email is required';
    if (!quoteData.phone.trim()) errs.phone = 'Phone number is required';
    if (!quoteData.pickupLocation.trim()) errs.pickupLocation = 'Pickup location is required';
    if (!quoteData.deliveryLocation.trim()) errs.deliveryLocation = 'Delivery location is required';

    if (Object.keys(errs).length > 0) {
      setQuoteErrors(errs);
      return;
    }

    setIsQuoteSubmitting(true);
    setQuoteSubmitError('');

    // Direct Webform submission via AJAX
    const res = await submitQuoteForm(quoteData);

    setIsQuoteSubmitting(false);

    const formatted = formatQuoteInquiry(quoteData);

    if (res.success) {
      setSubmittedQuoteData({
        ...quoteData,
        mailtoUrl: formatted.mailtoUrl,
      });
      setQuoteSuccess(true);
      setQuoteData({
        customerName: '',
        email: '',
        phone: '',
        pickupLocation: '',
        deliveryLocation: '',
        loadType: 'Urgent Hotshot Delivery',
        pickupDate: '',
        dimensionsWeight: '',
        additionalDetails: '',
      });
      setTimeout(() => {
        const elem = document.getElementById('quote');
        if (elem) {
          const headerOffset = 90;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    } else {
      setQuoteSubmitError(res.error || 'Failed to submit quote inquiry online.');
      setModalState({
        isOpen: true,
        title: 'Open Email Client Backup',
        subject: formatted.subject,
        body: formatted.plainText,
        htmlBody: formatted.html,
        mailtoUrl: formatted.mailtoUrl,
        selectedFile: null,
        isJobApplication: false,
        quoteDetails: quoteData,
      });
    }
  };

  // -------------------------------------------------------------
  // Careers Form Handlers
  // -------------------------------------------------------------
  const handleCareerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCareerData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (careerErrors[name]) setCareerErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleResumeFile = (e) => {
    const file = e.target.files?.[0];
    setResumeError('');
    if (!file) {
      setResumeFile(null);
      return;
    }

    const fileExt = '.' + file.name.split('.').pop().toLowerCase();
    const allowed = ['.pdf', '.doc', '.docx'];
    if (!allowed.includes(fileExt)) {
      setResumeError('Please upload a PDF, DOC, or DOCX document.');
      setResumeFile(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setResumeError('File size exceeds the 10 MB limit.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    if (careerErrors.resume) setCareerErrors((prev) => ({ ...prev, resume: '' }));
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!careerData.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!careerData.email.trim()) errs.email = 'Email Address is required';
    if (!careerData.phone.trim()) errs.phone = 'Phone Number is required';
    if (!careerData.cityProvince.trim()) errs.cityProvince = 'City and Province is required';
    if (!resumeFile) errs.resume = 'Resume file is required';
    if (!careerData.consent) errs.consent = 'You must confirm the certification acknowledgment';

    if (Object.keys(errs).length > 0) {
      setCareerErrors(errs);
      return;
    }

    setIsCareerSubmitting(true);
    setCareerSubmitError('');

    const res = await submitCareerForm(careerData, resumeFile);

    setIsCareerSubmitting(false);

    const formatted = formatDriverApplication(careerData, resumeFile);

    if (res.success) {
      setSubmittedCareerData({
        ...careerData,
        resumeFileName: resumeFile ? resumeFile.name : 'Attached Resume',
        fileSize: resumeFile ? (resumeFile.size / 1024).toFixed(1) : '',
        mailtoUrl: formatted.mailtoUrl,
      });
      setCareerSuccess(true);
      setCareerData({
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
      // Keep viewport firmly focused on the careers confirmation card and prevent dropping into #quote
      setTimeout(() => {
        const elem = document.getElementById('careers');
        if (elem) {
          const headerOffset = 90;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    } else {
      setCareerSubmitError(res.error || 'Failed to submit driver application online.');
      setModalState({
        isOpen: true,
        title: 'Open Email Client Backup',
        subject: formatted.subject,
        body: formatted.plainText,
        htmlBody: formatted.html,
        mailtoUrl: formatted.mailtoUrl,
        selectedFile: resumeFile,
        isJobApplication: true,
        quoteDetails: null,
      });
    }
  };

  // -------------------------------------------------------------
  // Contact Form Handlers
  // -------------------------------------------------------------
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
    if (contactErrors[name]) setContactErrors((prev) => ({ ...prev, [name]: '' }));
    if (contactSubmitError) setContactSubmitError('');
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!contactData.name.trim()) errs.name = 'Name is required';
    if (!contactData.email.trim()) errs.email = 'Email is required';
    if (!contactData.message.trim()) errs.message = 'Message is required';

    if (Object.keys(errs).length > 0) {
      setContactErrors(errs);
      return;
    }

    setIsContactSubmitting(true);
    setContactSubmitError('');

    const res = await submitContactForm(contactData);

    setIsContactSubmitting(false);

    const formatted = formatContactInquiry(contactData);

    if (res.success) {
      setSubmittedContactData({
        ...contactData,
        mailtoUrl: formatted.mailtoUrl,
      });
      setContactSuccess(true);
      setContactData({
        name: '',
        email: '',
        phone: '',
        subject: 'Transportation Inquiry',
        message: '',
      });
      setTimeout(() => {
        const elem = document.getElementById('contact');
        if (elem) {
          const headerOffset = 90;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 50);
    } else {
      setContactSubmitError(res.error || 'Failed to submit message online.');
      setModalState({
        isOpen: true,
        title: 'Open Email Client Backup',
        subject: formatted.subject,
        body: formatted.plainText,
        htmlBody: formatted.html,
        mailtoUrl: formatted.mailtoUrl,
        selectedFile: null,
        isJobApplication: false,
        quoteDetails: null,
      });
    }
  };

  return (
    <div className="bg-[#0B0B0D] text-gray-200">
      {/* ========================================================
          1. HERO SECTION (FULL LOGO & METALLIC INDUSTRIAL THEME)
      ======================================================== */}
      <section id="hero" className="relative carbon-pattern border-b border-white/10 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headlines & Action Buttons (order-2 on mobile, order-1 on desktop) */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left order-2 lg:order-1">
              {/* Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 max-w-full">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-ping shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-[#F5E6B3] truncate">
                  Western Canada Hotshot Specialists
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
                Reliable Hotshot Transportation{' '}
                <span className="text-metallic-gold block sm:inline">
                  Across Western Canada
                </span>
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl">
                “{BUSINESS_INFO.heroDescription}”
              </p>

              {/* Service Areas quick tag */}
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Operating throughout <span className="text-white font-medium">Alberta</span>,{' '}
                <span className="text-white font-medium">Saskatchewan</span>,{' '}
                <span className="text-white font-medium">British Columbia</span>, and{' '}
                <span className="text-white font-medium">Manitoba</span> (including <span className="text-[#D4AF37] font-semibold">Winnipeg</span>).
              </p>

              {/* Action Buttons: Smooth Navigation to Sections */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/30 transition-all cursor-pointer min-h-[48px] active:scale-[0.98]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <a
                  href="#gallery"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#17171C] hover:bg-[#202026] text-white font-semibold text-sm sm:text-base border border-white/20 hover:border-[#D4AF37]/60 transition-all cursor-pointer min-h-[48px] active:scale-[0.98]"
                >
                  <span>View Our Fleet</span>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                </a>
              </div>

              {/* Direct Phone Dispatch Bar */}
              <div className="pt-2 sm:pt-4 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-300">
                <span className="text-gray-400">Urgent Load Dispatch:</span>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="inline-flex items-center gap-1.5 text-white font-bold hover:text-[#D4AF37] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-mono text-sm sm:text-base text-[#D4AF37]">{BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: OFFICIAL LOGO SHIELD (order-1 on mobile so it appears at START, order-2 on desktop) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 mb-2 lg:mb-0">
              <div className="relative w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[340px] lg:max-w-[380px] mx-auto">
                {/* Glow behind emblem */}
                <div className="absolute -inset-2 bg-[#D4AF37]/20 rounded-3xl blur-2xl opacity-70" />
                
                {/* Full Logo Card */}
                <div className="relative rounded-2xl bg-[#121216] border-2 border-[#D4AF37]/60 shadow-2xl p-3 sm:p-4">
                  {/* Image container displaying active hero equipment/logo */}
                  <div 
                    onClick={() => {
                      if (heroActiveImage === BUSINESS_INFO.logoUrl) {
                        setShowBrandModal(true);
                      } else {
                        const matched = FLEET_IMAGES.find((img) => img.url === heroActiveImage) || FLEET_IMAGES[1];
                        setLightboxImage(matched);
                      }
                    }}
                    className="relative rounded-xl overflow-hidden bg-black p-2 flex items-center justify-center cursor-pointer group"
                    title="Click to view full image in high resolution"
                  >
                    <img
                      src={heroActiveImage}
                      alt="Brothers Hotshot Services Pickup Truck & Equipment"
                      className="w-full h-auto max-h-[300px] sm:max-h-[360px] object-contain block mx-auto group-hover:scale-[1.01] transition-transform"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = heroActiveImage === BUSINESS_INFO.logoUrl ? BUSINESS_INFO.cloudinaryLogo : FLEET_IMAGES[1].cloudinaryUrl;
                      }}
                    />
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="p-1 rounded-full bg-black/80 text-[#D4AF37] border border-[#D4AF37]/50 flex items-center justify-center shadow">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/10 flex items-center justify-between text-[11px] sm:text-xs">
                    <div className="flex items-center gap-1.5 text-gray-300">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Red Deer Hub, AB</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#F5E6B3] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>24/7 Hotshot Dispatch</span>
                    </div>
                  </div>

                  {/* Hotshot Operations Highlights */}
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Pickup & Gooseneck Fleet</span>
                      </span>
                      <a
                        href="#gallery"
                        className="text-[10px] text-[#D4AF37] hover:underline font-semibold"
                      >
                        View All (5) →
                      </a>
                    </div>

                    {/* Fleet Flyer Thumbnails */}
                    <div className="grid grid-cols-6 gap-1.5 pt-0.5">
                      {/* Pickup & Gooseneck (Flagship) */}
                      <button
                        type="button"
                        onClick={() => setHeroActiveImage(FLEET_IMAGES[1].url)}
                        title="Pickup Truck & Gooseneck Trailer Setup"
                        className={`relative aspect-square rounded-lg overflow-hidden border transition-all group/thumb focus:outline-none bg-black cursor-pointer shadow-sm ${
                          heroActiveImage === FLEET_IMAGES[1].url
                            ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]'
                            : 'border-white/15 hover:border-[#D4AF37]/60'
                        }`}
                      >
                        <img
                          src={FLEET_IMAGES[1].url}
                          alt="Pickup Truck & Gooseneck"
                          className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = FLEET_IMAGES[1].cloudinaryUrl;
                          }}
                        />
                      </button>
                      {/* Official Flyer */}
                      <button
                        type="button"
                        onClick={() => setHeroActiveImage(BUSINESS_INFO.logoUrl)}
                        title="Official Transport Flyer"
                        className={`relative aspect-square rounded-lg overflow-hidden border transition-all group/thumb focus:outline-none bg-black cursor-pointer shadow-sm ${
                          heroActiveImage === BUSINESS_INFO.logoUrl
                            ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]'
                            : 'border-white/15 hover:border-[#D4AF37]/60'
                        }`}
                      >
                        <img
                          src={BUSINESS_INFO.logoUrl}
                          alt="Brothers Hotshot Official Setup"
                          className="w-full h-full object-contain group-hover/thumb:scale-110 transition-transform"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = BUSINESS_INFO.cloudinaryLogo;
                          }}
                        />
                      </button>
                      {/* Other fleet images */}
                      {[FLEET_IMAGES[0], FLEET_IMAGES[2], FLEET_IMAGES[3], FLEET_IMAGES[4]].map((img) => (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setHeroActiveImage(img.url)}
                          title={img.title}
                          className={`relative aspect-square rounded-lg overflow-hidden border transition-all group/thumb focus:outline-none bg-black cursor-pointer shadow-sm ${
                            heroActiveImage === img.url
                              ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]'
                              : 'border-white/15 hover:border-[#D4AF37]/60'
                          }`}
                        >
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = img.cloudinaryUrl;
                            }}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] text-gray-300">
                      <div className="p-2 rounded-lg bg-black/50 border border-white/5 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>Equipment Hauling</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/50 border border-white/5 flex items-center gap-1.5">
                        <Zap className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>Urgent Deliveries</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/50 border border-white/5 flex items-center gap-1.5">
                        <Compass className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>Long-Distance Loads</span>
                      </div>
                      <div className="p-2 rounded-lg bg-black/50 border border-white/5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37] shrink-0" />
                        <span>Point-to-Point Direct</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          CAPABILITIES BAR
      ======================================================== */}
      <section className="bg-[#121216] border-b border-white/10 py-5 sm:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] md:bg-transparent">
              <p className="text-metallic-gold text-base sm:text-xl font-bold tracking-tight">Direct Routing</p>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1">Point-to-point without depot handling</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] md:bg-transparent md:border-l md:border-white/10">
              <p className="text-metallic-gold text-base sm:text-xl font-bold tracking-tight">Western Canada</p>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1">AB, SK, BC, MB & Winnipeg</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] md:bg-transparent md:border-l md:border-white/10">
              <p className="text-metallic-gold text-base sm:text-xl font-bold tracking-tight">Secure Rigging</p>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1">Compliant strapping, chaining & tarping</p>
            </div>
            <div className="p-3 sm:p-4 rounded-xl bg-white/[0.02] md:bg-transparent md:border-l md:border-white/10">
              <p className="text-metallic-gold text-base sm:text-xl font-bold tracking-tight">On-Time Dispatch</p>
              <p className="text-[11px] sm:text-xs text-gray-400 mt-1">Committed to reliable scheduling</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          DELIVERY SERVICES SECTION ("Flexible Solutions for Every Load")
      ======================================================== */}
      <DeliveryServicesSection
        onSelectService={(serviceTitle) => {
          setQuoteData((prev) => ({ ...prev, loadType: serviceTitle }));
        }}
      />

      {/* ========================================================
          2. ABOUT SECTION
      ======================================================== */}
      <section id="about" className="py-14 sm:py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Headquarters Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 sm:p-8 rounded-2xl bg-[#14141A] border border-[#D4AF37]/50 shadow-xl space-y-4">
                <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#D4AF37] font-semibold">Central Logistics Operations</span>
                  <h3 className="text-2xl font-black text-white mt-1">Red Deer Headquarters</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {BUSINESS_INFO.address.full}
                </p>
                <div className="pt-2 border-t border-white/10 space-y-2 text-xs text-gray-400">
                  <p>• Strategic mid-point between Calgary & Edmonton (QEII corridor)</p>
                  <p>• Fast access to Northern Alberta energy corridors & Southern industrial zones</p>
                  <p>• Direct connections east to Saskatchewan & west to British Columbia</p>
                </div>
                <div className="pt-2">
                  <a
                    href="#quote"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-xs tracking-wide shadow-md"
                  >
                    <span>Request Transportation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                About Brothers Hotshot Services
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {BUSINESS_INFO.aboutHeadline}
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed">
                {BUSINESS_INFO.description}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-[#141418] border border-white/5 space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Reliable Transportation</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Dedicated hotshot units ready to move critical equipment, parts, materials, and urgent loads directly from origin to destination without intermediate depot delays.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141418] border border-white/5 space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Safe Handling & Load Securement</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Compliant rigging, chaining, strapping, and weight balancing strictly adherence to Canadian transport safety regulations and provincial requirements.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#141418] border border-white/5 space-y-1">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#D4AF37]" />
                    <span>Urgent Deliveries & On-Time Service</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Focused on prompt dispatch coordination, proactive communication, and steady progress until your shipment is safely delivered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SERVICES SECTION (FEATURING HOTSHOT DELIVERY SERVICES)
      ======================================================== */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 border-b border-white/10 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Specialized Freight Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Hotshot & Transportation Services
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              Dedicated freight solutions designed for speed, safety, and reliability across Western Canada.
            </p>
          </div>

          {/* Services Grid (7 Premium Metallic Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Truck;
              const isFlagship = service.id === 'hotshot-delivery';
              return (
                <div
                  key={service.id}
                  className={`rounded-2xl bg-[#131317] border ${
                    isFlagship ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-xl shadow-[#D4AF37]/10' : 'border-white/10'
                  } p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-[#D4AF37]/60 transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className="space-y-4">
                    {/* Header with Icon Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-black/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-md">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#F5E6B3]">
                        {service.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#D4AF37] font-medium mt-0.5">
                        {service.tag}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-1.5 pt-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Key Features:</p>
                      <ul className="space-y-1 text-xs text-gray-300">
                        {service.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-[#D4AF37] font-bold">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 text-xs text-gray-300">
                      <strong className="text-[#D4AF37]">Typical Cargo: </strong>
                      <span>{service.idealFor}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <a
                      href="#quote"
                      onClick={() => setQuoteData((prev) => ({ ...prev, loadType: service.title }))}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-xs tracking-wide shadow-md hover:shadow-[#D4AF37]/20 transition-all min-h-[40px]"
                    >
                      <span>Quote This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-xs text-gray-500 font-mono">0{index + 1}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. OFFICIAL FLEET & TRANSPORT SECTION (#fleet / #gallery)
      ======================================================== */}
      <section id="gallery" className="py-16 sm:py-20 lg:py-24 border-b border-white/10 bg-[#0B0B0D] relative overflow-hidden">
        {/* Anchor for direct #fleet navigation */}
        <div id="fleet" className="absolute -top-20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-14">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              <span>Heavy-Duty Equipment & Verified Dispatch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Hotshot Fleet & Equipment Setup
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              Heavy-duty pickup trucks paired with versatile gooseneck flatbed trailers for agile, dedicated point-to-point hauling throughout Alberta, British Columbia, Saskatchewan, and Manitoba (including Winnipeg).
            </p>
          </div>

          {/* Top Showcase: Prominent Setup Image & Thumbnails + Verified Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left 7 Columns: Prominent Pickup Truck & Trailer Image + Thumbnails Arrangement */}
            <div className="lg:col-span-7 space-y-4">
              {/* Prominent Image Showcase Card */}
              <div className="rounded-2xl bg-[#121216] border-2 border-[#D4AF37]/60 p-3 sm:p-4 shadow-2xl space-y-3">
                {/* Header over Image */}
                <div className="flex items-center justify-between text-xs">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5E6B3] font-bold">
                    <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Featured Fleet Setup</span>
                  </span>
                  <span className="font-mono text-[#D4AF37] font-semibold text-[11px] sm:text-xs">
                    {activeFleetItem.badge}
                  </span>
                </div>

                {/* Main Prominent Image Viewport */}
                <div
                  onClick={() => setLightboxImage(activeFleetItem)}
                  className="relative rounded-xl overflow-hidden bg-black p-2 flex items-center justify-center cursor-pointer group aspect-[16/10] sm:aspect-[16/9] border border-white/10"
                  title="Click to expand high-resolution view"
                >
                  <img
                    src={activeFleetItem.url}
                    alt={activeFleetItem.title}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = activeFleetItem.cloudinaryUrl;
                    }}
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3 sm:p-4 pointer-events-none">
                    <span className="text-xs text-white font-medium truncate max-w-[75%]">
                      {activeFleetItem.title}
                    </span>
                    <span className="px-3 py-1.5 rounded-lg bg-black/90 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold flex items-center gap-1.5 shadow-lg">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Enlarge</span>
                    </span>
                  </div>
                </div>

                {/* Active Item Details */}
                <div className="pt-2 px-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {activeFleetItem.title}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {activeFleetItem.category}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {activeFleetItem.description}
                  </p>
                </div>

                {/* Improved Fleet Thumbnails Arrangement */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Select Equipment View ({FLEET_IMAGES.length + 1} Available)</span>
                    </span>
                    <span className="text-[11px] text-gray-400 hidden sm:inline">
                      Click thumbnail to inspect setup
                    </span>
                  </div>

                  {/* Clean responsive thumbnails bar with gold highlight rings */}
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                    {/* Pickup & Gooseneck (Primary) */}
                    {FLEET_IMAGES.map((img) => {
                      const isActive = activeFleetItem.id === img.id;
                      return (
                        <button
                          key={img.id}
                          type="button"
                          onClick={() => setActiveFleetItem(img)}
                          className={`relative aspect-square rounded-xl overflow-hidden p-1 bg-black transition-all cursor-pointer text-left group focus:outline-none ${
                            isActive
                              ? 'ring-2 ring-[#D4AF37] border-2 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.4)] scale-[1.02]'
                              : 'border border-white/15 hover:border-[#D4AF37]/60 opacity-75 hover:opacity-100'
                          }`}
                          title={img.title}
                        >
                          <img
                            src={img.url}
                            alt={img.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = img.cloudinaryUrl;
                            }}
                          />
                          {isActive && (
                            <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-[#D4AF37]" />
                          )}
                        </button>
                      );
                    })}

                    {/* Official Flyer Thumbnail */}
                    <button
                      type="button"
                      onClick={() => setShowBrandModal(true)}
                      className="relative aspect-square rounded-xl overflow-hidden p-1 bg-black border border-white/15 hover:border-[#D4AF37]/60 opacity-75 hover:opacity-100 transition-all cursor-pointer group focus:outline-none"
                      title="View Official Transport Setup Flyer"
                    >
                      <img
                        src={BUSINESS_INFO.logoUrl}
                        alt="Official Transport Setup Flyer"
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = BUSINESS_INFO.cloudinaryLogo;
                        }}
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-black/85 text-[9px] text-[#D4AF37] text-center font-bold py-0.5 truncate">
                        Flyer
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Verified Business Location & Verified Contact Information */}
            <div className="lg:col-span-5 space-y-4">
              {/* Card 1: Verified Location Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#16161C] to-[#0F0F13] border border-white/15 hover:border-[#D4AF37]/50 p-5 sm:p-6 shadow-xl space-y-4 transition-all">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Verified Business Location</span>
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                    Operational Dispatch Hub
                  </p>
                  <h4 className="text-lg sm:text-xl font-black text-white mt-0.5">
                    Brothers Hotshot Services HQ
                  </h4>
                  <p className="text-sm font-bold text-metallic-gold mt-1.5">
                    {BUSINESS_INFO.address.full}
                  </p>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Centrally positioned in Red Deer, Alberta along the QEII corridor midway between Calgary and Edmonton. Instant highway access for non-stop transport east to Saskatchewan, west to British Columbia, and east to Winnipeg, Manitoba.
                  </p>
                </div>

                <div className="pt-1">
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white hover:text-[#D4AF37] font-semibold text-xs transition-all min-h-[42px]"
                  >
                    <span>View Address on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </a>
                </div>
              </div>

              {/* Card 2: Verified Contact Information Card */}
              <div className="rounded-2xl bg-gradient-to-br from-[#16161C] via-[#131317] to-[#0F0F13] border-2 border-[#D4AF37]/50 p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#F5E6B3] text-xs font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>24/7 Dispatch Coordination</span>
                  </span>
                </div>

                <div>
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider font-mono">
                    Verified Direct Dispatch Phone
                  </p>
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="text-2xl sm:text-3xl font-black text-white hover:text-[#D4AF37] transition-colors block mt-1 tracking-tight font-mono"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                  <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-gray-400">Direct Email:</span>
                    <a
                      href={BUSINESS_INFO.emailMailto}
                      className="text-gray-200 hover:text-[#D4AF37] font-medium underline"
                    >
                      {BUSINESS_INFO.email}
                    </a>
                  </div>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Immediate direct-line connection with dispatchers for urgent quote turnaround, equipment mobilization, and live journey tracking.
                  </p>
                </div>

                <div className="pt-1 grid grid-cols-2 gap-2.5">
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs sm:text-sm shadow-md hover:shadow-[#D4AF37]/30 transition-all min-h-[44px]"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Dispatch</span>
                  </a>
                  <a
                    href="#quote"
                    className="inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white hover:text-[#D4AF37] font-semibold text-xs sm:text-sm transition-all min-h-[44px]"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Showcase: Relevant Service Categories in Compact Cards */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
                  Service Categories
                </span>
                <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
                  Hotshot Transportation Offerings
                </h3>
              </div>
              <a
                href="#services"
                className="text-xs text-[#D4AF37] hover:underline font-semibold flex items-center gap-1"
              >
                <span>Full Details</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {/* Card 1: Urgent Hotshot Delivery */}
              <div className="rounded-2xl bg-gradient-to-b from-[#16161C] to-[#101014] border border-white/10 hover:border-[#D4AF37]/60 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-black border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                      <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#F5E6B3]">
                      Priority Direct
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-metallic-gold transition-colors">
                      Urgent Hotshot Delivery
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Time-critical freight dispatched immediately with non-stop highway transit and zero terminal delays.
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300 pt-1 border-t border-white/5">
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Dedicated single-truck routing</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>24/7 driver mobilization</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Real-time ETA communication</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuoteData((prev) => ({ ...prev, loadType: 'Urgent Hotshot Delivery' }));
                    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-white/10 hover:border-[#D4AF37] text-xs font-bold transition-all min-h-[38px] cursor-pointer"
                >
                  <span>Select for Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Card 2: Equipment & Machinery Transport */}
              <div className="rounded-2xl bg-gradient-to-b from-[#16161C] to-[#101014] border border-white/10 hover:border-[#D4AF37]/60 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-black border border-gray-400/40 flex items-center justify-center text-gray-200">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      Gooseneck Ramps
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-metallic-gold transition-colors">
                      Equipment & Machinery
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Safe drive-on and crane loading for skid steers, mini-excavators, implements, and compact industrial tools.
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300 pt-1 border-t border-white/5">
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Low-angle beavertail ramps</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Grade-70 transport chains</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Site & lease direct access</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuoteData((prev) => ({ ...prev, loadType: 'Equipment & Machinery Hauling' }));
                    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-white/10 hover:border-[#D4AF37] text-xs font-bold transition-all min-h-[38px] cursor-pointer"
                >
                  <span>Select for Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Card 3: Materials & Supplies Delivery */}
              <div className="rounded-2xl bg-gradient-to-b from-[#16161C] to-[#101014] border border-white/10 hover:border-[#D4AF37]/60 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-black border border-gray-400/40 flex items-center justify-center text-gray-200">
                      <Layers className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      Flatdeck Deck
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-metallic-gold transition-colors">
                      Materials & Supplies
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Pipe bundles, structural steel, crated parts, building components, and pallets with weather tarp protection.
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300 pt-1 border-t border-white/5">
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>360° crane & forklift access</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Heavy 4-inch ratchet straps</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Fitted weather tarps available</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuoteData((prev) => ({ ...prev, loadType: 'Industrial Materials & Critical Cargo' }));
                    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-white/10 hover:border-[#D4AF37] text-xs font-bold transition-all min-h-[38px] cursor-pointer"
                >
                  <span>Select for Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Card 4: Western Canada Interprovincial Corridors */}
              <div className="rounded-2xl bg-gradient-to-b from-[#16161C] to-[#101014] border border-white/10 hover:border-[#D4AF37]/60 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4 group">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-black border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37]">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#F5E6B3]">
                      AB • BC • SK • MB
                    </span>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-metallic-gold transition-colors">
                      Interprovincial Corridors
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Cross-border highway transit connecting Alberta, BC, Saskatchewan, and Manitoba (including regular Winnipeg runs).
                    </p>
                  </div>
                  <ul className="space-y-1.5 text-xs text-gray-300 pt-1 border-t border-white/5">
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Direct Trans-Canada routing</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Dedicated single-carrier custody</span>
                    </li>
                    <li className="flex items-center gap-1.5 text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span>Frequent Winnipeg service</span>
                    </li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuoteData((prev) => ({ ...prev, loadType: 'Long-Distance & Regional Delivery' }));
                    document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/5 hover:bg-[#D4AF37] text-gray-300 hover:text-black border border-white/10 hover:border-[#D4AF37] text-xs font-bold transition-all min-h-[38px] cursor-pointer"
                >
                  <span>Select for Quote</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SERVICE AREAS SECTION
      ======================================================== */}
      <section id="service-areas" className="py-16 sm:py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Geographic Coverage
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Our Service Areas
            </h2>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
              Brothers Hotshot Services operates throughout Alberta, Saskatchewan, British Columbia, and Manitoba, including Winnipeg.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICE_AREAS.map((area) => (
              <div
                key={area.id}
                className={`rounded-2xl bg-[#121216] border ${
                  area.isHomeBase ? 'border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/30' : 'border-white/10'
                } p-6 space-y-4 hover:border-[#D4AF37]/60 transition-all flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                      {area.badge}
                    </span>
                    {area.isHomeBase && (
                      <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Red Deer HQ
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-black text-white">
                    {area.name}
                  </h3>
                  <p className="text-xs text-[#D4AF37] font-semibold">
                    {area.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {area.description}
                  </p>

                  <div className="pt-2 text-xs space-y-1">
                    <p className="font-bold text-gray-300">Key Hubs:</p>
                    <div className="flex flex-wrap gap-1">
                      {area.keyHubs.map((h, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-black/40 border border-white/5 text-gray-300 text-[11px]">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <a
                    href="#quote"
                    onClick={() => setQuoteData((prev) => ({ ...prev, pickupLocation: `${area.name}, Canada` }))}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15 min-h-[40px]"
                  >
                    <span>Request Transport in {area.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  </a>
                </div>
              </div>
            ))}

            {/* Interprovincial Logistics Corridors Card */}
            <div className="rounded-2xl bg-[#121216] border border-white/10 hover:border-[#D4AF37]/60 p-6 sm:p-7 shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5" />
                    <span>Western Canada Network</span>
                  </span>
                  <span className="text-xs font-bold text-gray-400">4 Provinces</span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#F5E6B3] transition-colors">
                    Interprovincial Hotshot Corridors
                  </h4>
                  <p className="text-xs text-[#D4AF37] font-semibold mt-1">
                    Direct Highway Transit Linking AB, BC, SK & MB
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  Our hotshot pickup trucks and trailers run non-stop across Western Canadian highway systems to ensure your critical loads and machinery arrive safely on schedule without depot delays.
                </p>

                <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-2 text-xs">
                  <p className="text-white font-semibold flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Key Transit Routes:</span>
                  </p>
                  <ul className="space-y-1 text-gray-400 text-[11px]">
                    <li>• Trans-Canada Hwy 1 (Vancouver • Calgary • Regina • Winnipeg)</li>
                    <li>• Yellowhead Hwy 16 (Edmonton • Lloydminster • Saskatoon)</li>
                    <li>• QEII Hwy 2 (Edmonton • Red Deer • Calgary Corridor)</li>
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href="#quote"
                  onClick={() => setQuoteData((prev) => ({ ...prev, loadType: 'Long-Distance Transportation' }))}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-gold-gradient text-white hover:text-[#0B0B0D] font-bold text-xs border border-white/10 hover:border-transparent transition-all min-h-[40px]"
                >
                  <span>Request Interprovincial Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Direct Dispatch Card */}
            <div className="rounded-2xl bg-gradient-to-br from-[#1C1C24] to-[#121216] border border-[#D4AF37]/50 p-6 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#D4AF37]/20 text-[#F5E6B3]">
                  Immediate Transport
                </span>
                <h3 className="text-2xl font-black text-white">
                  Need an Urgent Load Dispatched?
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Call our Red Deer central dispatch directly for immediate quote rates and vehicle mobilization across Western Canada.
                </p>
              </div>

              <div className="space-y-2.5">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-sm tracking-wide shadow-md min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#0B0B0D]" />
                  <span>Call {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. CAREERS — DRIVER APPLICATION FORM
      ======================================================== */}
      <section id="careers" className="py-16 sm:py-20 lg:py-24 border-b border-white/10 bg-[#0e0e12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Careers & Driving Opportunities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Join the Brothers Hotshot Services Team
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              We are expanding our professional hotshot driver network. Submit your application and upload your resume directly online.
            </p>
          </div>

          {careerSuccess ? (
            <div className="rounded-2xl bg-[#131317] border border-[#D4AF37]/50 p-6 sm:p-10 shadow-2xl text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10 text-emerald-400" />
              </div>

              <div className="space-y-2 max-w-lg mx-auto">
                <span className="px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                  Application Submitted Online
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Thank You, {submittedCareerData?.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Your driver application for <strong>{submittedCareerData?.position}</strong> along with your resume (<span className="text-[#D4AF37] font-mono">{submittedCareerData?.resumeFileName}</span>) has been successfully transmitted directly to our recruitment team in Red Deer, AB.
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 sm:p-5 rounded-xl bg-black/60 border border-white/10 text-left text-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Position Applied:</span>
                  <span className="font-bold text-white">{submittedCareerData?.position}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Experience / License:</span>
                  <span className="font-semibold text-gray-200">
                    {submittedCareerData?.experienceYears} • {submittedCareerData?.licenseClass}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Applicant Location:</span>
                  <span className="font-semibold text-gray-200">{submittedCareerData?.cityProvince}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-gray-400">Confirmation Contact:</span>
                  <span className="font-semibold text-gray-200">
                    {submittedCareerData?.phone} • {submittedCareerData?.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Sent To Dispatch:</span>
                  <span className="font-mono text-[#D4AF37] font-semibold">{BUSINESS_INFO.email}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs sm:text-sm shadow-xl min-h-[46px]"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Recruitment: {BUSINESS_INFO.phone}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setCareerSuccess(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm min-h-[46px] cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Submit Another Application</span>
                </button>
                {submittedCareerData && (
                  <button
                    type="button"
                    onClick={() => {
                      const formatted = formatDriverApplication(submittedCareerData, resumeFile);
                      openEmailAppOrWebmail(BUSINESS_INFO.email, formatted.subject, formatted.plainText);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-xs sm:text-sm min-h-[46px] cursor-pointer"
                    title="Open a copy in Gmail Web or your email app"
                  >
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <span>Open in Gmail / Email App</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Direct Webform notice box */}
              <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#17171F] border border-[#D4AF37]/40 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-white text-sm sm:text-base">Direct Webform Application</p>
                  <p className="text-gray-300 leading-relaxed">
                    Submit your driving qualifications and upload your resume directly to our central dispatch and recruitment operations in Red Deer, AB. We promptly review all applications.
                  </p>
                </div>
              </div>

              {careerSubmitError && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs space-y-2">
                  <p className="font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Online Submission Issue: {careerSubmitError}</span>
                  </p>
                </div>
              )}

              {/* Careers Form */}
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl">
                <form onSubmit={handleCareerSubmit} className="space-y-8" noValidate>
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white border-b border-white/10 pb-2">
                  1. Personal Information <span className="text-xs font-normal text-gray-400">(* Required)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      value={careerData.fullName}
                      onChange={handleCareerChange}
                      placeholder="e.g. John MacDonald"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        careerErrors.fullName ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                    />
                    {careerErrors.fullName && <p className="text-xs text-red-400">{careerErrors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={careerData.email}
                      onChange={handleCareerChange}
                      placeholder="name@example.com"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        careerErrors.email ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                    />
                    {careerErrors.email && <p className="text-xs text-red-400">{careerErrors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={careerData.phone}
                      onChange={handleCareerChange}
                      placeholder="e.g. 587-000-0000"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        careerErrors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                    />
                    {careerErrors.phone && <p className="text-xs text-red-400">{careerErrors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">City and Province *</label>
                    <input
                      type="text"
                      name="cityProvince"
                      value={careerData.cityProvince}
                      onChange={handleCareerChange}
                      placeholder="e.g. Red Deer, AB"
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        careerErrors.cityProvince ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                    />
                    {careerErrors.cityProvince && <p className="text-xs text-red-400">{careerErrors.cityProvince}</p>}
                  </div>
                </div>
              </div>

              {/* Driving Qualifications */}
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white border-b border-white/10 pb-2">
                  2. Driving Qualifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Position Applying For</label>
                    <select
                      name="position"
                      value={careerData.position}
                      onChange={handleCareerChange}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none"
                    >
                      <option value="Hotshot Driver (Class 1)">Hotshot Driver (Class 1)</option>
                      <option value="Hotshot Driver (Class 3 / Air Brake)">Hotshot Driver (Class 3 / Air Brake)</option>
                      <option value="Hotshot Driver (Class 5 with Q Endorsement)">Hotshot Driver (Class 5 with Q Endorsement)</option>
                      <option value="Owner Operator - Hotshot Unit">Owner Operator - Hotshot Unit</option>
                      <option value="Regional Expedited Courier Driver">Regional Expedited Courier Driver</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Years of Driving Experience</label>
                    <select
                      name="experienceYears"
                      value={careerData.experienceYears}
                      onChange={handleCareerChange}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none"
                    >
                      <option value="1-2 years">1 - 2 years</option>
                      <option value="3-5 years">3 - 5 years</option>
                      <option value="5-10 years">5 - 10 years</option>
                      <option value="10+ years">10+ years</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Driver's License Class</label>
                    <select
                      name="licenseClass"
                      value={careerData.licenseClass}
                      onChange={handleCareerChange}
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none"
                    >
                      <option value="Class 1 Commercial">Class 1 Commercial</option>
                      <option value="Class 2 Commercial">Class 2 Commercial</option>
                      <option value="Class 3 Commercial">Class 3 Heavy Commercial Truck</option>
                      <option value="Class 5 GDL / Standard">Class 5 (Standard Driver)</option>
                      <option value="Class 5 with Q Endorsement">Class 5 with Air Brake (Q)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-300 block">Valid Driver's License? *</label>
                    <div className="flex gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasValidLicense"
                          value="Yes"
                          checked={careerData.hasValidLicense === 'Yes'}
                          onChange={handleCareerChange}
                          className="accent-[#D4AF37] w-5 h-5"
                        />
                        <span className="text-white text-sm">Yes</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasValidLicense"
                          value="No"
                          checked={careerData.hasValidLicense === 'No'}
                          onChange={handleCareerChange}
                          className="accent-[#D4AF37] w-5 h-5"
                        />
                        <span className="text-gray-400 text-sm">No</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Previous Transportation Experience (optional)</label>
                  <textarea
                    name="transportExperience"
                    rows={3}
                    value={careerData.transportExperience}
                    onChange={handleCareerChange}
                    placeholder="Describe past flatbed, gooseneck, or hotshot experience..."
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none"
                  />
                </div>
              </div>

              {/* Resume Upload (Required) */}
              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-white border-b border-white/10 pb-2">
                  3. Resume Upload <span className="text-xs font-normal text-[#D4AF37]">(* Required file)</span>
                </h3>

                <div className={`relative border-2 border-dashed ${
                  careerErrors.resume || resumeError ? 'border-red-500 bg-red-950/10' : resumeFile ? 'border-[#D4AF37] bg-[#D4AF37]/5' : 'border-white/20 bg-black/40'
                } rounded-2xl p-5 text-center cursor-pointer`}>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {resumeFile ? (
                    <div className="space-y-1">
                      <FileText className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p className="text-sm font-bold text-white break-all">{resumeFile.name}</p>
                      <p className="text-xs text-[#D4AF37] font-mono">{(resumeFile.size / 1024).toFixed(1)} KB • Tap to replace</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-8 h-8 text-[#D4AF37] mx-auto" />
                      <p className="text-sm font-semibold text-white">Tap to upload your resume (PDF, DOC, DOCX)</p>
                      <p className="text-xs text-gray-400">Max size: 10 MB</p>
                    </div>
                  )}
                </div>
                {(careerErrors.resume || resumeError) && (
                  <p className="text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" /> {resumeError || careerErrors.resume}
                  </p>
                )}
              </div>

              {/* Consent & Submit */}
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={careerData.consent}
                    onChange={handleCareerChange}
                    className="mt-1 accent-[#D4AF37] w-5 h-5 rounded shrink-0"
                  />
                  <span className="text-xs text-gray-300 leading-relaxed">
                    I certify that the information provided in this driver application is accurate and complete to the best of my knowledge.
                  </span>
                </label>
                {careerErrors.consent && <p className="text-xs text-red-400">{careerErrors.consent}</p>}

                <button
                  type="submit"
                  disabled={isCareerSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer min-h-[50px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isCareerSubmitting ? (
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

      {/* ========================================================
          6. GET A QUOTE SECTION
      ======================================================== */}
      <section id="quote" className="py-16 sm:py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Instant Dispatch Rate Requests
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Get a Transportation Quote
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Tell us your pickup, delivery, and cargo specifications. We will promptly prepare your rate estimate.
            </p>
          </div>

          <div className="rounded-2xl bg-[#131317] border border-white/10 p-5 sm:p-8 lg:p-10 shadow-2xl">
            {quoteSuccess ? (
              <div className="py-6 sm:py-10 px-2 sm:px-6 text-center space-y-6 animate-fadeIn">
                <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                </div>

                <div className="space-y-2 max-w-xl mx-auto">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Inquiry Submitted Online</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Quote Request Submitted Successfully!
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    Thank you, <strong className="text-white">{submittedQuoteData?.customerName}</strong>. Your freight inquiry has been submitted directly to Brothers Hotshot Services dispatch.
                  </p>
                </div>

                {/* Summary Ticket */}
                <div className="max-w-xl mx-auto rounded-2xl bg-black/70 border border-white/15 p-5 text-left text-xs sm:text-sm space-y-3 shadow-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-[#D4AF37]" />
                      <span>Load Type</span>
                    </span>
                    <span className="font-bold text-[#D4AF37] text-right">{submittedQuoteData?.loadType}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span>Origin & Destination</span>
                    </span>
                    <span className="font-bold text-white text-right">
                      {submittedQuoteData?.pickupLocation} → {submittedQuoteData?.deliveryLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>Preferred Pickup</span>
                    </span>
                    <span className="font-semibold text-gray-200">
                      {submittedQuoteData?.pickupDate || 'Earliest Available'}
                    </span>
                  </div>
                  {submittedQuoteData?.dimensionsWeight && (
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <span className="text-gray-400">Dimensions & Weight:</span>
                      <span className="font-semibold text-gray-200">
                        {submittedQuoteData.dimensionsWeight}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                    <span className="text-gray-400">Confirmation Contact:</span>
                    <span className="font-semibold text-gray-200">
                      {submittedQuoteData?.phone} • {submittedQuoteData?.email}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                    <span className="text-gray-400">Dispatched To:</span>
                    <span className="font-mono text-[#D4AF37] font-semibold">{BUSINESS_INFO.email}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                  Our dispatchers in Red Deer, AB are reviewing your specifications and will follow up promptly with your rate quote.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs sm:text-sm shadow-xl min-h-[46px]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Urgent Dispatch: {BUSINESS_INFO.phone}</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setQuoteSuccess(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs sm:text-sm min-h-[46px] cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Submit Another Request</span>
                  </button>
                  {submittedQuoteData && (
                    <button
                      type="button"
                      onClick={() => {
                        const formatted = formatQuoteInquiry(submittedQuoteData);
                        openEmailAppOrWebmail(BUSINESS_INFO.email, formatted.subject, formatted.plainText);
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-xs sm:text-sm min-h-[46px] cursor-pointer"
                      title="Open a copy in Gmail Web or your email app"
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                      <span>Open in Gmail / Email App</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Customer Name *</label>
                  <input
                    type="text"
                    name="customerName"
                    value={quoteData.customerName}
                    onChange={handleQuoteChange}
                    placeholder="Your Name or Company"
                    className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                      quoteErrors.customerName ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                    } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                  />
                  {quoteErrors.customerName && <p className="text-xs text-red-400">{quoteErrors.customerName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={quoteData.email}
                    onChange={handleQuoteChange}
                    placeholder="name@company.com"
                    className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                      quoteErrors.email ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                    } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                  />
                  {quoteErrors.email && <p className="text-xs text-red-400">{quoteErrors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={quoteData.phone}
                    onChange={handleQuoteChange}
                    placeholder="e.g. 587-377-0880"
                    className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                      quoteErrors.phone ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                    } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                  />
                  {quoteErrors.phone && <p className="text-xs text-red-400">{quoteErrors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Pickup Location (City / Yard) *</label>
                  <input
                    type="text"
                    name="pickupLocation"
                    value={quoteData.pickupLocation}
                    onChange={handleQuoteChange}
                    placeholder="e.g. Red Deer, AB or Calgary"
                    className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                      quoteErrors.pickupLocation ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                    } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                  />
                  {quoteErrors.pickupLocation && <p className="text-xs text-red-400">{quoteErrors.pickupLocation}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Delivery Location (City / Province) *</label>
                  <input
                    type="text"
                    name="deliveryLocation"
                    value={quoteData.deliveryLocation}
                    onChange={handleQuoteChange}
                    placeholder="e.g. Winnipeg, MB or Saskatoon"
                    className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                      quoteErrors.deliveryLocation ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                    } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                  />
                  {quoteErrors.deliveryLocation && <p className="text-xs text-red-400">{quoteErrors.deliveryLocation}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Load Type</label>
                  <select
                    name="loadType"
                    value={quoteData.loadType}
                    onChange={handleQuoteChange}
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none"
                  >
                    <option value="Urgent Hotshot Delivery">Urgent Hotshot Delivery</option>
                    <option value="Same-Day Delivery">Same-Day Delivery</option>
                    <option value="Overnight Delivery">Overnight Delivery</option>
                    <option value="Next-Day Delivery">Next-Day Delivery</option>
                    <option value="Expedited Freight Delivery">Expedited Freight Delivery</option>
                    <option value="Small & Medium Package Delivery">Small & Medium Package Delivery</option>
                    <option value="Flat-Deck & Heavy Load Delivery">Flat-Deck & Heavy Load Delivery</option>
                    <option value="Emergency Delivery Service">Emergency Delivery Service</option>
                    <option value="Scheduled Delivery">Scheduled Delivery</option>
                    <option value="Equipment and Materials Transport">Equipment and Materials Transport</option>
                    <option value="Parts and Supplies Delivery">Parts and Supplies Delivery</option>
                    <option value="Long-Distance Delivery">Long-Distance Delivery</option>
                    <option value="Point-to-Point Transport">Point-to-Point Transport</option>
                    <option value="Hotshot Delivery Services">Hotshot Delivery Services</option>
                    <option value="Equipment Transportation">Equipment Transportation</option>
                    <option value="Parts Delivery">Parts Delivery</option>
                    <option value="Material Transportation">Material Transportation</option>
                    <option value="Urgent Load Transportation">Urgent Load Transportation</option>
                    <option value="Other Commercial Cargo">Other Commercial Cargo</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300 block">Preferred Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={quoteData.pickupDate}
                    onChange={handleQuoteChange}
                    className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">Dimensions & Approximate Weight (optional)</label>
                <input
                  type="text"
                  name="dimensionsWeight"
                  value={quoteData.dimensionsWeight}
                  onChange={handleQuoteChange}
                  placeholder="e.g. 18 ft length, 4,500 lbs, skid-mounted"
                  className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300 block">Additional Details & Handling Instructions</label>
                <textarea
                  name="additionalDetails"
                  rows={3}
                  value={quoteData.additionalDetails}
                  onChange={handleQuoteChange}
                  placeholder="Special instructions, tarping needed, loading assistance..."
                  className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none"
                />
              </div>

              {/* Error Banner if any */}
              {quoteSubmitError && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs sm:text-sm space-y-2">
                  <p className="font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>Online submission issue: {quoteSubmitError}</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <a
                      href={BUSINESS_INFO.phoneTel}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 text-white font-bold text-xs hover:bg-red-500/30"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Call Dispatch: {BUSINESS_INFO.phone}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const formatted = formatQuoteInquiry(quoteData);
                        setModalState({
                          isOpen: true,
                          title: 'Open Email Client Backup',
                          subject: formatted.subject,
                          body: formatted.plainText,
                          htmlBody: formatted.html,
                          mailtoUrl: formatted.mailtoUrl,
                          selectedFile: null,
                          isJobApplication: false,
                          quoteDetails: quoteData,
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-semibold text-xs hover:bg-white/15 cursor-pointer"
                    >
                      <span>Open Email Client Backup</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-gray-400">
                <p className="flex items-center gap-1.5 text-gray-300 font-semibold mb-1">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Direct Webform Submission</span>
                </p>
                Your quote inquiry is securely transmitted directly to our central dispatch operations in Red Deer, AB. We immediately review your cargo and route specifications.
              </div>

              <button
                type="submit"
                disabled={isQuoteSubmitting}
                className="w-full py-4 px-6 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer min-h-[50px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isQuoteSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#0B0B0D]" />
                    <span>Submitting Quote Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 text-[#0B0B0D]" />
                    <span>Submit Quote Request Online</span>
                  </>
                )}
              </button>
            </form>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. CONTACT SECTION
      ======================================================== */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#0e0e12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 sm:space-y-4 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Get in Touch
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-black text-white tracking-tight">
              Contact Brothers Hotshot Services
            </h2>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Have a question, urgent shipment, or scheduled transportation inquiry? Connect with our team directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Details & Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-5 sm:p-7 space-y-4">
                <h3 className="text-xl font-bold text-white">Direct Dispatch Details</h3>

                <div className="space-y-3.5">
                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Phone (Click to Call)</p>
                      <a href={BUSINESS_INFO.phoneTel} className="text-base font-mono font-bold text-white hover:text-[#D4AF37]">
                        {BUSINESS_INFO.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <Send className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-400 font-semibold uppercase">Email (Click to Email)</p>
                      <a href={BUSINESS_INFO.emailMailto} className="text-xs sm:text-sm font-semibold text-white hover:text-[#D4AF37] break-all block">
                        {BUSINESS_INFO.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">Head Office Address</p>
                      <p className="text-xs sm:text-sm text-white leading-relaxed">{BUSINESS_INFO.address.full}</p>
                      <a
                        href={BUSINESS_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#D4AF37] hover:underline mt-1 font-semibold"
                      >
                        <span>Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="rounded-2xl bg-[#131317] border border-white/10 overflow-hidden shadow-xl w-full">
                <div className="p-3 bg-[#17171E] border-b border-white/10 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" /> Red Deer Operations
                  </span>
                  <a href={BUSINESS_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">
                    View Map
                  </a>
                </div>
                <div className="h-52 w-full bg-black/80">
                  <iframe
                    title="Location Map"
                    src="https://maps.google.com/maps?q=5401%2048%20Ave,%20Red%20Deer,%20AB%20T4N%203V3,%20Canada&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-5 sm:p-8 shadow-2xl">
                {contactSuccess ? (
                  <div className="py-6 sm:py-8 text-center space-y-5 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="space-y-1.5 max-w-md mx-auto">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                        Message Sent Online
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Thank You, {submittedContactData?.name}!
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        Your message regarding <strong>{submittedContactData?.subject}</strong> has been transmitted directly to dispatch at <strong className="text-[#D4AF37] font-mono">{BUSINESS_INFO.email}</strong>. We will reply promptly.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={BUSINESS_INFO.phoneTel}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs shadow-md"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Dispatch: {BUSINESS_INFO.phone}</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => setContactSuccess(false)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs cursor-pointer min-h-[42px]"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send Another Message</span>
                      </button>
                      {submittedContactData && (
                        <button
                          type="button"
                          onClick={() => {
                            const formatted = formatContactInquiry(submittedContactData);
                            openEmailAppOrWebmail(BUSINESS_INFO.email, formatted.subject, formatted.plainText);
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-xs cursor-pointer min-h-[42px]"
                          title="Open a copy in Gmail Web or your email app"
                        >
                          <Mail className="w-4 h-4 text-[#D4AF37]" />
                          <span>Open in Gmail / Email App</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold text-white mb-1">Send Us a Direct Message</h3>
                    <p className="text-xs text-gray-400 mb-6">Submitted directly to Brothers Hotshot Services dispatch.</p>

                    {contactSubmitError && (
                      <div className="mb-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs space-y-1.5">
                        <p className="font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span>Online submission issue: {contactSubmitError}</span>
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleContactSubmit} className="space-y-4" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-300 block">Your Name *</label>
                          <input
                            type="text"
                            name="name"
                            disabled={isContactSubmitting}
                            value={contactData.name}
                            onChange={handleContactChange}
                            placeholder="e.g. David Miller"
                            className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                              contactErrors.name ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                            } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                          />
                          {contactErrors.name && <p className="text-xs text-red-400">{contactErrors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-300 block">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            disabled={isContactSubmitting}
                            value={contactData.email}
                            onChange={handleContactChange}
                            placeholder="name@company.com"
                            className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                              contactErrors.email ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                            } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                          />
                          {contactErrors.email && <p className="text-xs text-red-400">{contactErrors.email}</p>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-300 block">Phone Number (optional)</label>
                          <input
                            type="tel"
                            name="phone"
                            disabled={isContactSubmitting}
                            value={contactData.phone}
                            onChange={handleContactChange}
                            placeholder="e.g. 587-000-0000"
                            className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-semibold text-gray-300 block">Subject</label>
                          <select
                            name="subject"
                            disabled={isContactSubmitting}
                            value={contactData.subject}
                            onChange={handleContactChange}
                            className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none"
                          >
                            <option value="Transportation Inquiry">Transportation Inquiry</option>
                            <option value="Hotshot Delivery Service Request">Hotshot Delivery Service Request</option>
                            <option value="Urgent Dispatch Request">Urgent Dispatch Request</option>
                            <option value="General Question">General Question</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-gray-300 block">Message *</label>
                        <textarea
                          name="message"
                          rows={4}
                          disabled={isContactSubmitting}
                          value={contactData.message}
                          onChange={handleContactChange}
                          placeholder="How can Brothers Hotshot Services assist your freight needs?..."
                          className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                            contactErrors.message ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                          } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none`}
                        />
                        {contactErrors.message && <p className="text-xs text-red-400">{contactErrors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isContactSubmitting}
                        className="w-full py-4 px-6 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer min-h-[50px] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isContactSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin text-[#0B0B0D]" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 text-[#0B0B0D]" />
                            <span>Send Message Online</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Email Client Modal */}
      <EmailClientModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        recipient={BUSINESS_INFO.email}
        subject={modalState.subject}
        body={modalState.body}
        htmlBody={modalState.htmlBody}
        mailtoUrl={modalState.mailtoUrl}
        selectedFile={modalState.selectedFile}
        isJobApplication={modalState.isJobApplication}
        quoteDetails={modalState.quoteDetails}
      />

      {/* Official Brothers Hotshot Flyer Modal */}
      {showBrandModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="flyer-modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowBrandModal(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overscroll-contain"
        >
          <div className="relative w-full max-w-3xl max-h-[95vh] bg-[#121216] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col overscroll-contain">
            {/* Top Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between bg-[#17171C]">
              <div className="min-w-0 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                <h3 id="flyer-modal-title" className="text-white text-xs sm:text-sm font-bold tracking-wide truncate">
                  Brothers Hotshot Services • Official Transport Flyer
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowBrandModal(false)}
                aria-label="Close flyer preview"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            {/* Main Image Preview Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-auto p-2 sm:p-4 min-h-[300px]">
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Brothers Hotshot Services Official Flyer"
                className="max-h-[75vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl select-none"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = BUSINESS_INFO.cloudinaryLogo;
                }}
              />
            </div>

            {/* Bottom Bar Details & CTAs */}
            <div className="p-3 sm:p-4 bg-[#17171C] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-xs text-gray-400">
                Hotshot pickup & trailer transport across Western Canada
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white hover:text-[#D4AF37] text-xs font-semibold min-h-[38px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call: {BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href="#quote"
                  onClick={() => setShowBrandModal(false)}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-[#0B0B0D] text-xs font-extrabold shadow-md min-h-[38px]"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fleet Image Fullscreen Lightbox Modal */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxImage(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/90 backdrop-blur-md animate-fadeIn overscroll-contain"
        >
          <div className="relative w-full max-w-4xl max-h-[95vh] bg-[#121216] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col overscroll-contain">
            {/* Top Bar */}
            <div className="px-4 sm:px-6 py-3 border-b border-white/10 flex items-center justify-between bg-[#17171C]">
              <div className="min-w-0 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                <h3 id="lightbox-title" className="text-white text-xs sm:text-sm font-bold tracking-wide truncate">
                  {lightboxImage.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage(null)}
                aria-label="Close photo preview"
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0 ml-2"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>

            {/* Main Image Preview Area */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden p-2 sm:p-4 min-h-[300px]">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="max-h-[75vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl select-none"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = lightboxImage.cloudinaryUrl;
                }}
              />

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currIdx = FLEET_IMAGES.findIndex((f) => f.id === lightboxImage.id);
                  const prevIdx = (currIdx - 1 + FLEET_IMAGES.length) % FLEET_IMAGES.length;
                  setLightboxImage(FLEET_IMAGES[prevIdx]);
                }}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#D4AF37] text-white transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const currIdx = FLEET_IMAGES.findIndex((f) => f.id === lightboxImage.id);
                  const nextIdx = (currIdx + 1) % FLEET_IMAGES.length;
                  setLightboxImage(FLEET_IMAGES[nextIdx]);
                }}
                aria-label="Next photo"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-[#D4AF37] text-white transition-all cursor-pointer shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom Bar Details & CTAs */}
            <div className="p-3 sm:p-4 bg-[#17171C] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30">
                  {lightboxImage.badge}
                </span>
                <span className="text-xs text-gray-400">
                  {FLEET_IMAGES.findIndex((f) => f.id === lightboxImage.id) + 1} of {FLEET_IMAGES.length}
                </span>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white hover:text-[#D4AF37] text-xs font-semibold min-h-[38px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call: {BUSINESS_INFO.phone}</span>
                </a>
                <a
                  href="#quote"
                  onClick={() => {
                    setQuoteData((prev) => ({ ...prev, loadType: lightboxImage.title }));
                    setLightboxImage(null);
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-[#0B0B0D] text-xs font-extrabold shadow-md min-h-[38px]"
                >
                  <span>Quote This Setup</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
