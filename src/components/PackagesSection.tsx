import React, { useState } from 'react';
import {
  Wifi,
  Zap,
  Check,
  Phone,
  MessageSquare,
  Sparkles,
  Sliders,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { INTERNET_PLANS, REPRESENTATIVE_INFO } from '../data/internetPlans';
import { InternetPlan } from '../types';

interface PackagesSectionProps {
  onSelectPlan: (planId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPlan }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'home' | 'student' | 'gamer' | 'business'>('all');
  const [deviceCount, setDeviceCount] = useState<number>(6);
  const [primaryActivity, setPrimaryActivity] = useState<'streaming' | 'gaming' | 'study' | 'business'>('streaming');

  const filteredPlans = selectedCategory === 'all'
    ? INTERNET_PLANS
    : INTERNET_PLANS.filter((p) => p.category === selectedCategory);

  // Bandwidth Recommendation Engine
  const getRecommendedPlan = (): InternetPlan => {
    if (primaryActivity === 'business' || deviceCount > 15) {
      return INTERNET_PLANS.find((p) => p.id === 'business-turbo') || INTERNET_PLANS[3];
    }
    if (primaryActivity === 'gaming') {
      return INTERNET_PLANS.find((p) => p.id === 'gamer-creator') || INTERNET_PLANS[2];
    }
    if (primaryActivity === 'study' && deviceCount <= 4) {
      return INTERNET_PLANS.find((p) => p.id === 'student-lite') || INTERNET_PLANS[0];
    }
    return INTERNET_PLANS.find((p) => p.id === 'home-family') || INTERNET_PLANS[1];
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <section id="packages" className="py-20 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Wifi className="w-3.5 h-3.5" />
            <span>High-Speed Fiber Plans</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Tailored Packages for Every Connection Need
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose the ideal speed tier for your household or enterprise, backed by Arinde Maurice’s rapid setup and 24/7 client care.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {[
              { id: 'all', label: 'All Packages' },
              { id: 'home', label: 'Homes & Families' },
              { id: 'student', label: 'Students' },
              { id: 'gamer', label: 'Gamers & Creators' },
              { id: 'business', label: 'Businesses' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredPlans.map((plan) => {
            const isRec = recommendedPlan.id === plan.id;
            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl bg-white p-6 border transition-all flex flex-col justify-between ${
                  plan.isPopular
                    ? 'border-blue-500 shadow-xl ring-2 ring-blue-500/20 md:-translate-y-2'
                    : 'border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      plan.isPopular
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      {plan.category.toUpperCase()}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{plan.description}</p>
                  </div>

                  {/* Speed Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-center mb-5">
                    <span className="text-3xl font-extrabold text-blue-600">{plan.speed}</span>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Pure High-Speed Connectivity</p>
                    {plan.priceUgx && (
                      <p className="text-sm font-bold text-slate-800 mt-1">{plan.priceUgx}</p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 mb-6 text-left">
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Included Features:</p>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <a
                    href={REPRESENTATIVE_INFO.whatsappLink(
                      `Hello Maurice, I am interested in the ${plan.name} (${plan.speed}) package. Please share details on installation!`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      plan.isPopular
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Get on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => onSelectPlan(plan.id)}
                    className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                  >
                    Request Free Consultation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Speed & Bandwidth Estimator */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Config controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                <Sliders className="w-4 h-4" />
                <span>Interactive Bandwidth Estimator</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Not Sure Which Speed You Need?
              </h3>
              <p className="text-slate-600 text-sm">
                Adjust your connected devices and daily online activities below. Arinde Maurice will match you with the sweet spot for smooth streaming, gaming, and zero buffering.
              </p>

              {/* Slider for device count */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                  <span>How many devices connected simultaneously?</span>
                  <span className="text-blue-600 font-extrabold px-3 py-1 bg-blue-50 rounded-lg">
                    {deviceCount} {deviceCount === 1 ? 'Device' : 'Devices'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  value={deviceCount}
                  onChange={(e) => setDeviceCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-400">
                  <span>1 (Solo)</span>
                  <span>8 (Family)</span>
                  <span>16 (Big House)</span>
                  <span>25+ (Office)</span>
                </div>
              </div>

              {/* Activity buttons */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800 block">
                  Primary household or business activity:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'study', label: 'Study & Calls' },
                    { id: 'streaming', label: '4K Movies & TV' },
                    { id: 'gaming', label: 'Online Gaming' },
                    { id: 'business', label: 'Heavy Business' },
                  ].map((act) => (
                    <button
                      key={act.id}
                      type="button"
                      onClick={() => setPrimaryActivity(act.id as any)}
                      className={`p-3 rounded-xl text-xs font-bold border transition-all text-center ${
                        primaryActivity === act.id
                          ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wide mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Maurice’s Recommendation</span>
              </div>

              <h4 className="text-2xl font-black text-white">{recommendedPlan.name}</h4>
              <div className="text-3xl font-extrabold text-blue-400 my-2">
                {recommendedPlan.speed}
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                {recommendedPlan.recommendedFor}. Provides enough headroom for {deviceCount} devices with zero lag or stream drops.
              </p>

              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm mb-5 text-xs space-y-1.5 border border-white/10">
                <div className="flex justify-between text-slate-200">
                  <span>Simultaneous 4K Streams:</span>
                  <span className="font-bold text-white">{Math.floor(recommendedPlan.speedNumber / 15)} Streams</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>Typical Ping:</span>
                  <span className="font-bold text-emerald-400">4 - 15 ms</span>
                </div>
                <div className="flex justify-between text-slate-200">
                  <span>10GB Movie Download:</span>
                  <span className="font-bold text-white">~{Math.round((10 * 1024 * 8) / (recommendedPlan.speedNumber * 60))} min</span>
                </div>
              </div>

              <a
                href={REPRESENTATIVE_INFO.whatsappLink(
                  `Hello Maurice! The speed estimator recommended the ${recommendedPlan.name} (${recommendedPlan.speed}) for my ${deviceCount} devices. Can we check coverage for my area?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Connect with Maurice on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
