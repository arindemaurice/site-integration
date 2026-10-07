import React from 'react';
import {
  Phone,
  MessageSquare,
  Zap,
  CheckCircle,
  Wifi,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { REPRESENTATIVE_INFO } from '../data/internetPlans';

interface HeroSectionProps {
  onOpenInquiry: (planId?: string) => void;
  onScrollToVeo: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInquiry, onScrollToVeo }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white pt-12 pb-20 border-b border-slate-800">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Compelling Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Now Installing High-Speed Fiber In Your Area</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Experience The Power Of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300">
                Fast & Reliable
              </span>{' '}
              Internet!
            </h1>

            {/* Sub-headline from prompt */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
              Tired of slow internet and endless buffering? It’s time to upgrade your connection! 🌐🔥
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Whether you're streaming your favorite movies, gaming with friends, studying, working remotely, or connecting with family, enjoy a seamless, ultra-reliable internet experience.
            </p>

            {/* Core Checkmarks directly from prompt */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                'Fast and reliable connectivity',
                'Smooth streaming and downloads',
                'Perfect for homes, students, gamers & businesses',
                'Connect multiple devices with ease',
                'Quality service and customer support',
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-slate-200">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a
                id="hero-call-btn"
                href={REPRESENTATIVE_INFO.callLink}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-blue-600/30"
              >
                <Phone className="w-5 h-5" />
                <span>Call {REPRESENTATIVE_INFO.phoneDisplay}</span>
              </a>

              <a
                id="hero-whatsapp-btn"
                href={REPRESENTATIVE_INFO.whatsappLink('Hello Arinde Maurice! I would like to inquire about getting fast and reliable internet installed.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base transition-all shadow-lg shadow-emerald-600/30"
              >
                <MessageSquare className="w-5 h-5" />
                <span>WhatsApp {REPRESENTATIVE_INFO.whatsappDisplay}</span>
              </a>

              <button
                id="hero-animate-btn"
                type="button"
                onClick={onScrollToVeo}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-amber-500/30 font-semibold text-sm transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Animate Photo with Veo</span>
              </button>
            </div>
          </div>

          {/* Right Column: Arinde Maurice Representative Profile Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 shadow-2xl backdrop-blur-sm">
              {/* Badge */}
              <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wide shadow-md flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Trusted Representative</span>
              </div>

              {/* Photo */}
              <div className="relative rounded-xl overflow-hidden mb-4 aspect-[4/5] bg-slate-900 border border-slate-700 shadow-inner">
                <img
                  src="/maurice-profile.jpg"
                  alt="Arinde Maurice - Internet Connection Representative"
                  className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">Available For Instant Install</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">ARINDE MAURICE</h3>
                  <p className="text-xs text-amber-300 font-medium">Your Trusted Internet Connection Representative</p>
                </div>
              </div>

              {/* Quick Contact Box */}
              <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-700/60 space-y-3">
                <div className="flex items-center justify-between text-sm border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 font-medium flex items-center gap-2">
                    <Phone className="w-4 h-4 text-blue-400" />
                    <span>Direct Call:</span>
                  </span>
                  <a href={REPRESENTATIVE_INFO.callLink} className="font-bold text-white hover:text-blue-400 transition-colors">
                    {REPRESENTATIVE_INFO.phoneDisplay}
                  </a>
                </div>

                <div className="flex items-center justify-between text-sm border-b border-slate-800 pb-2.5">
                  <span className="text-slate-400 font-medium flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-400" />
                    <span>WhatsApp:</span>
                  </span>
                  <a
                    href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice, I want to upgrade to high-speed internet!')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-400 hover:underline transition-colors"
                  >
                    {REPRESENTATIVE_INFO.whatsappDisplay}
                  </a>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400 font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Quality Guarantee:</span>
                  </span>
                  <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Fast Site Survey & Setup
                  </span>
                </div>
              </div>

              {/* Consultation trigger */}
              <button
                id="request-install-btn"
                type="button"
                onClick={() => onOpenInquiry()}
                className="mt-4 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Request Free Connection Survey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
