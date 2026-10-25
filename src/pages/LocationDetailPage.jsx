import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  Layers, 
  HelpCircle,
  Compass
} from 'lucide-react';
import { LOCATIONS_DATA } from '../data/locationsData';
import { BUSINESS_INFO, FLEET_IMAGES } from '../data/businessInfo';
import { SERVICES } from '../data/servicesData';
import SEO from '../components/SEO';

export default function LocationDetailPage() {
  const { slug } = useParams();
  const location = LOCATIONS_DATA.find((l) => l.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!location) {
    return <Navigate to="/service-areas" replace />;
  }

  const nearbyLocations = location.nearbySlugs
    .map((s) => LOCATIONS_DATA.find((l) => l.slug === s))
    .filter(Boolean);

  const whatsappMessage = encodeURIComponent(
    `Hello Brothers Hotshot, I need urgent hotshot transportation service in ${location.name}, ${location.provinceCode}. Please provide availability and rate.`
  );
  const whatsappUrl = `https://wa.me/15873770880?text=${whatsappMessage}`;

  const pageTitle = `Hotshot Delivery & Urgent Trucking in ${location.name}, ${location.provinceCode} | Brothers Hotshot Services`;
  const pageDescription = `Need fast, dependable hotshot trucking in ${location.name}? Dedicated point-to-point freight, 24/7 priority dispatch for equipment, parts & urgent loads. Call (587) 377-0880.`;
  const canonicalUrl = `https://brothershotshot.ca/service-areas/${location.slug}`;

  // Structured Data (Schema.org JSON-LD) for Local Service Area
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `https://brothershotshot.ca/service-areas/${location.slug}#service`,
        "name": `Brothers Hotshot Services - ${location.name}`,
        "description": location.overview,
        "url": canonicalUrl,
        "telephone": "+1-587-377-0880",
        "email": "info.brothershotshot@gmail.com",
        "priceRange": "$$",
        "image": "https://brothershotshot.ca/logo.jpg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": BUSINESS_INFO.address.street,
          "addressLocality": location.name,
          "addressRegion": location.provinceCode,
          "postalCode": location.postalCode,
          "addressCountry": "CA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.lat,
          "longitude": location.coordinates.lng
        },
        "areaServed": {
          "@type": "City",
          "name": location.name
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
            ],
            "opens": "00:00",
            "closes": "23:59"
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://brothershotshot.ca/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Service Areas",
            "item": "https://brothershotshot.ca/service-areas"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${location.name} Hotshot Services`,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        "mainEntity": location.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }
    ]
  };

  return (
    <div className="bg-[#0B0B0D] text-gray-200 min-h-screen">
      <SEO 
        title={pageTitle} 
        description={pageDescription} 
        canonical={canonicalUrl} 
      />

      {/* JSON-LD Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#16161B]/80 via-[#0B0B0D]/95 to-[#0B0B0D] -z-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-gray-400">
              <li>
                <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-gray-600" /></li>
              <li>
                <Link to="/service-areas" className="hover:text-[#D4AF37] transition-colors">Service Areas</Link>
              </li>
              <li><ChevronRight className="w-3.5 h-3.5 text-gray-600" /></li>
              <li className="text-[#D4AF37] font-semibold">{location.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>{location.regionTitle}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Hotshot Trucking & Urgent Freight in{" "}
                <span className="text-[#D4AF37]">{location.name}, {location.provinceCode}</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                {location.overview}
              </p>

              {/* Quick specs pill bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase">
                    <Clock className="w-4 h-4" />
                    <span>Dispatch</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                    {location.dispatchTime}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase">
                    <Truck className="w-4 h-4" />
                    <span>Fleet Setup</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                    1-Ton + Gooseneck Deck
                  </div>
                </div>

                <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Compliance</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-white mt-1">
                    100% NSC Certified
                  </div>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D4AF37] text-[#0B0B0D] font-extrabold text-sm sm:text-base tracking-wide shadow-lg hover:bg-[#e0bc43] transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call 24/7 Dispatch: {location.phone}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Instant Quote</span>
                </a>

                <Link
                  to="/quote"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold text-sm transition-all"
                >
                  <span>Request Online Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#16161B] p-2 shadow-2xl">
                <img
                  src={FLEET_IMAGES[1]?.url || "/images/fleet-2.jpg"}
                  alt={`Brothers Hotshot Services truck operating in ${location.name}`}
                  className="w-full h-72 sm:h-80 object-cover rounded-xl"
                  loading="eager"
                />
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      Operational Hub Status
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Active 24/7
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-white">
                    Direct Point-to-Point Transit ({location.name})
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Zero co-loading or cross-dock delays. Your payload remains anchored on our dedicated trailer from initial hookup to final destination gate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid: Highlights & Landmarks */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Local Capabilities & Highlights */}
            <div className="lg:col-span-7 space-y-10">
              {/* Highlights */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6">
                  Why Industry Leaders in {location.name} Choose Brothers Hotshot
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {location.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/40 transition-all flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-gray-300 leading-relaxed font-medium">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Loads */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#D4AF37]" />
                  <span>Frequent Hotshot Payloads in {location.name}</span>
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-300">
                  {location.popularLoads.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Core Services Cross-Link Grid */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">
                  Available Expedited Services in {location.name}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.slice(0, 4).map((serv) => (
                    <Link
                      key={serv.id}
                      to="/services"
                      className="p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 hover:border-[#D4AF37]/50 transition-all group block"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                          {serv.title}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#D4AF37] transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="text-xs text-gray-400 line-clamp-2">
                        {serv.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Local Landmarks Callout & Quick Dispatch */}
            <div className="lg:col-span-5 space-y-6">
              {/* Local Landmarks Authentic Callout Box */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#16161B] border border-[#D4AF37]/40 shadow-xl space-y-5">
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Local Logistics & Landmarks</span>
                </div>

                <h3 className="text-xl font-bold text-white">
                  Key Industrial Areas & Landmarks Serviced
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Our drivers frequently pick up and deliver across the following commercial parks, industrial corridors, and transit hubs in {location.name}:
                </p>

                <div className="space-y-2.5">
                  {location.localLandmarks.map((landmark, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-lg bg-black/40 border border-white/5 text-xs sm:text-sm font-medium text-gray-200"
                    >
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span>{landmark}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 text-xs text-gray-400">
                  <span className="text-gray-200 font-semibold">Primary Highway Corridors: </span>
                  {location.primaryCorridors.join(" • ")}
                </div>
              </div>

              {/* Fast Quote Widget Box */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#D4AF37]/15 via-transparent to-transparent border border-[#D4AF37]/30 space-y-4">
                <h4 className="font-bold text-lg text-white">
                  Need a Hotshot Truck Dispatched Right Now?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed">
                  Speak directly with a dispatch coordinator to confirm trailer readiness, exact transit time, and upfront transparent pricing.
                </p>
                <a
                  href={`tel:${BUSINESS_INFO.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#D4AF37] hover:bg-[#e0bc43] text-[#0B0B0D] font-extrabold text-sm transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call Now: (587) 377-0880</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Localized FAQ Section */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {location.name} Hotshot Shipping FAQs
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Clear answers to common questions about freight delivery, rates, and dispatch timelines.
            </p>
          </div>

          <div className="space-y-4">
            {location.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2 hover:border-[#D4AF37]/30 transition-all"
              >
                <h3 className="text-base sm:text-lg font-bold text-white flex items-start gap-3">
                  <span className="text-[#D4AF37] font-black">Q.</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Interconnected Locations Cross-Linking Grid */}
      <section className="py-16 sm:py-20 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Nearby & Connected Hotshot Corridors
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1">
                Explore dedicated freight transit routes connecting {location.name} to adjacent industrial hubs.
              </p>
            </div>
            <Link
              to="/service-areas"
              className="text-xs sm:text-sm font-semibold text-[#D4AF37] hover:underline flex items-center gap-1 shrink-0"
            >
              <span>View All Service Areas</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {nearbyLocations.map((nearby) => (
              <Link
                key={nearby.slug}
                to={`/service-areas/${nearby.slug}`}
                className="p-5 rounded-2xl bg-[#16161B] border border-white/10 hover:border-[#D4AF37]/50 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span className="font-semibold text-[#D4AF37]">{nearby.provinceCode}</span>
                    <span>{nearby.dispatchTime.split(" ")[0]} Dispatch</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#D4AF37] transition-colors mb-1">
                    {nearby.name}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2">
                    {nearby.regionTitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-gray-300 group-hover:text-white">
                  <span>View Corridor Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Emergency Dispatch CTA Bar */}
      <section className="py-12 bg-gradient-to-r from-[#16161B] via-black to-[#16161B] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready to Book Your {location.name} Hotshot Load?
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Immediate dispatch coordination, live tracking, and dedicated single-carrier handling.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`tel:${BUSINESS_INFO.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-[#D4AF37] text-[#0B0B0D] font-extrabold text-sm hover:bg-[#e0bc43] transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call (587) 377-0880</span>
            </a>
            <Link
              to="/quote"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm transition-all"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
