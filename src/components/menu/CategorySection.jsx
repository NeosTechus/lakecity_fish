import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

const categoryInfo = {
  catfish: {
    title: 'Catfish',
    subtitle: 'Premium Wild-Caught',
    description: 'Our specialty - fresh catfish directly from Kentucky Lake'
  },
  jack_salmon: {
    title: 'Jack Salmon',
    subtitle: 'Local Favorite',
    description: 'Tender and flavorful, perfect for any preparation'
  },
  buffalo: {
    title: 'Buffalo Fish',
    subtitle: 'Traditional Catch',
    description: 'A St. Louis staple with rich, satisfying flavor'
  },
  market_price: {
    title: 'Premium Seafood',
    subtitle: 'Market Price',
    description: 'Ask about today\'s fresh selections'
  },
  ready_to_eat: {
    title: 'Ready to Eat',
    subtitle: 'Prepared Fresh',
    description: 'Delicious meals ready to enjoy - made fresh daily'
  }
};

export default function CategorySection({ category, products }) {
  const info = categoryInfo[category] || { title: category, subtitle: '', description: '' };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-16"
    >
      <div className="mb-8">
        <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-xs font-medium">
          {info.subtitle}
        </span>
        <h2 className="text-3xl font-light text-[#1a2e45] mt-2">
          {info.title}
        </h2>
        <p className="text-[#1a2e45]/60 mt-2">{info.description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>
    </motion.div>
  );
}