import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Send, 
  Loader2, 
  Calendar, 
  Truck, 
  RotateCcw,
  Mail 
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import EmailClientModal from '../components/EmailClientModal';
import { formatQuoteInquiry } from '../utils/emailFormatters';
import { submitQuoteForm } from '../services/formSubmissionService';

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const prefillService = searchParams.get('service') || '';
  const prefillOrigin = searchParams.get('origin') || '';
  const prefillLoadType = searchParams.get('loadType') || '';

  const initialLoadType = prefillLoadType || (prefillService
    ? prefillService
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Urgent Hotshot Delivery');

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    pickupLocation: prefillOrigin ? `${prefillOrigin}, Canada` : '',
    deliveryLocation: '',
    loadType: initialLoadType,
    pickupDate: '',
    dimensionsWeight: '',
    additionalDetails: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitError, setSubmitError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preparedEmail, setPreparedEmail] = useState({
    subject: '',
    body: '',
    htmlBody: '',
    mailtoUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (submitError) setSubmitError('');
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.customerName.trim()) newErrors.customerName = 'Customer Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.deliveryLocation.trim()) newErrors.deliveryLocation = 'Delivery location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    // Submit directly as a real webform via AJAX
    const res = await submitQuoteForm(formData);

    setIsSubmitting(false);

    const formatted = formatQuoteInquiry(formData);
    setPreparedEmail({
      subject: formatted.subject,
      body: formatted.plainText,
      htmlBody: formatted.html,
      mailtoUrl: formatted.mailtoUrl,
    });

    if (res.success) {
      setSubmittedData({ ...formData, needsActivation: res.needsActivation });
      setSubmitSuccess(true);
      setFormData({
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
      // Scroll to form header area
      window.scrollTo({ top: 220, behavior: 'smooth' });
    } else {
      setSubmitError(res.error || 'Failed to submit quote inquiry. Please try again or call dispatch.');
    }
  };

  return (
    <div className="bg-[#0B0B0D] text-gray-200 overflow-x-hidden">
      {/* Header */}
      <section className="relative py-12 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Fast Rate Inquiries
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Request a Hotshot Transportation Quote
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Complete the details below to prepare your transportation quote inquiry. Our dispatch team will review your specifications and reply promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Form & Info Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Form Column (Col 8) */}
            <div className="lg:col-span-8">
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-4 sm:p-8 lg:p-10 shadow-2xl">
                {submitSuccess ? (
                  <div className="py-6 sm:py-10 px-2 sm:px-6 text-center space-y-6 animate-fadeIn">
                    <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_35px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                    </div>

                    <div className="space-y-2 max-w-xl mx-auto">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Inquiry Submitted Online</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Quote Request Submitted Successfully!
                      </h2>
                      <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        Thank you, <strong className="text-white">{submittedData?.customerName}</strong>. Your freight inquiry has been submitted directly to the Brothers Hotshot Services dispatch team.
                      </p>
                    </div>

                    {/* Summary Ticket */}
                    <div className="max-w-xl mx-auto rounded-2xl bg-black/70 border border-white/15 p-5 text-left text-xs sm:text-sm space-y-3 shadow-xl">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-[#D4AF37]" />
                          <span>Load Type</span>
                        </span>
                        <span className="font-bold text-[#D4AF37] text-right">{submittedData?.loadType}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-[#D4AF37]" />
                          <span>Origin & Destination</span>
                        </span>
                        <span className="font-bold text-white text-right">
                          {submittedData?.pickupLocation} → {submittedData?.deliveryLocation}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                        <span className="text-gray-400 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-[#D4AF37]" />
                          <span>Preferred Pickup</span>
                        </span>
                        <span className="font-semibold text-gray-200">
                          {submittedData?.pickupDate || 'Earliest Available'}
                        </span>
                      </div>
                      {submittedData?.dimensionsWeight && (
                        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                          <span className="text-gray-400">Dimensions & Weight:</span>
                          <span className="font-semibold text-gray-200">
                            {submittedData.dimensionsWeight}
                          </span>
                        </div>
                      )}
                      <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                        <span className="text-gray-400">Confirmation Contact:</span>
                        <span className="font-semibold text-gray-200">
                          {submittedData?.phone} • {submittedData?.email}
                        </span>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/10 pt-2.5">
                        <span className="text-gray-400">Dispatched To:</span>
                        <span className="font-mono text-[#D4AF37] font-semibold">
                          {BUSINESS_INFO.email}
                        </span>
                      </div>
                    </div>

                    {submittedData?.needsActivation && (
                      <div className="max-w-xl mx-auto p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs text-left space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          <span>Action Required on {BUSINESS_INFO.email}:</span>
                        </p>
                        <p className="text-amber-200/90 leading-relaxed">
                          FormSubmit has sent a 1-time activation email to <strong>{BUSINESS_INFO.email}</strong>. Please check your inbox (or Spam folder) and click <em>"Activate Form"</em> to permanently enable direct email delivery.
                        </p>
                      </div>
                    )}

                    <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
                      Our dispatch team in Red Deer, AB will review your route specifications and follow up promptly with your rate quote.
                    </p>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <a
                        href={BUSINESS_INFO.phoneTel}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs sm:text-sm shadow-xl min-h-[46px]"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Urgent Dispatch: {BUSINESS_INFO.phone}</span>
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
                        <span>Submit Another Request</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8" noValidate>
                  {/* Contact Information */}
                  <div className="space-y-4 sm:space-y-5">
                    <h2 className="text-base sm:text-lg font-bold text-white border-b border-white/10 pb-2">
                      1. Contact Information
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Customer Name <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          placeholder="Your Name or Company"
                          className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                            errors.customerName ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                          } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                        />
                        {errors.customerName && (
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.customerName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Email Address <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@company.com"
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

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Phone Number <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="e.g. 587-377-0880"
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
                    </div>
                  </div>

                  {/* Route & Cargo */}
                  <div className="space-y-4 sm:space-y-5">
                    <h2 className="text-base sm:text-lg font-bold text-white border-b border-white/10 pb-2">
                      2. Shipment & Route Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Pickup Location (City / Yard) <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          placeholder="e.g. Red Deer, AB or Edmonton Yard"
                          className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                            errors.pickupLocation ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                          } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                        />
                        {errors.pickupLocation && (
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.pickupLocation}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Delivery Location (City / Province) <span className="text-[#D4AF37]">*</span>
                        </label>
                        <input
                          type="text"
                          name="deliveryLocation"
                          value={formData.deliveryLocation}
                          onChange={handleChange}
                          placeholder="e.g. Saskatoon, SK or Winnipeg, MB"
                          className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                            errors.deliveryLocation ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                          } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                        />
                        {errors.deliveryLocation && (
                          <p className="text-xs text-red-400 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" /> {errors.deliveryLocation}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Load Type
                        </label>
                        <select
                          name="loadType"
                          value={formData.loadType}
                          onChange={handleChange}
                          className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none transition-colors"
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

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-300 block">
                          Preferred Pickup Date
                        </label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Dimensions & Approximate Weight (optional)
                      </label>
                      <input
                        type="text"
                        name="dimensionsWeight"
                        value={formData.dimensionsWeight}
                        onChange={handleChange}
                        placeholder="e.g. 18 ft length, 4,500 lbs, skid-mounted"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Additional Details */}
                  <div className="space-y-2.5">
                    <h2 className="text-base sm:text-lg font-bold text-white border-b border-white/10 pb-2">
                      3. Additional Details
                    </h2>
                    <textarea
                      name="additionalDetails"
                      rows={4}
                      value={formData.additionalDetails}
                      onChange={handleChange}
                      placeholder="Specify special handling instructions, tarping requirements, loading equipment available (forklift/crane), site contact, or timeline constraints..."
                      className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Error Banner if any */}
                  {submitError && (
                    <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs sm:text-sm space-y-2">
                      <p className="font-bold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>Online submission issue: {submitError}</span>
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
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-white font-semibold text-xs hover:bg-white/15 cursor-pointer"
                        >
                          <span>Open Email Client Backup</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Submission Notice & Submit */}
                  <div className="pt-2 space-y-4">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-gray-400">
                      <p className="flex items-center gap-1.5 text-gray-300 font-semibold mb-1">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                        <span>Direct Webform Submission</span>
                      </p>
                      Your quote inquiry is submitted directly to our central dispatch operations in Red Deer, AB. We immediately review your cargo and route specifications to provide competitive rates.
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 sm:px-8 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[50px] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
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
                  </div>
                </form>
                )}
              </div>
            </div>

            {/* Side Info Column (Col 4) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Urgent Dispatch Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1B1B22] to-[#141418] border border-[#D4AF37]/50 shadow-xl space-y-4">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs uppercase tracking-wider">
                  <Clock className="w-4 h-4" />
                  <span>Immediate Dispatch Needed?</span>
                </div>
                <h3 className="text-xl font-black text-white">
                  Call Our Dispatch Directly
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  For immediate hotshot dispatch, urgent load pickups, or time-sensitive operational outages, call our phone line directly:
                </p>
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-mono text-base font-bold border border-white/20 transition-all min-h-[48px] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

              {/* Coverage list */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#131317] border border-white/10 space-y-3.5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#D4AF37]" />
                  <span>Regions Serviced</span>
                </h3>
                <ul className="space-y-2 text-xs text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Alberta (Red Deer, Calgary, Edmonton & beyond)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Saskatchewan (Regina, Saskatoon & corridors)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>British Columbia (Lower Mainland, Interior, Peace)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>Manitoba (Interprovincial long-distance transport)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>City of Winnipeg (Key logistics terminus)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <EmailClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ready to Send Quote Inquiry"
        recipient={BUSINESS_INFO.email}
        subject={preparedEmail.subject}
        body={preparedEmail.body}
        htmlBody={preparedEmail.htmlBody}
        mailtoUrl={preparedEmail.mailtoUrl}
        selectedFile={null}
        isJobApplication={false}
        quoteDetails={formData}
      />
    </div>
  );
}
