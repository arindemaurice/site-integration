import React, { useState } from 'react';
import {
  Gauge,
  Play,
  RotateCcw,
  Zap,
  Flame,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';
import { KEY_BENEFITS, REPRESENTATIVE_INFO } from '../data/internetPlans';

export const SpeedSimulator: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [testComplete, setTestComplete] = useState(false);
  const [downloadSpeed, setDownloadSpeed] = useState(0);
  const [ping, setPing] = useState(0);

  const runSpeedTest = () => {
    setTesting(true);
    setTestComplete(false);
    setDownloadSpeed(0);
    setPing(80);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      if (progress <= 50) {
        // ramping up
        setDownloadSpeed(Math.floor(progress * 1.8));
        setPing((p) => Math.max(8, p - 6));
      } else if (progress < 100) {
        setDownloadSpeed(Math.floor(90 + Math.random() * 18));
        setPing(Math.floor(5 + Math.random() * 4));
      } else {
        clearInterval(interval);
        setDownloadSpeed(104.5);
        setPing(6);
        setTesting(false);
        setTestComplete(true);
      }
    }, 120);
  };

  return (
    <section className="py-20 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Say Goodbye to Buffering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            See the Difference: Slow Internet vs. Arinde Maurice Fiber
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Stop waiting for videos to load or getting kicked from multiplayer gaming sessions. Upgrade your daily connection today.
          </p>
        </div>

        {/* Speed Comparison Battle */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20 items-stretch">
          {/* Box 1: Slow Connection */}
          <div className="rounded-2xl border border-red-200 bg-red-50/40 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5" />
                  <span>The Frustrating Old Connection</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">Copper / Unstable 3G-4G</span>
              </div>

              <div className="my-6 text-center">
                <div className="text-5xl font-extrabold text-red-600 tracking-tight">
                  2.4 <span className="text-lg font-normal text-slate-500">Mbps</span>
                </div>
                <p className="text-xs font-semibold text-red-600/80 mt-1">Frequent drops & high jitter</p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 border border-red-100">
                  <span className="text-slate-600">Video Buffering:</span>
                  <span className="font-bold text-red-600">Continuous 15-30s pause</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 border border-red-100">
                  <span className="text-slate-600">Multiplayer Gaming Ping:</span>
                  <span className="font-bold text-red-600">140 - 250 ms (Lag & Teleports)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/70 border border-red-100">
                  <span className="text-slate-600">Family Wi-Fi Sharing:</span>
                  <span className="font-bold text-red-600">Crashes with 2+ devices</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-200/60 text-xs text-slate-500">
              ❌ Lost productivity, missed lecture cues, and frustrating streaming delays.
            </div>
          </div>

          {/* Box 2: Arinde Maurice Fiber Connection */}
          <div className="rounded-2xl border-2 border-emerald-500 bg-gradient-to-br from-emerald-50/70 via-white to-blue-50/50 p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Arinde Maurice Pure Fiber</span>
                </span>
                <span className="text-xs text-emerald-700 font-bold">Guaranteed Speed & Ping</span>
              </div>

              <div className="my-6 text-center">
                <div className="text-5xl font-extrabold text-slate-900 tracking-tight">
                  {testing ? (
                    <span className="text-blue-600 animate-pulse">{downloadSpeed}</span>
                  ) : testComplete ? (
                    <span className="text-emerald-600">{downloadSpeed}</span>
                  ) : (
                    <span>100+</span>
                  )}{' '}
                  <span className="text-lg font-normal text-slate-500">Mbps</span>
                </div>
                <p className="text-xs font-semibold text-emerald-600 mt-1">
                  {testing ? 'Measuring fiber speed...' : testComplete ? 'Ultra Fast • Ping 6ms' : 'Consistent 24/7 dedicated line'}
                </p>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-200">
                  <span className="text-slate-600">Video Buffering:</span>
                  <span className="font-bold text-emerald-600">Zero Buffering • Instant 4K</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-200">
                  <span className="text-slate-600">Multiplayer Gaming Ping:</span>
                  <span className="font-bold text-emerald-600">4 - 12 ms (Competitive Esports)</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-emerald-200">
                  <span className="text-slate-600">Family Wi-Fi Sharing:</span>
                  <span className="font-bold text-emerald-600">10+ devices without a flinch</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 flex items-center justify-between flex-wrap gap-3">
              <button
                type="button"
                id="test-sim-speed-btn"
                onClick={runSpeedTest}
                disabled={testing}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md"
              >
                <Gauge className="w-4 h-4" />
                <span>{testing ? 'Simulating...' : 'Test Maurice Fiber Speed'}</span>
              </button>

              <a
                href={REPRESENTATIVE_INFO.whatsappLink('Hello Maurice, I want to upgrade to your fast fiber internet connection!')}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-slate-800 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Upgrade Today</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {KEY_BENEFITS.map((benefit, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-300 transition-all text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-lg mb-3">
                {i + 1}
              </div>
              <h4 className="text-sm font-bold text-slate-900 mb-1.5">{benefit.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
