import React from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import CategorySection from '@/components/menu/CategorySection';

export default function Menu() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list()
  });

  // Group products by category
  const grouped = products.reduce((acc, product) => {
    const cat = product.category || 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {});

  const categoryOrder = ['catfish', 'jack_salmon', 'buffalo', 'market_price'];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero */}
      <section className="bg-[#1a2e45] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
              Fresh Daily
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-4 mb-6">
              Our Menu
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Wild-caught seafood from Kentucky Lake, priced per pound. 
              Market price items vary daily - call for current pricing.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-[#d4a84b]" />
            </div>
          ) : (
            <>
              {categoryOrder.map(cat => 
                grouped[cat]?.length > 0 && (
                  <CategorySection 
                    key={cat} 
                    category={cat} 
                    products={grouped[cat]} 
                  />
                )
              )}
            </>
          )}

          {/* Note */}
          <div className="mt-16 p-8 bg-[#1a2e45] text-center">
            <p className="text-[#d4a84b] font-semibold mb-2">
              10% Discount Every Thursday
            </p>
            <p className="text-white/70">
              Seniors & Veterans receive 10% off their entire purchase
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}