import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Fish, Award, Truck, Shield } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Fish,
    title: 'Wild-Caught Daily',
    description: 'Fresh fish from Kentucky Lake, caught and delivered the same day to Soulard Market.',
    color: '#d4a84b',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'USDA-regulated seafood that meets the highest standards of freshness and taste.',
    color: '#d4a84b',
  },
  {
    icon: Truck,
    title: 'Farm to Market',
    description: 'Direct from Kentucky Lake to St. Louis — no middlemen, no compromises.',
    color: '#d4a84b',
  },
  {
    icon: Shield,
    title: 'Sustainably Sourced',
    description: 'Responsible fishing practices that protect our waterways for future generations.',
    color: '#d4a84b',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -30 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { duration: 0.5, ease: 'backOut' },
  },
};

function CountUpNumber({ target, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#d4a84b]/5"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-[#1a2e45]/5"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px bg-[#d4a84b] mx-auto mb-4"
          />
          <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-light text-[#1a2e45] mt-4">
            The Lake City Difference
          </h2>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {[
            { number: 20, suffix: '+', label: 'Years of Experience' },
            { number: 50, suffix: '+', label: 'Fish Varieties' },
            { number: 100, suffix: '%', label: 'Wild-Caught' },
            { number: 3, suffix: '', label: 'Days a Week' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
            >
              <p className="text-4xl md:text-5xl font-light text-[#d4a84b] mb-2">
                <CountUpNumber target={stat.number} suffix={stat.suffix} />
              </p>
              <p className="text-[#1a2e45]/60 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                className="group p-8 bg-white border border-gray-100 rounded-sm hover:border-[#d4a84b]/30 transition-colors"
              >
                <motion.div
                  variants={iconVariants}
                  className="w-14 h-14 bg-[#1a2e45] flex items-center justify-center mb-6 group-hover:bg-[#d4a84b] transition-colors duration-300"
                >
                  <Icon className="w-7 h-7 text-[#d4a84b] group-hover:text-[#1a2e45] transition-colors duration-300" />
                </motion.div>
                <h3 className="text-lg font-semibold text-[#1a2e45] mb-3">
                  {feature.title}
                </h3>
                <p className="text-[#1a2e45]/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
