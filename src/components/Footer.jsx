import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';
import { SERVICES } from '../data/servicesData';
import { SERVICE_AREAS } from '../data/serviceAreasData';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="bg-[#0B0B0D] border-t border-white/10 text-gray-300 relative overflow-hidden">
      {/* Metallic top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-80" />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
          {/* Brand & Business Overview (col 4) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-[#D4AF37]/50 shadow-md shrink-0 bg-black">
                <img
                  src={BUSINESS_INFO.logoUrl}
                  alt="Brothers Hotshot Services Logo"
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = BUSINESS_INFO.cloudinaryLogo;
                  }}
                />
              </div>
              <div>
                <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  BROTHERS HOTSHOT
                </h3>
                <p className="text-[10px] sm:text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Services • Western Canada
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              {BUSINESS_INFO.description}
            </p>

            <div className="pt-1">
              <Link
                to="/quote"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-[#D4AF37]/30 transition-all cursor-pointer min-h-[44px]"
              >
                <span>Request Transportation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick Links (col 2) */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Services</span>
                </Link>
              </li>
              <li>
                <Link to="/service-areas" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Service Areas</span>
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Careers</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/quote" className="text-gray-400 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 py-0.5">
                  <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Get a Quote</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services (col 3) */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              Transportation Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/services"
                    className="text-gray-400 hover:text-[#D4AF37] transition-colors block py-0.5 leading-relaxed"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Location Info (col 3) */}
          <div className="sm:col-span-2 lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-white font-bold text-xs sm:text-sm tracking-wider uppercase border-b border-white/10 pb-2">
              Headquarters & Contact
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Head Office</p>
                  <a
                    href={BUSINESS_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors text-xs leading-relaxed block"
                  >
                    {BUSINESS_INFO.address.full}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Direct Phone</p>
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="text-[#F5E6B3] hover:text-[#D4AF37] font-mono text-sm block"
                  >
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-white font-medium">Email Dispatch</p>
                  <a
                    href={BUSINESS_INFO.emailMailto}
                    className="text-gray-400 hover:text-[#D4AF37] text-xs break-all block"
                  >
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>

              <div className="pt-1">
                <p className="text-xs text-gray-400 font-medium">Service Corridors:</p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {SERVICE_AREAS.map((area) => (
                    <Link
                      key={area.id}
                      to="/service-areas"
                      className="px-2 py-0.5 rounded text-[11px] bg-white/5 border border-white/10 text-gray-300 hover:border-[#D4AF37]/50 hover:text-white transition-all"
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-gray-500">
          <p>© {currentYear} {BUSINESS_INFO.name}. All rights reserved.</p>
          <p className="text-center md:text-right text-[11px] sm:text-xs">
            Reliable Hotshot Delivery throughout Alberta, Saskatchewan, British Columbia, Manitoba & Winnipeg.
          </p>
        </div>
      </div>
    </footer>
  );
}
