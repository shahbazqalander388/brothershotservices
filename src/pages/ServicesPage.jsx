import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  Cpu, 
  Wrench, 
  Layers, 
  Zap, 
  MapPin, 
  Compass, 
  ArrowRight, 
  CheckCircle, 
  Phone,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SERVICES } from '../data/servicesData';
import { BUSINESS_INFO, FLEET_IMAGES } from '../data/businessInfo';

const iconMap = {
  Truck: Truck,
  Cpu: Cpu,
  Wrench: Wrench,
  Layers: Layers,
  Zap: Zap,
  MapPin: MapPin,
  Compass: Compass,
};

export default function ServicesPage() {
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
      {/* Header */}
      <section className="relative py-12 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Transportation Offerings
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Our Freight & Hotshot Services
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Specialized hauling for equipment, parts, materials, and urgent loads throughout Alberta, Saskatchewan, British Columbia, and Manitoba, including Winnipeg.
            </p>
          </div>
        </div>
      </section>

      {/* Services List / Cards */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {SERVICES.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Truck;
              const isFlagship = service.id === 'hotshot-delivery';
              return (
                <div
                  key={service.id}
                  id={service.id}
                  className={`rounded-2xl bg-[#131317] border ${
                    isFlagship ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]/40 shadow-xl shadow-[#D4AF37]/10' : 'border-white/15'
                  } hover:border-[#D4AF37]/60 shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group p-6 sm:p-8 space-y-6`}
                >
                  <div className="space-y-4">
                    {/* Header badge & icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-black border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-lg">
                        <IconComponent className="w-7 h-7" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#F5E6B3]">
                          {service.badge}
                        </span>
                        <p className="text-[11px] text-gray-500 font-mono mt-1">Service 0{index + 1}</p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-white group-hover:text-metallic-gold transition-colors">
                        {service.title}
                      </h2>
                      <p className="text-xs text-[#D4AF37] font-semibold mt-0.5">
                        {service.tag}
                      </p>
                    </div>

                    <p className="text-sm text-gray-300 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-1">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Features:</p>
                      <ul className="space-y-1.5">
                        {service.highlights.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Ideal For */}
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 text-xs">
                      <span className="text-[#D4AF37] font-semibold">Typical Cargo: </span>
                      <span className="text-gray-300">{service.idealFor}</span>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <Link
                      to={`/quote?service=${service.id}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-xs tracking-wide shadow-md hover:shadow-[#D4AF37]/20 transition-all cursor-pointer min-h-[40px]"
                    >
                      <span>Quote This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={BUSINESS_INFO.phoneTel}
                      className="text-xs font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 py-1"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Dispatch: {BUSINESS_INFO.phone}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Fleet In Action Preview */}
          <div className="pt-8 border-t border-white/10 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">Fleet Capabilities</span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">Equipment & Transportation In Action</h3>
              <p className="text-xs sm:text-sm text-gray-400">Real units hauling machinery, industrial parts, and urgent payloads.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              {FLEET_IMAGES.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className="group relative rounded-xl bg-[#14141A] border border-white/10 hover:border-[#D4AF37] overflow-hidden shadow-lg transition-all cursor-pointer flex items-center justify-center"
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
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <span className="p-1 rounded-full bg-black/70 text-[#D4AF37] flex items-center justify-center shadow">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-r from-[#17171F] via-[#121217] to-[#17171F] border border-[#D4AF37]/30 text-center space-y-4 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white">
              Have a Specific Payload or Custom Transport Need?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed">
              We move equipment, parts, materials, and urgent loads throughout Alberta, Saskatchewan, British Columbia, and Manitoba. Get in touch with our team for dispatch coordination.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm tracking-wide shadow-lg min-h-[48px] flex items-center justify-center"
              >
                Request a Custom Quote
              </Link>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 min-h-[48px] flex items-center justify-center"
              >
                Call {BUSINESS_INFO.phone}
              </a>
            </div>
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
                  <span>Call {BUSINESS_INFO.phone}</span>
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
