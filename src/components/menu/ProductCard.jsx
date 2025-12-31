import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Plus } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [showProtein, setShowProtein] = useState(false);
  const priceLabel =
    typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : 'Market Price';
  const unitLabel = product.unit ? ` / ${product.unit}` : '';

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white border border-gray-100 hover:border-[#d4a84b]/30 hover:shadow-lg transition-all duration-300 p-6"
      onMouseEnter={() => setShowProtein(true)}
      onMouseLeave={() => setShowProtein(false)}
      >
        {/* Protein Info Badge - Shows on Hover */}
        {product.protein_per_serving && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showProtein ? 1 : 0, scale: showProtein ? 1 : 0.8 }}
            className="absolute top-4 right-4 bg-[#d4a84b] text-[#1a2e45] px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10 flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            {product.protein_per_serving}g protein
          </motion.div>
        )}

        <div className="flex flex-col h-full">
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#1a2e45] group-hover:text-[#d4a84b] transition-colors">
                  {product.name}
                </h3>
                <p className="text-[#1a2e45]/50 text-sm mt-1">
                  {product.unit}
                </p>
              </div>
              <div className="text-right ml-4">
                {product.price ? (
                  <p className="text-2xl font-light text-[#d4a84b]">
                    ${product.price.toFixed(2)}
                  </p>
                ) : (
                  <p className="text-[#d4a84b] text-sm font-medium uppercase tracking-wider">
                    Market Price
                  </p>
                )}
              </div>
            </div>

            {product.description && (
              <p className="text-[#1a2e45]/60 text-sm mb-4">
                {product.description}
              </p>
            )}
          </div>

          {/* Add to Cart Button */}
          {product.price && (
            <Button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-[#1a2e45] hover:bg-[#d4a84b] text-white hover:text-[#1a2e45] transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add to Cart
            </Button>
          )}

          {!product.price && (
            <div className="mt-4 text-center">
              <a
                href="tel:3145825011"
                className="text-[#d4a84b] text-sm font-medium hover:underline"
              >
                Call for pricing
              </a>
            </div>
          )}
        </div>
      </motion.div>
  );
}
