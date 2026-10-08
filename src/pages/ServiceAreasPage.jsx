import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Navigation, ArrowRight } from 'lucide-react';
import { SERVICE_AREAS } from '../data/serviceAreasData';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function ServiceAreasPage() {
  return (
    <div className="bg-[#0B0B0D] text-gray-200 overflow-x-hidden">
      {/* Header */}
      <section className="relative py-12 sm:py-20 bg-[#121216] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-3 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
              Regional Coverage
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Service Areas Across Western Canada
            </h1>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Brothers Hotshot Services provides dependable hotshot transportation throughout Alberta, Saskatchewan, British Columbia, and Manitoba, including Winnipeg.
            </p>
          </div>
        </div>
      </section>

      {/* Western Canada Corridor Overview */}
      <section className="py-8 sm:py-12 bg-[#0e0e12] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="p-5 sm:p-8 rounded-2xl bg-[#14141A] border border-[#D4AF37]/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-xs sm:text-sm">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Central Operations Headquarters: Red Deer, Alberta</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 max-w-2xl leading-relaxed">
                Positioned midway along the crucial Calgary–Edmonton corridor, our Red Deer base provides optimal access to provincial energy centres, industrial supply yards, and all trans-provincial highways.
              </p>
            </div>
            <Link
              to="/quote"
              className="w-full md:w-auto text-center shrink-0 px-6 py-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-xs tracking-wide shadow-md min-h-[44px] flex items-center justify-center"
            >
              Request Transport
            </Link>
          </div>
        </div>
      </section>

      {/* Service Area Cards (No Placeholder Images) */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10 sm:space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {SERVICE_AREAS.map((area) => (
              <div
                key={area.id}
                className={`rounded-2xl bg-[#131318] border ${
                  area.isHomeBase ? 'border-[#D4AF37]/60 ring-1 ring-[#D4AF37]/40' : 'border-white/10'
                } p-6 sm:p-8 shadow-xl hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between group space-y-5`}
              >
                <div className="space-y-4">
                  {/* Badge & Title */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] flex items-center gap-1.5">
                      <Navigation className="w-3.5 h-3.5" />
                      <span>{area.badge}</span>
                    </span>

                    {area.isHomeBase && (
                      <span className="text-xs font-bold text-[#D4AF37] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" /> Red Deer HQ
                      </span>
                    )}
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {area.name}
                    </h2>
                    <p className="text-xs text-[#D4AF37] font-semibold mt-1">
                      {area.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {area.description}
                  </p>

                  {/* Key Hubs */}
                  <div className="space-y-1.5 pt-1">
                    <p className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-gray-400">
                      Primary Delivery Hubs & Towns:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {area.keyHubs.map((hub, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-xs text-gray-300"
                        >
                          {hub}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highway Corridors */}
                  <div className="space-y-1 text-xs">
                    <p className="font-bold uppercase tracking-wider text-gray-400">Major Corridors:</p>
                    <p className="text-gray-300">{area.primaryCorridors.join(' • ')}</p>
                  </div>

                  {/* Freight Specialty */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs">
                    <span className="text-[#D4AF37] font-semibold">Specialized Freight: </span>
                    <span className="text-gray-300">{area.specialty}</span>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    to={`/quote?origin=${area.name}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-xs tracking-wide shadow-md min-h-[40px]"
                  >
                    <span>Request Transport in {area.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="text-xs font-semibold text-gray-400 hover:text-white transition-colors py-1"
                  >
                    Call {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Transportation CTA Box */}
          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-[#17171F] via-[#121217] to-[#17171F] border border-[#D4AF37]/40 text-center space-y-5 sm:space-y-6">
            <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white">
              Need Transport Across Western Canada?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base leading-relaxed">
              Whether you need local delivery within Alberta or long-distance hauling across Saskatchewan, British Columbia, or Manitoba into Winnipeg, we are committed to getting your load where it needs to go, on time.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/quote"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gold-gradient text-[#0B0B0D] font-black text-sm tracking-wide shadow-xl cursor-pointer min-h-[48px] flex items-center justify-center"
              >
                Request Transportation Service
              </Link>
              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/20 min-h-[48px] flex items-center justify-center"
              >
                Call Dispatch: {BUSINESS_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
