import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-[#1a2e45] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="white" fill="none" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves)"/>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-[#d4a84b]"></div>
              <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
                Est. at Soulard Market
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight">
              LAKE CITY
            </h1>
            <h2 className="text-6xl md:text-8xl font-serif italic text-[#d4a84b] mb-8">
              Fish
            </h2>
            
            {/* Fish Icon */}
            <div className="mb-8">
              <svg className="w-24 h-12 text-[#d4a84b]" viewBox="0 0 100 40" fill="currentColor">
                <ellipse cx="35" cy="20" rx="30" ry="15"/>
                <polygon points="65,10 85,20 65,30"/>
                <circle cx="20" cy="17" r="3" fill="#1a2e45"/>
                <path d="M5,20 Q15,15 25,20" stroke="#1a2e45" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <p className="text-xl md:text-2xl text-white/80 font-light mb-4">
              Fresh Wild-Caught Seafood Daily
            </p>
            <p className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed">
              Premium-quality catfish and buffalo fish from Kentucky Lake. 
              USDA-regulated, sustainably sourced, and never frozen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={createPageUrl('Menu')}
                className="px-8 py-4 bg-[#d4a84b] text-[#1a2e45] font-semibold tracking-wide hover:bg-[#e5b95c] transition-all duration-300 text-center"
              >
                VIEW OUR MENU
              </Link>
              <Link
                href={createPageUrl('Contact')}
                className="px-8 py-4 border border-white/30 text-white font-medium tracking-wide hover:bg-white/10 transition-all duration-300 text-center"
              >
                FIND US
              </Link>
            </div>
          </motion.div>

          {/* Right - Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-[#d4a84b] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Soulard Market</h3>
                  <p className="text-white/70">730 Carroll St.</p>
                  <p className="text-white/70">St. Louis, MO 63104</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-[#d4a84b] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Market Hours</h3>
                  <p className="text-white/70">Thursday - Saturday</p>
                  <p className="text-white/70">9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm">
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-[#d4a84b] mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-semibold mb-2">Call Us</h3>
                  <a href="tel:3145825011" className="text-[#d4a84b] text-lg hover:underline">
                    (314) 582-5011
                  </a>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="bg-[#d4a84b] p-8 rounded-sm"
            >
              <h3 className="text-[#1a2e45] font-bold text-xl mb-2">
                10% OFF THURSDAYS
              </h3>
              <p className="text-[#1a2e45]/80">
                Special discount for Seniors & Veterans every Thursday
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}