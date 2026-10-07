import React, { useState } from 'react';
import { Wifi, Phone, MessageSquare, Menu, X, Sparkles } from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/internetPlans';

interface NavbarProps {
  onOpenInquiry: () => void;
  onScrollToVeo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, onScrollToVeo }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Representative Badge */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
                <Wifi className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-white block leading-tight">
                  FAST & RELIABLE INTERNET
                </span>
                <span className="text-[11px] text-amber-400 font-semibold tracking-wide uppercase block">
                  Rep: Arinde Maurice
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            <a href="#packages" className="hover:text-white transition-colors">
              Internet Packages
            </a>
            <a href="#speed-test" className="hover:text-white transition-colors">
              Speed Comparison
            </a>
            <button
              onClick={onScrollToVeo}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 hover:text-white border border-blue-400/30 transition-all text-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Animate with Veo</span>
            </button>
            <a href="#representative" className="hover:text-white transition-colors">
              About Maurice
            </a>
          </nav>

          {/* Desktop Contact CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={REPRESENTATIVE_INFO.callLink}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-all"
              title="Direct Phone Call"
            >
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Call: {REPRESENTATIVE_INFO.phoneDisplay}</span>
            </a>

            <a
              href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice, I want to inquire about your internet packages!')}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              title="Chat on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp: {REPRESENTATIVE_INFO.whatsappDisplay}</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <a
              href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice!')}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-emerald-600 text-white text-xs font-bold"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
          <a
            href="#packages"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 py-1.5 hover:text-white"
          >
            Internet Packages
          </a>
          <a
            href="#speed-test"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 py-1.5 hover:text-white"
          >
            Speed Comparison
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onScrollToVeo();
            }}
            className="w-full text-left text-sm font-semibold text-amber-300 py-1.5 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Animate Photo into Video (Veo)</span>
          </button>
          <a
            href="#representative"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-slate-300 py-1.5 hover:text-white"
          >
            About Arinde Maurice
          </a>

          <div className="pt-2 border-t border-slate-800 space-y-2">
            <a
              href={REPRESENTATIVE_INFO.callLink}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Maurice ({REPRESENTATIVE_INFO.phoneDisplay})</span>
            </a>
            <a
              href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice, I want to upgrade to high-speed internet!')}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Maurice ({REPRESENTATIVE_INFO.whatsappDisplay})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
