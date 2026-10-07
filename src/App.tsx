import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PackagesSection } from './components/PackagesSection';
import { SpeedSimulator } from './components/SpeedSimulator';
import { VeoVideoGenerator } from './components/VeoVideoGenerator';
import { MauriceProfileSection } from './components/MauriceProfileSection';
import { InquiryModal } from './components/InquiryModal';
import { MauriceAIAssistant } from './components/MauriceAIAssistant';
import { Footer } from './components/Footer';

export default function App() {
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [selectedPlanForInquiry, setSelectedPlanForInquiry] = useState<string>('home-family');

  const handleOpenInquiry = (planId?: string) => {
    if (planId) setSelectedPlanForInquiry(planId);
    setInquiryModalOpen(true);
  };

  const handleScrollToVeo = () => {
    const el = document.getElementById('veo-animator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        onOpenInquiry={() => handleOpenInquiry()}
        onScrollToVeo={handleScrollToVeo}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenInquiry={handleOpenInquiry}
          onScrollToVeo={handleScrollToVeo}
        />

        {/* Speed Comparison & Buffering Elimination */}
        <div id="speed-test">
          <SpeedSimulator />
        </div>

        {/* Tailored Packages & Bandwidth Estimator */}
        <PackagesSection onSelectPlan={handleOpenInquiry} />

        {/* Veo 3.1 Photo to Video Generator Feature */}
        <VeoVideoGenerator />

        {/* Arinde Maurice Representative Profile */}
        <div id="representative">
          <MauriceProfileSection />
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        defaultPlanId={selectedPlanForInquiry}
      />

      {/* AI Consultation Assistant */}
      <MauriceAIAssistant />
    </div>
  );
}
