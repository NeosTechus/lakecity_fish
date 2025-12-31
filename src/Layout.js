import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { CartProvider, useCart } from '@/components/cart/CartContext';
import CartSidebar from '@/components/cart/CartSidebar';
import { Toaster } from 'sonner';

function LayoutContent({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getCartCount } = useCart();

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'Menu', page: 'Menu' },
    { name: 'Contact', page: 'Contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2e45]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href={createPageUrl('Home')} className="flex items-center gap-3">
              <svg className="w-10 h-6 text-[#d4a84b]" viewBox="0 0 50 25" fill="currentColor">
                <ellipse cx="18" cy="12.5" rx="15" ry="10" />
                <polygon points="33,5 45,12.5 33,20" />
              </svg>
              <div>
                <span className="text-white font-light tracking-wider text-sm">LAKE CITY</span>
                <span className="text-[#d4a84b] font-serif italic text-lg ml-1">Fish</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  href={createPageUrl(link.page)}
                  className={`text-sm tracking-wide transition-colors ${
                    currentPageName === link.page
                      ? 'text-[#d4a84b]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-white/70 hover:text-white transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4a84b] text-[#1a2e45] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>

              <a
                href="tel:3145825011"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#d4a84b] text-[#1a2e45] text-sm font-semibold hover:bg-[#e5b95c] transition-colors"
              >
                <Phone className="w-4 h-4" />
                (314) 582-5011
              </a>
            </nav>

            {/* Mobile Menu & Cart Buttons */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={() => setCartOpen(true)} className="relative p-2 text-white">
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d4a84b] text-[#1a2e45] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1a2e45] border-t border-white/10"
            >
              <div className="px-6 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    href={createPageUrl(link.page)}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block py-2 text-lg ${
                      currentPageName === link.page ? 'text-[#d4a84b]' : 'text-white/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="tel:3145825011"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#d4a84b] text-[#1a2e45] font-semibold mt-4"
                >
                  <Phone className="w-4 h-4" />
                  (314) 582-5011
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 pt-20">{children}</main>

      {/* Footer */}
      <footer className="bg-[#0f1c2a] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-10 h-6 text-[#d4a84b]" viewBox="0 0 50 25" fill="currentColor">
                  <ellipse cx="18" cy="12.5" rx="15" ry="10" />
                  <polygon points="33,5 45,12.5 33,20" />
                </svg>
                <div>
                  <span className="text-white font-light tracking-wider text-sm">LAKE CITY</span>
                  <span className="text-[#d4a84b] font-serif italic text-lg ml-1">Fish</span>
                </div>
              </div>
              <p className="text-white/50 text-sm">
                Fresh wild-caught seafood daily from Kentucky Lake to St. Louis.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Hours</h4>
              <p className="text-white/50 text-sm">Thursday - Saturday</p>
              <p className="text-white/50 text-sm">9:00 AM - 5:00 PM</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Location</h4>
              <p className="text-white/50 text-sm">Soulard Market</p>
              <p className="text-white/50 text-sm">730 Carroll St.</p>
              <p className="text-white/50 text-sm">St. Louis, MO 63104</p>
            </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-8 text-center">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} Lake City Fish. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  return (
    <CartProvider>
      <LayoutContent currentPageName={currentPageName}>{children}</LayoutContent>
    </CartProvider>
  );
}
