import React, { useState } from 'react';
import { 
  Clock, 
  Moon, 
  CalendarCheck2, 
  Package, 
  Lightbulb, 
  CalendarDays,
  ArrowRight,
  Info,
  CheckCircle2,
  X,
  Phone
} from 'lucide-react';
import { DELIVERY_SERVICES } from '../data/servicesData';
import { BUSINESS_INFO } from '../data/businessInfo';

/* Custom SVG Icons matching the screenshot visual reference */

// 1. Urgent Hotshot Delivery: Delivery truck with motion speed streaks
function UrgentTruckIcon({ className = "w-12 h-12" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Speed trails */}
      <path d="M1.5 7h4" />
      <path d="M0.5 11h5.5" />
      <path d="M1.5 15h4" />
      {/* Truck cab & body */}
      <path d="M7 17H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v11" />
      <path d="M15 17h-6" />
      <path d="M15 9h3.5a1 1 0 0 1 .8.4l2.2 3.1a1 1 0 0 1 .2.6V16a1 1 0 0 1-1 1h-1" />
      <circle cx="8" cy="17.5" r="1.8" />
      <circle cx="17.5" cy="17.5" r="1.8" />
    </svg>
  );
}

// 5. Expedited Freight Delivery: Hand truck / dolly with cargo and speed lines
function ExpeditedFreightIcon({ className = "w-12 h-12" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Motion streaks */}
      <path d="M2 6h4" />
      <path d="M1 10h6" />
      {/* Hand truck frame */}
      <path d="M8 3v13a2 2 0 0 0 2 2h8" />
      <circle cx="18" cy="18" r="2" />
      {/* Stacked packages */}
      <rect x="10" y="8" width="8" height="6" rx="1" />
      <path d="M14 8v6" />
    </svg>
  );
}

// 7. Flat-Deck & Heavy Load Delivery: Heavy pickup cab pulling flatbed deck
function FlatDeckIcon({ className = "w-12 h-12" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.8" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      {/* Flatbed deck */}
      <line x1="1" y1="13" x2="14" y2="13" strokeWidth="2.2" />
      {/* Heavy cargo profile */}
      <rect x="3" y="8.5" width="8" height="4.5" rx="1" strokeDasharray="1.5 1.5" />
      {/* Truck cab */}
      <path d="M14 13h2.5l2.5 3v2h-2" />
      <path d="M14 9h2" />
      {/* Wheels */}
      <circle cx="4.5" cy="16.5" r="1.7" />
      <circle cx="8.5" cy="16.5" r="1.7" />
      <circle cx="17.5" cy="16.5" r="1.7" />
    </svg>
  );
}

const iconComponentMap = {
  UrgentTruck: UrgentTruckIcon,
  Clock: Clock,
  Moon: Moon,
  CalendarCheck2: CalendarCheck2,
  ExpeditedFreight: ExpeditedFreightIcon,
  Package: Package,
  FlatDeck: FlatDeckIcon,
  Lightbulb: Lightbulb,
  CalendarDays: CalendarDays,
};

