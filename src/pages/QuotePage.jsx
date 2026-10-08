import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Info
} from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import EmailClientModal from '../components/EmailClientModal';

export default function QuotePage() {
  const [searchParams] = useSearchParams();
  const prefillService = searchParams.get('service') || '';
  const prefillOrigin = searchParams.get('origin') || '';

  const initialLoadType = prefillService
    ? prefillService
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : 'Equipment Transportation';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preparedEmail, setPreparedEmail] = useState({
    subject: '',
    body: '',
    mailtoUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = `Transportation Quote Request: ${formData.loadType} - ${formData.customerName.trim()}`;

    const bodyText = `TRANSPORTATION QUOTE INQUIRY
===========================================
BROTHERS HOTSHOT SERVICES
Red Deer, AB | Phone: ${BUSINESS_INFO.phone}

CUSTOMER CONTACT:
• Customer Name: ${formData.customerName.trim()}
• Email: ${formData.email.trim()}
• Phone: ${formData.phone.trim()}

SHIPMENT DETAILS:
• Load Type: ${formData.loadType}
• Pickup Location: ${formData.pickupLocation.trim()}
• Delivery Location: ${formData.deliveryLocation.trim()}
• Preferred Pickup Date: ${formData.pickupDate || 'Earliest Available'}
• Dimensions & Weight: ${formData.dimensionsWeight ? formData.dimensionsWeight.trim() : 'N/A'}

ADDITIONAL DETAILS / INSTRUCTIONS:
${formData.additionalDetails ? formData.additionalDetails.trim() : 'N/A'}

===========================================
Requested via Brothers Hotshot Services Online Quote Form.`;

    const mailto = `mailto:${BUSINESS_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyText)}`;

    setPreparedEmail({
      subject,
      body: bodyText,
      mailtoUrl: mailto,
    });

    setIsModalOpen(true);

    try {
      window.location.href = mailto;
    } catch (err) {
      console.log('Mailto triggered', err);
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
                          placeholder="e.g. 587-377-2452"
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
                          <option value="Hotshot Delivery Services">Hotshot Delivery Services</option>
                          <option value="Equipment Transportation">Equipment Transportation</option>
                          <option value="Parts Delivery">Parts Delivery</option>
                          <option value="Material Transportation">Material Transportation</option>
                          <option value="Urgent Load Transportation">Urgent Load Transportation</option>
                          <option value="Local Transportation">Local Transportation</option>
                          <option value="Long-Distance Transportation">Long-Distance Transportation</option>
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

                  {/* Submission Notice & Submit */}
                  <div className="pt-2 space-y-4">
                    <div className="p-3.5 sm:p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-gray-400">
                      <p className="flex items-center gap-1.5 text-gray-300 font-semibold mb-1">
                        <Info className="w-4 h-4 text-[#D4AF37]" />
                        <span>Email Submission Workflow</span>
                      </p>
                      Submitting this form prepares a formatted quote inquiry email addressed to{' '}
                      <span className="text-[#D4AF37] font-mono break-all">{BUSINESS_INFO.email}</span>. You will be prompted to send the email directly from your email application.
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 px-6 sm:px-8 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-xl hover:shadow-[#D4AF37]/20 transition-all cursor-pointer flex items-center justify-center gap-2 min-h-[48px] active:scale-[0.98]"
                    >
                      <span>Prepare Quote Inquiry Email</span>
                      <ArrowRight className="w-5 h-5 text-[#0B0B0D]" />
                    </button>
                  </div>
                </form>
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
        mailtoUrl={preparedEmail.mailtoUrl}
        isJobApplication={false}
      />
    </div>
  );
}
