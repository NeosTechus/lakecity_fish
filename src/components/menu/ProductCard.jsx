import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Info, Plus } from 'lucide-react';
import { useCart } from '@/components/cart/CartContext';
import { Button } from '@/components/ui/button';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const [showProtein, setShowProtein] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group relative bg-white border border-gray-100 hover:border-[#d4a84b]/30 hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setShowProtein(true)}
      onMouseLeave={() => setShowProtein(false)}
    >
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-[#1a2e45]/5">
        {product.image && !imgError ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a2e45]/10 to-[#d4a84b]/10">
            <svg className="w-16 h-10 text-[#1a2e45]/20" viewBox="0 0 80 50" fill="currentColor">
              <ellipse cx="30" cy="25" rx="25" ry="16" />
              <polygon points="55,10 75,25 55,40" />
            </svg>
          </div>
        )}

        {/* Protein Info Badge - Shows on Hover */}
        {product.protein_per_serving && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showProtein ? 1 : 0, scale: showProtein ? 1 : 0.8 }}
            className="absolute top-3 right-3 bg-[#d4a84b] text-[#1a2e45] px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg z-10 flex items-center gap-1"
          >
            <Info className="w-3 h-3" />
            {product.protein_per_serving}g protein
          </motion.div>
        )}

        {/* Price overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-3">
          {product.price ? (
            <p className="text-2xl font-light text-white drop-shadow-lg">
              ${product.price.toFixed(2)}
              <span className="text-sm text-white/70 ml-1">/ {product.unit}</span>
            </p>
          ) : (
            <p className="text-[#d4a84b] text-sm font-medium uppercase tracking-wider drop-shadow-lg">
              Market Price
            </p>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-[#1a2e45] group-hover:text-[#d4a84b] transition-colors">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-[#1a2e45]/60 text-sm mt-1">
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
