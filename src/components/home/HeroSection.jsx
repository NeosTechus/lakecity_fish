import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const lineGrow = {
  hidden: { width: 0 },
  visible: {
    width: 48,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5,
    },
  },
};

const cardSlide = {
  hidden: { opacity: 0, x: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] bg-[#1a2e45] overflow-hidden">
      {/* Animated Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.05 }}
        transition={{ duration: 2 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="waves" x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q 25 0, 50 10 T 100 10" stroke="white" fill="none" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#waves)"/>
        </svg>
      </motion.div>

      {/* Floating decorative circles */}
      <motion.div
        className="absolute top-20 right-[10%] w-64 h-64 rounded-full border border-white/5"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-40 left-[5%] w-40 h-40 rounded-full border border-[#d4a84b]/10"
        animate={{
          y: [0, 15, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      <motion.div
        className="absolute top-[40%] right-[30%] w-20 h-20 rounded-full bg-[#d4a84b]/5"
        animate={{
          y: [0, -10, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content - Staggered animations */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Gold line + subtitle */}
            <motion.div variants={fadeRight} className="flex items-center gap-3 mb-6">
              <motion.div
                className="h-px bg-[#d4a84b]"
                variants={lineGrow}
              />
              <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
                Est. at Soulard Market
              </span>
            </motion.div>

            {/* LAKE CITY title */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl md:text-7xl font-light text-white mb-4 tracking-tight"
            >
              LAKE CITY
            </motion.h1>

            {/* Fish title */}
            <motion.h2
              variants={fadeUp}
              className="text-6xl md:text-8xl font-serif italic text-[#d4a84b] mb-8"
            >
              Fish
            </motion.h2>
            
            {/* Animated Fish Icon */}
            <motion.div
              className="mb-8"
              variants={fadeRight}
            >
              <motion.svg
                className="w-24 h-12 text-[#d4a84b]"
                viewBox="0 0 100 40"
                fill="currentColor"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ellipse cx="35" cy="20" rx="30" ry="15"/>
                <polygon points="65,10 85,20 65,30"/>
                <circle cx="20" cy="17" r="3" fill="#1a2e45"/>
                <path d="M5,20 Q15,15 25,20" stroke="#1a2e45" strokeWidth="2" fill="none"/>
              </motion.svg>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="text-xl md:text-2xl text-white/80 font-light mb-4"
            >
              Fresh Wild-Caught Seafood Daily
            </motion.p>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-white/60 text-lg mb-10 max-w-lg leading-relaxed"
            >
              Premium-quality catfish and buffalo fish from Kentucky Lake. 
              USDA-regulated, sustainably sourced, and never frozen.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={createPageUrl('Menu')}
                  className="block px-8 py-4 bg-[#d4a84b] text-[#1a2e45] font-semibold tracking-wide hover:bg-[#e5b95c] transition-all duration-300 text-center hover:shadow-lg hover:shadow-[#d4a84b]/20"
                >
                  VIEW OUR MENU
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href={createPageUrl('Contact')}
                  className="block px-8 py-4 border border-white/30 text-white font-medium tracking-wide hover:bg-white/10 transition-all duration-300 text-center"
                >
                  FIND US
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - Info Cards with stagger */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Location Card */}
            <motion.div
              variants={cardSlide}
              whileHover={{ x: -5, borderColor: 'rgba(212,168,75,0.3)' }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm transition-colors"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                >
                  <MapPin className="w-6 h-6 text-[#d4a84b] mt-1 flex-shrink-0" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Soulard Market</h3>
                  <p className="text-white/70">730 Carroll St.</p>
                  <p className="text-white/70">St. Louis, MO 63104</p>
                </div>
              </div>
            </motion.div>

            {/* Hours Card */}
            <motion.div
              variants={cardSlide}
              whileHover={{ x: -5, borderColor: 'rgba(212,168,75,0.3)' }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm transition-colors"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                  <Clock className="w-6 h-6 text-[#d4a84b] mt-1 flex-shrink-0" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Market Hours</h3>
                  <p className="text-white/70">Thursday - Saturday</p>
                  <p className="text-white/70">9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              variants={cardSlide}
              whileHover={{ x: -5, borderColor: 'rgba(212,168,75,0.3)' }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-sm transition-colors"
            >
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 10, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 5 }}
                >
                  <Phone className="w-6 h-6 text-[#d4a84b] mt-1 flex-shrink-0" />
                </motion.div>
                <div>
                  <h3 className="text-white font-semibold mb-2">Call Us</h3>
                  <a href="tel:3145825011" className="text-[#d4a84b] text-lg hover:underline">
                    (314) 582-5011
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Special Offer - Pulse animation */}
            <motion.div
              variants={cardSlide}
              whileHover={{ scale: 1.02 }}
              className="bg-[#d4a84b] p-8 rounded-sm relative overflow-hidden"
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{ x: ['-200%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
              />
              <div className="relative z-10">
                <h3 className="text-[#1a2e45] font-bold text-xl mb-2">
                  10% OFF THURSDAYS
                </h3>
                <p className="text-[#1a2e45]/80">
                  Special discount for Seniors & Veterans every Thursday
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <motion.svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: 'easeOut' }}
        >
          <path d="M0,64 C480,120 960,0 1440,64 L1440,120 L0,120 Z" fill="white"/>
        </motion.svg>
      </div>
    </section>
  );
}