export default function DeliveryServicesSection({ onSelectService }) {
  const [activeModalService, setActiveModalService] = useState(null);

  const handleSelectService = (serviceTitle) => {
    if (onSelectService) {
      onSelectService(serviceTitle);
    }
    // Smooth scroll to quote section
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
  };

  const handleViewFleetClick = (e) => {
    e.preventDefault();
    const elem = document.getElementById('fleet') || document.getElementById('gallery');
    if (elem) {
      const headerOffset = 90;
      const elementPosition = elem.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', '#fleet');
    }
  };

  // Top row (first 5 services) and Bottom row (remaining 4 services)
  const topRowServices = DELIVERY_SERVICES.slice(0, 5);
  const bottomRowServices = DELIVERY_SERVICES.slice(5, 9);

  const renderServiceCard = (service, isLastOdd = false) => {
    const IconComp = iconComponentMap[service.icon] || Clock;
    return (
      <div
        key={service.id}
        onClick={() => handleSelectService(service.title)}
        className={`group relative rounded-2xl bg-[#131318] hover:bg-[#181822] border border-white/10 hover:border-[#D4AF37]/80 p-3.5 sm:p-5 md:p-6 flex flex-col items-center text-center justify-between min-h-[180px] sm:min-h-[205px] md:min-h-[230px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D4AF37]/10 cursor-pointer ${
          isLastOdd ? 'col-span-2 sm:col-span-1 max-w-[220px] sm:max-w-none mx-auto w-full' : ''
        }`}
      >
        {/* Service Icon */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-black/60 border border-white/10 group-hover:border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] group-hover:text-[#F5E6B3] group-hover:scale-105 transition-all duration-300 shadow-lg shrink-0">
          <IconComp className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11" />
        </div>

        {/* Service Title & Tag */}
        <div className="mt-2.5 sm:mt-3 md:mt-4 space-y-0.5 sm:space-y-1 w-full flex-1 flex flex-col justify-center">
          <h3 className="text-xs sm:text-sm md:text-base font-extrabold text-white group-hover:text-[#F5E6B3] transition-colors leading-snug">
            {service.title}
          </h3>
          <p className="text-[10px] sm:text-[11px] text-gray-400 group-hover:text-[#D4AF37] font-medium transition-colors line-clamp-2">
            {service.tag}
          </p>
        </div>

        {/* Action pill on hover */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity hidden sm:block">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37]">
            <span>Book Load</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>

        {/* Info Modal Trigger */}
        <button
          type="button"
          title={`Details for ${service.title}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveModalService(service);
          }}
          className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white flex items-center justify-center text-xs transition-colors"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  };

  return (
    <section 
      id="delivery-services" 
      className="py-16 sm:py-24 bg-[#0B0B0E] border-b border-white/10 relative overflow-hidden"
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12 sm:space-y-16">
        
        {/* ========================================================
            SECTION HEADER (Matching Reference Screenshot)
        ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-3.5 sm:space-y-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Flexible Solutions for Every Load
          </h2>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            From small packages to heavy equipment, we offer a range of delivery services to meet your needs.
          </p>
        </div>

        {/* ========================================================
            ICONIC GRID
        ======================================================== */}
        {/* MOBILE & TABLET (< md): Single unbroken responsive grid for all 9 delivery services */}
        <div className="md:hidden grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
          {DELIVERY_SERVICES.map((service, index) =>
            renderServiceCard(service, index === DELIVERY_SERVICES.length - 1)
          )}
        </div>

        {/* DESKTOP (>= md): 2 rows (5 on top, 4 centered on bottom) matching reference design */}
        <div className="hidden md:block space-y-6 lg:space-y-8">
          {/* TOP ROW: 5 Services */}
          <div className="grid grid-cols-5 gap-6 lg:gap-8">
            {topRowServices.map((service) => renderServiceCard(service))}
          </div>

          {/* BOTTOM ROW: 4 Services (Centered on Desktop) */}
          <div className="grid grid-cols-4 max-w-5xl mx-auto gap-6 lg:gap-8">
            {bottomRowServices.map((service) => renderServiceCard(service))}
          </div>
        </div>

        {/* ========================================================
            CENTERED CTA: "View Our Fleet ->" (From Reference Screenshot)
        ======================================================== */}
        <div className="pt-4 sm:pt-6 text-center flex flex-col items-center justify-center gap-4">
          <a
            href="#fleet"
            onClick={handleViewFleetClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-2xl hover:shadow-[#D4AF37]/30 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer min-h-[48px]"
          >
            <span>View Our Fleet</span>
            <ArrowRight className="w-4 h-4 text-[#0B0B0D]" />
          </a>

          <p className="text-xs text-gray-400 flex items-center gap-2">
            <span>Operated from Central Red Deer, AB</span>
            <span>•</span>
            <a 
              href={BUSINESS_INFO.phoneTel} 
              className="text-[#D4AF37] hover:underline font-semibold"
            >
              24/7 Dispatch: {BUSINESS_INFO.phone}
            </a>
          </p>
        </div>

      </div>

      {/* ========================================================
          SERVICE DETAIL MODAL (When clicking info icon)
      ======================================================== */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="w-full max-w-lg rounded-2xl bg-[#14141A] border border-[#D4AF37]/50 p-6 sm:p-8 space-y-5 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37]">
                {activeModalService.badge}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {activeModalService.title}
              </h3>
              <p className="text-xs text-[#D4AF37] font-semibold">
                {activeModalService.tag}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {activeModalService.description}
            </p>

            <div className="space-y-2 pt-2 border-t border-white/10">
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Service Specifications:
              </p>
              {activeModalService.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-xs border border-white/15"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Dispatch</span>
              </a>
              <button
                type="button"
                onClick={() => {
                  handleSelectService(activeModalService.title);
                  setActiveModalService(null);
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-xs shadow-md"
              >
                <span>Request Quote for This Service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
