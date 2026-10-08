import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Menu, X, ArrowRight, ChevronRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessInfo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  // Close mobile menu on route change
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#hero' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Service Areas', href: '/#service-areas' },
    { name: 'Careers', href: '/#careers' },
    { name: 'Quote', href: '/#quote' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (e, href) => {
    setIsOpen(false);
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const elem = document.getElementById(targetId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', href);
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300 shadow-xl">
      {/* Top emergency dispatch bar with Email and Direct Phone */}
      <div className="bg-[#0e0e12] border-b border-white/5 text-xs text-gray-300 py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Email link (replaces 24/7 Dispatch and Red Deer) */}
          <div className="flex items-center gap-2 shrink-0 min-w-0">
            <a
              href={BUSINESS_INFO.emailMailto}
              className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#D4AF37] transition-colors py-0.5 truncate"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="text-[11px] sm:text-xs font-medium truncate">
                {BUSINESS_INFO.email}
              </span>
            </a>
          </div>

          {/* Direct Dispatch Phone */}
          <div className="flex items-center shrink-0">
            <a
              href={BUSINESS_INFO.phoneTel}
              aria-label={`Call dispatch at ${BUSINESS_INFO.phone}`}
              className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#D4AF37] transition-colors py-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
              <span className="hidden sm:inline text-xs text-gray-300">Dispatch:</span>
              <span className="font-mono text-xs text-[#D4AF37] font-bold">
                {BUSINESS_INFO.phone}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'bg-[#0B0B0D]/95 backdrop-blur-md shadow-2xl border-b border-[#D4AF37]/25 py-2'
            : 'bg-[#0B0B0D]/95 backdrop-blur-sm border-b border-white/10 py-2.5 sm:py-3'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 flex items-center justify-between gap-2">
          {/* Logo & Brand title - LOGO FULLY DISPLAYED */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, '/#hero')}
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none min-w-0"
          >
            {/* FULL LOGO EMBLEM CONTAINER */}
            <div className="relative h-11 w-11 sm:h-12 sm:w-12 p-1 rounded-xl border border-[#D4AF37]/60 shadow-md group-hover:border-[#D4AF37] transition-all shrink-0 bg-black flex items-center justify-center">
              <img
                src={BUSINESS_INFO.logoUrl}
                alt="Brothers Hotshot Services Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = BUSINESS_INFO.cloudinaryLogo;
                }}
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm sm:text-lg lg:text-xl tracking-tight text-white group-hover:text-metallic-gold transition-all truncate">
                BROTHERS HOTSHOT
              </span>
              <span className="text-[9px] sm:text-[11px] uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1 truncate">
                <span>Services</span>
                <span className="text-[#D4AF37]">•</span>
                <span className="text-gray-400">Western Canada</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Connected to Sections) */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-sm font-semibold rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all tracking-wide cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Right Action: Quote CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="/#quote"
              onClick={(e) => handleNavClick(e, '/#quote')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-sm tracking-wide shadow-md hover:shadow-[#D4AF37]/30 transition-all cursor-pointer"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Right Controls */}
          <div className="lg:hidden flex items-center gap-1.5 sm:gap-2 shrink-0">
            <a
              href="/#quote"
              onClick={(e) => handleNavClick(e, '/#quote')}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 text-[11px] sm:text-xs font-bold rounded-lg bg-gold-gradient text-[#0B0B0D] shadow-sm flex items-center gap-1 active:scale-95 transition-transform"
            >
              <span>Quote</span>
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 active:bg-white/20 focus:outline-none min-w-[40px] min-h-[40px] flex items-center justify-center cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer Menu */}
        {isOpen && (
          <div className="lg:hidden bg-[#0B0B0D] border-b border-[#D4AF37]/30 px-4 py-5 space-y-3 animate-fadeIn shadow-2xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-gray-200 hover:text-white hover:bg-white/10 active:bg-white/15 transition-all min-h-[44px]"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2.5">
              <a
                href="/#quote"
                onClick={(e) => handleNavClick(e, '/#quote')}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-base shadow-lg min-h-[44px]"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={BUSINESS_INFO.phoneTel}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#17171C] border border-white/15 text-white font-bold text-sm hover:border-[#D4AF37]/50 min-h-[44px]"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Dispatch: {BUSINESS_INFO.phone}</span>
              </a>

              <a
                href={BUSINESS_INFO.emailMailto}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-300 text-xs hover:text-[#D4AF37]"
              >
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="truncate">{BUSINESS_INFO.email}</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
