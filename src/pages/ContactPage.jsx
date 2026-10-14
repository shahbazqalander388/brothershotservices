import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Loader2,
  RotateCcw
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import EmailClientModal from '../components/EmailClientModal';
import { formatContactInquiry, openEmailAppOrWebmail } from '../utils/emailFormatters';
import { submitContactForm } from '../services/formSubmissionService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Transportation Inquiry',
    message: '',
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
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError('');

    const res = await submitContactForm(formData);

    setIsSubmitting(false);

    const formatted = formatContactInquiry(formData);
    setPreparedEmail({
      subject: formatted.subject,
      body: formatted.plainText,
      htmlBody: formatted.html,
      mailtoUrl: formatted.mailtoUrl,
    });

    if (res.success) {
      setSubmittedData({
        ...formData,
        mailtoUrl: formatted.mailtoUrl,
      });
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'Transportation Inquiry',
        message: '',
      });
      window.scrollTo({ top: 200, behavior: 'smooth' });
    } else {
      setSubmitError(res.error || 'Failed to submit contact message.');
    }
  };

  return (
    <div className="bg-[#0B0B0D] text-gray-200 overflow-x-hidden">
      {/* Header */}
      <section className="relative py-12 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Get in Touch
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Contact Brothers Hotshot Services
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Have a question, urgent shipment, or scheduled transportation inquiry? Connect with our team directly.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Details & Map (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-4 sm:p-6 lg:p-8 space-y-5">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Direct Contact Information
                </h2>

                <div className="space-y-4">
                  {/* Phone */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Direct Phone</p>
                      <a
                        href={BUSINESS_INFO.phoneTel}
                        className="text-base sm:text-lg font-mono font-bold text-white hover:text-[#D4AF37] transition-colors"
                      >
                        {BUSINESS_INFO.phone}
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">Click to call our dispatch</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Inquiries</p>
                      <a
                        href={BUSINESS_INFO.emailMailto}
                        className="text-xs sm:text-sm font-semibold text-white hover:text-[#D4AF37] transition-colors break-all block"
                      >
                        {BUSINESS_INFO.email}
                      </a>
                      <p className="text-xs text-gray-400 mt-0.5">Click to email us directly</p>
                    </div>
                  </div>

                  {/* Physical Address */}
                  <div className="flex items-start gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Head Office Address</p>
                      <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                        {BUSINESS_INFO.address.full}
                      </p>
                      <a
                        href={BUSINESS_INFO.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:text-[#F5E6B3] font-semibold mt-1 transition-colors"
                      >
                        <span>Open in Google Maps</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Embedded Google Maps Container */}
              <div className="rounded-2xl bg-[#131317] border border-white/10 overflow-hidden shadow-xl w-full">
                <div className="p-3 sm:p-4 bg-[#17171E] border-b border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-gray-300 flex items-center gap-2 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="truncate">Red Deer, AB Headquarters</span>
                  </span>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#D4AF37] hover:underline shrink-0"
                  >
                    View Map
                  </a>
                </div>
                <div className="h-56 sm:h-64 w-full bg-black/80">
                  <iframe
                    title="Brothers Hotshot Services Location"
                    src="https://maps.google.com/maps?q=5401%2048%20Ave,%20Red%20Deer,%20AB%20T4N%203V3,%20Canada&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form (Col 7) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-[#131317] border border-white/10 p-4 sm:p-8 lg:p-10 shadow-2xl">
                {submitSuccess ? (
                  <div className="py-6 sm:py-10 text-center space-y-5 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <div className="space-y-1.5 max-w-md mx-auto">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider">
                        Message Sent Online
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Thank You, {submittedData?.name}!
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        Your message regarding <strong>{submittedData?.subject}</strong> has been transmitted directly to dispatch at <strong className="text-[#D4AF37] font-mono">{BUSINESS_INFO.email}</strong>. We will reply promptly.
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
                        onClick={() => setSubmitSuccess(false)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold text-xs min-h-[42px] cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Send Another Message</span>
                      </button>
                      {submittedData && (
                        <button
                          type="button"
                          onClick={() => {
                            const formatted = formatContactInquiry(submittedData);
                            openEmailAppOrWebmail(BUSINESS_INFO.email, formatted.subject, formatted.plainText);
                          }}
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white font-medium text-xs min-h-[42px] cursor-pointer"
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
                    <div className="mb-6 space-y-1">
                      <h2 className="text-xl sm:text-2xl font-black text-white">
                        Send Us a Message
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-400">
                        Submit directly to our dispatch operations. We respond promptly.
                      </p>
                    </div>

                    {submitError && (
                      <div className="mb-4 p-3.5 rounded-xl bg-red-950/40 border border-red-500/50 text-red-200 text-xs space-y-1.5">
                        <p className="font-bold flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                          <span>Online submission issue: {submitError}</span>
                        </p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Your Name <span className="text-[#D4AF37]">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. David Miller"
                        className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                          errors.name ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                        } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
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
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. 587-000-0000"
                        className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300 block">
                        Inquiry Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border border-white/15 focus:border-[#D4AF37] text-white text-base sm:text-sm focus:outline-none transition-colors"
                      >
                        <option value="Transportation Inquiry">Transportation Inquiry</option>
                        <option value="Urgent Dispatch Request">Urgent Dispatch Request</option>
                        <option value="Equipment Hauling Question">Equipment Hauling Question</option>
                        <option value="General Question">General Question</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300 block">
                      Message <span className="text-[#D4AF37]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can Brothers Hotshot Services assist your freight needs?..."
                      className={`w-full px-3.5 sm:px-4 py-3 rounded-xl bg-black/60 border ${
                        errors.message ? 'border-red-500' : 'border-white/15 focus:border-[#D4AF37]'
                      } text-white placeholder-gray-500 text-base sm:text-sm focus:outline-none transition-colors`}
                    />
                    {errors.message && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 sm:px-8 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
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
                    <p className="text-xs text-center text-gray-400">
                      Direct web transmission to dispatch at <strong className="text-gray-300">{BUSINESS_INFO.email}</strong>.
                    </p>
                  </div>
                </form>
              </>
            )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      <EmailClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ready to Send Message"
        recipient={BUSINESS_INFO.email}
        subject={preparedEmail.subject}
        body={preparedEmail.body}
        htmlBody={preparedEmail.htmlBody}
        mailtoUrl={preparedEmail.mailtoUrl}
        isJobApplication={false}
      />
    </div>
  );
}
