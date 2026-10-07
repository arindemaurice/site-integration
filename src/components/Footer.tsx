import React from 'react';
import { Wifi, Phone, MessageSquare, Mail, ShieldCheck, Heart } from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/internetPlans';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <Wifi className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight">
                FAST & RELIABLE INTERNET
              </span>
            </div>
            <p className="text-slate-400 max-w-md text-xs leading-relaxed">
              Tired of slow internet and endless buffering? It’s time to upgrade your connection! Experience smooth streaming, lightning downloads, and ultra-reliable connectivity for homes, students, gamers, and businesses.
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Dedicated representative & personalized customer support.</span>
            </div>
          </div>

          {/* Col 2: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Direct Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <span className="text-slate-500 block text-[11px]">Representative:</span>
                <span className="text-slate-200 font-bold">{REPRESENTATIVE_INFO.name}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px]">Phone / Call:</span>
                <a href={REPRESENTATIVE_INFO.callLink} className="text-blue-400 hover:underline font-bold">
                  {REPRESENTATIVE_INFO.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px]">WhatsApp:</span>
                <a
                  href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice!')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline font-bold"
                >
                  {REPRESENTATIVE_INFO.whatsappDisplay}
                </a>
              </li>
              <li>
                <span className="text-slate-500 block text-[11px]">Email:</span>
                <span className="text-slate-300 font-mono text-[11px]">{REPRESENTATIVE_INFO.email}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Homes & Families
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Students & Academics
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Gamers & Esports
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  Commercial Business Fiber
                </a>
              </li>
              <li>
                <a href="#veo-animator" className="text-amber-400 hover:text-amber-300 transition-colors">
                  Veo Photo-to-Video AI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-slate-500 text-[11px]">
          <p>© {new Date().getFullYear()} Arinde Maurice — Fast & Reliable Internet Services. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Stay connected. Stay ahead. Choose reliable internet! 🚀</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
