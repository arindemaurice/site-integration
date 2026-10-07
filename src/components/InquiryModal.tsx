import React, { useState } from 'react';
import { X, Send, Phone, MessageSquare, CheckCircle, MapPin, User, Sparkles } from 'lucide-react';
import { INTERNET_PLANS, REPRESENTATIVE_INFO } from '../data/internetPlans';
import { InquiryFormData } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlanId?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultPlanId = 'home-family',
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    location: '',
    planId: defaultPlanId,
    customerType: 'home',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPlan = INTERNET_PLANS.find((p) => p.id === formData.planId) || INTERNET_PLANS[1];

    const message = `Hello Arinde Maurice! 🚀
I would like to request an internet installation & site survey.

👤 Name: ${formData.name || 'Customer'}
📞 Phone: ${formData.phone || 'Provided via WhatsApp'}
📍 Location/Area: ${formData.location || 'Not specified'}
📦 Desired Package: ${selectedPlan.name} (${selectedPlan.speed})
🏷️ Category: ${formData.customerType.toUpperCase()}
📝 Notes: ${formData.notes || 'Looking for fast & reliable connection'}`;

    window.open(REPRESENTATIVE_INFO.whatsappLink(message), '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-900">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">Direct Request</span>
            <h3 className="text-lg font-bold">Request Fast Internet Connection</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">Inquiry Sent to WhatsApp!</h4>
            <p className="text-sm text-slate-600">
              Arinde Maurice will review your location details and reply promptly to schedule the site survey and installation.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href={REPRESENTATIVE_INFO.callLink}
                className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call {REPRESENTATIVE_INFO.phoneDisplay} Directly</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Your Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Bosco / Sarah K."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Phone / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 07..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Customer Type
                </label>
                <select
                  value={formData.customerType}
                  onChange={(e) => setFormData({ ...formData, customerType: e.target.value as any })}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="home">Home / Residential</option>
                  <option value="student">Student / Academic</option>
                  <option value="gamer">Gaming & Streaming</option>
                  <option value="business">Business / Commercial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Installation Location / Estate
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kira, Ntinda, Kololo, Entebbe Road..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Preferred Package
              </label>
              <select
                value={formData.planId}
                onChange={(e) => setFormData({ ...formData, planId: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"
              >
                {INTERNET_PLANS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {p.speed} ({p.priceUgx || 'Best Rate'})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1">
                Additional Notes / Questions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Any special requirements or preferred installation day?"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send Request to Arinde Maurice via WhatsApp</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
