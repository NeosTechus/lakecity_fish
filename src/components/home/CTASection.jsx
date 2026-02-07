import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

const sectionStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
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

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const cardPop = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function CTASection() {
  return (
    <section className="py-24 bg-[#1a2e45] relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        className="absolute top-10 left-[10%] w-48 h-48 rounded-full border border-white/5"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.08, 0.05],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-20 right-[15%] w-72 h-72 rounded-full border border-white/5"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.05, 0.1, 0.05],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] right-[5%] w-32 h-32 rounded-full bg-[#d4a84b]/5"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          {/* Subtitle */}
          <motion.span
            variants={fadeUp}
            className="inline-block text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium"
          >
            Visit Us Today
          </motion.span>

          {/* Title */}
          <motion.h2
            variants={fadeUp}
            className="text-4xl md:text-6xl font-light text-white mt-4 mb-6"
          >
            Fresh Seafood Awaits
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="text-white/60 text-lg max-w-2xl mx-auto mb-12"
          >
            Whether you&apos;re buying wholesale or shopping for your family, Lake City Fish delivers 
            exceptional value, quality, and flavor.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <motion.a
              href="tel:3145825011"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4a84b] text-[#1a2e45] font-semibold hover:bg-[#e5b95c] transition-all"
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(212,168,75,0.3)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className="w-5 h-5" />
              (314) 582-5011
            </motion.a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                href={createPageUrl('Contact')}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-medium hover:bg-white/10 transition-all"
              >
                <MapPin className="w-5 h-5" />
                Get Directions
              </Link>
            </motion.div>
          </motion.div>

          {/* Hours Grid - Staggered cards */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { day: 'Thursday', hours: '9AM - 5PM', note: 'Senior & Veteran Discount' },
              { day: 'Friday', hours: '9AM - 5PM', note: null },
              { day: 'Saturday', hours: '9AM - 5PM', note: null },
            ].map((item) => (
              <motion.div
                key={item.day}
                variants={cardPop}
                whileHover={{
                  y: -6,
                  borderColor: 'rgba(212,168,75,0.4)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                }}
                className="text-center p-6 border border-white/10 transition-colors cursor-default"
              >
                <p className="text-[#d4a84b] font-semibold mb-2">{item.day}</p>
                <p className="text-white/80">{item.hours}</p>
                {item.note && (
                  <motion.p
                    className="text-white/50 text-sm mt-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    viewport={{ once: true }}
                  >
                    {item.note}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
