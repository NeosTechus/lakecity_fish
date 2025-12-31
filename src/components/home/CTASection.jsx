import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function CTASection() {
  return (
    <section className="py-24 bg-[#1a2e45] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 400">
          <circle cx="100" cy="100" r="80" stroke="white" fill="none" strokeWidth="0.5"/>
          <circle cx="300" cy="300" r="120" stroke="white" fill="none" strokeWidth="0.5"/>
          <circle cx="350" cy="50" r="60" stroke="white" fill="none" strokeWidth="0.5"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
            Visit Us Today
          </span>
          <h2 className="text-4xl md:text-6xl font-light text-white mt-4 mb-6">
            Fresh Seafood Awaits
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-12">
            Whether you're buying wholesale or shopping for your family, Lake City Fish delivers 
            exceptional value, quality, and flavor.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="tel:3145825011"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4a84b] text-[#1a2e45] font-semibold hover:bg-[#e5b95c] transition-all"
            >
              <Phone className="w-5 h-5" />
              (314) 582-5011
            </a>
            <Link
              href={createPageUrl('Contact')}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
            >
              <MapPin className="w-5 h-5" />
              Get Directions
            </Link>
          </div>

          {/* Hours Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center p-6 border border-white/10">
              <p className="text-[#d4a84b] font-semibold mb-2">Thursday</p>
              <p className="text-white/80">9AM - 5PM</p>
              <p className="text-white/50 text-sm mt-2">Senior & Veteran Discount</p>
            </div>
            <div className="text-center p-6 border border-white/10">
              <p className="text-[#d4a84b] font-semibold mb-2">Friday</p>
              <p className="text-white/80">9AM - 5PM</p>
            </div>
            <div className="text-center p-6 border border-white/10">
              <p className="text-[#d4a84b] font-semibold mb-2">Saturday</p>
              <p className="text-white/80">9AM - 5PM</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}