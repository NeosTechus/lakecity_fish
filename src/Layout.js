import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPageUrl } from "@/utils";
import { CartProvider, useCart } from "@/components/cart/CartContext";
import CartSidebar from "@/components/cart/CartSidebar";
import { Toaster } from "sonner";

function LayoutContent({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { getCartCount } = useCart();

  const navLinks = [
    { name: "Home", page: "Home" },
    { name: "Menu", page: "Menu" },
    { name: "Contact", page: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a2e45]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href={createPageUrl("Home")}
              className="flex items-center gap-4"
            >
              {/* Main Logo Mark */}
              <div className="flex flex-col items-center py-1">
                {/* LAKE CITY */}
                <span
                  className="text-white tracking-[0.35em] text-[11px]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 400,
                  }}
                >
                  LAKE CITY
                </span>

                {/* Fish illustration */}
                <svg
                  className="w-16 h-[10px] my-[2px]"
                  viewBox="0 0 80 14"
                  fill="none"
                >
                  <path
                    d="M12,7 C16,3 26,1.5 38,3.5 C46,4.5 52,6 56,7 C52,8 46,9.5 38,10.5 C26,12.5 16,11 12,7Z"
                    fill="rgba(255,255,255,0.55)"
                  />
                  <path
                    d="M56,7 L66,2.5 L66,11.5 Z"
                    fill="rgba(255,255,255,0.55)"
                  />
                  <circle cx="20" cy="6" r="1" fill="#1a2e45" />
                  <path
                    d="M30,5 Q33,3.5 36,5.5"
                    stroke="rgba(26,46,69,0.35)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                  <path
                    d="M38,5.5 Q41,4 44,6"
                    stroke="rgba(26,46,69,0.35)"
                    strokeWidth="0.5"
                    fill="none"
                  />
                </svg>

                {/* Fish script text */}
                <span
                  className="text-[#d4a84b] text-[22px] leading-none -mt-[2px]"
                  style={{
                    fontFamily: "'Dancing Script', cursive",
                    fontWeight: 700,
                  }}
                >
                  Fish
                </span>

                {/* Tagline */}
                <span
                  className="text-white/45 text-[5.5px] tracking-[0.12em] uppercase mt-[2px]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Fresh Wild&middot;Caught Seafood Daily
                </span>
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
                      ? "text-[#d4a84b]"
                      : "text-white/70 hover:text-white"
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
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-white"
              >
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
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
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
                      currentPageName === link.page
                        ? "text-[#d4a84b]"
                        : "text-white/70"
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
              <div className="flex items-center gap-4 mb-4">
                {/* Footer Logo - matching header style */}
                <div className="flex flex-col items-center py-1">
                  <span
                    className="text-white tracking-[0.35em] text-[10px]"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 400,
                    }}
                  >
                    LAKE CITY
                  </span>
                  <svg
                    className="w-12 h-[8px] my-[2px]"
                    viewBox="0 0 80 14"
                    fill="none"
                  >
                    <path
                      d="M12,7 C16,3 26,1.5 38,3.5 C46,4.5 52,6 56,7 C52,8 46,9.5 38,10.5 C26,12.5 16,11 12,7Z"
                      fill="rgba(255,255,255,0.45)"
                    />
                    <path
                      d="M56,7 L66,2.5 L66,11.5 Z"
                      fill="rgba(255,255,255,0.45)"
                    />
                    <circle cx="20" cy="6" r="1" fill="#0f1c2a" />
                  </svg>
                  <span
                    className="text-[#d4a84b] text-lg leading-none -mt-[1px]"
                    style={{
                      fontFamily: "'Dancing Script', cursive",
                      fontWeight: 700,
                    }}
                  >
                    Fish
                  </span>
                  <span
                    className="text-white/35 text-[5px] tracking-[0.1em] uppercase mt-[1px]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Fresh Wild&middot;Caught Seafood Daily
                  </span>
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
      <LayoutContent currentPageName={currentPageName}>
        {children}
      </LayoutContent>
    </CartProvider>
  );
}
