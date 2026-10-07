import React from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  ShieldCheck,
  Award,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin
} from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/internetPlans';

export const MauriceProfileSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-800 to-slate-950 rounded-3xl border border-slate-700 p-8 sm:p-12 shadow-2xl relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Representative Visual */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-amber-400 via-blue-500 to-cyan-400 shadow-xl mb-4">
                <img
                  src="/maurice-profile.jpg"
                  alt="Arinde Maurice"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute bottom-2 right-2 bg-emerald-500 text-slate-950 p-2 rounded-full border-4 border-slate-900 shadow-lg" title="Active & Ready">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-extrabold text-white">ARINDE MAURICE</h3>
              <p className="text-amber-400 font-medium text-sm mt-0.5">Internet Representative & Marketing Expert</p>

              <div className="flex gap-3 mt-4">
                <a
                  href={REPRESENTATIVE_INFO.callLink}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
                <a
                  href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice! I would like to get connected.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Value & Mission */}
            <div className="lg:col-span-8 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-900/40 px-3 py-1 rounded-full border border-blue-500/30">
                  Direct Field Representative
                </span>
                <h4 className="text-3xl font-extrabold text-white mt-3">
                  Your Dedicated Partner for Seamless Internet Connectivity
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-2">
                  "I don't just sell an internet package — I ensure you have dependable, high-speed fiber that powers your dreams. From running the fiber line to fine-tuning your Wi-Fi router for whole-premises coverage, I am with you every step of the way."
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-1">
                    <Clock className="w-4 h-4" />
                    <span>Same-Day Site Survey</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Get an on-the-spot technical survey to verify fiber signal strengths before installation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-1">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Direct Account Care</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Skip anonymous call center queues. Reach Maurice directly on phone or WhatsApp whenever you need assistance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-1">
                    <Award className="w-4 h-4" />
                    <span>Quality Hardware Included</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    High-gain dual-band optical network terminals and gigabit routers for maximum wall-penetration.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm mb-1">
                    <Mail className="w-4 h-4" />
                    <span>Official Inquiries</span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    {REPRESENTATIVE_INFO.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
