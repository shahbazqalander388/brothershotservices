import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Truck
} from 'lucide-react';
import { BUSINESS_INFO, FLEET_IMAGES } from '../data/businessInfo';

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <div className="bg-[#0B0B0D] text-gray-200">
      {/* Page Header */}
      <section className="relative py-12 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              About Brothers Hotshot Services
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              {BUSINESS_INFO.aboutHeadline}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Committed to providing reliable hotshot delivery, safe cargo handling, and punctual transportation across Western Canada.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#121216] p-3 sm:p-4 max-w-sm mx-auto lg:max-w-none">
                <img
                  src={BUSINESS_INFO.logoUrl}
                  alt="Brothers Hotshot Services Official Badge"
                  className="w-full h-auto object-contain rounded-xl bg-black"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = BUSINESS_INFO.cloudinaryLogo;
                  }}
                />
              </div>

              {/* Location Badge */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#15151A] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#D4AF37] font-semibold text-xs sm:text-sm">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>Central Operations Hub</span>
                </div>
                <p className="text-white font-medium text-sm sm:text-base">
                  {BUSINESS_INFO.address.full}
                </p>
                <p className="text-xs text-gray-400">
                  Strategically situated in Red Deer, connecting Calgary, Edmonton, and all major interprovincial corridors.
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Who We Are & What We Stand For
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {BUSINESS_INFO.description}
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="p-4 sm:p-5 rounded-xl bg-[#141418] border border-white/5 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>Reliable Transportation</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    We specialize in dedicated freight hauling. When you book a hotshot unit with us, your payload is moved directly to its target site without being mixed, co-loaded, or transferred between multiple transit depots.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#141418] border border-white/5 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>Safe Handling & Load Securement</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    Every piece of equipment, crated component, or structural material is secured with heavy-duty chains, lever binders, or rated straps. We respect weight limits and safety standards across all Canadian provinces we operate in.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-[#141418] border border-white/5 space-y-1.5">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span>Urgent Deliveries & On-Time Service</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                    When operations face unforeseen shutdowns or emergency equipment shortages, every hour matters. We focus on prompt dispatch coordination, proactive communication, and steady progress until your shipment is safely delivered.
                  </p>
                </div>
              </div>

              <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/quote"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-sm tracking-wide shadow-md min-h-[48px] active:scale-[0.98]"
                >
                  <span>Request a Free Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 min-h-[48px] active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call Dispatch: {BUSINESS_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet & Capabilities Showcase */}
      <section className="py-14 sm:py-20 border-t border-white/10 bg-[#0E0E12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Fleet in Action
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white">
              Our Equipment & Transport Fleet
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Dedicated transport units, heavy haulers, and direct corridors across Western Canada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLEET_IMAGES.map((img) => (
              <div
                key={img.id}
                onClick={() => setSelectedImage(img)}
                className="group relative rounded-2xl bg-[#14141A] border border-white/10 hover:border-[#D4AF37] overflow-hidden shadow-xl transition-all cursor-pointer flex items-center justify-center"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-300"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = img.cloudinaryUrl;
                    }}
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="w-8 h-8 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] shadow-lg">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Western Canada Reach Banner */}
      <section className="py-12 sm:py-16 bg-[#111116] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto space-y-2.5 sm:space-y-3 mb-8 sm:mb-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Coverage Across Western Canada
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              We provide prompt, coordinated delivery to commercial and industrial destinations throughout:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 text-center">
            {BUSINESS_INFO.serviceAreas.map((area) => (
              <div
                key={area}
                className="p-4 sm:p-5 rounded-xl bg-[#17171E] border border-white/5 hover:border-[#D4AF37]/40 transition-colors"
              >
                <p className="font-bold text-white text-sm sm:text-base">{area}</p>
                <p className="text-[10px] sm:text-xs text-[#D4AF37] mt-1 font-mono uppercase">Active Corridor</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedImage(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fadeIn overscroll-contain"
        >
          <div className="relative w-full max-w-4xl max-h-[95vh] bg-[#121216] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col overscroll-contain">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-[#17171C]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide">Brothers Hotshot Services • Equipment Gallery</h3>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                aria-label="Close photo"
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative flex-1 bg-black flex items-center justify-center p-2 sm:p-4 min-h-[300px]">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[78vh] max-w-full object-contain mx-auto rounded-lg shadow-2xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = selectedImage.cloudinaryUrl;
                }}
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = FLEET_IMAGES.findIndex((f) => f.id === selectedImage.id);
                  const prev = (idx - 1 + FLEET_IMAGES.length) % FLEET_IMAGES.length;
                  setSelectedImage(FLEET_IMAGES[prev]);
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:border-[#D4AF37]"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = FLEET_IMAGES.findIndex((f) => f.id === selectedImage.id);
                  const next = (idx + 1) % FLEET_IMAGES.length;
                  setSelectedImage(FLEET_IMAGES[next]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 border border-white/20 text-white hover:border-[#D4AF37]"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="p-3 sm:p-4 bg-[#17171C] border-t border-white/10 flex items-center justify-between gap-3 text-xs sm:text-sm">
              <span className="text-xs text-gray-400 hidden sm:inline">Click arrows to browse photos</span>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <a
                  href={BUSINESS_INFO.phoneTel}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-white hover:text-[#D4AF37] font-semibold text-xs min-h-[38px]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call: {BUSINESS_INFO.phone}</span>
                </a>
                <Link
                  to="/quote"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs shadow-md min-h-[38px]"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
