import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import CTASection from '@/components/home/CTASection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CTASection />
    </div>
  );
}
