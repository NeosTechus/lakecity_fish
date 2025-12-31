import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';

export default function OrderConfirmation() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center py-12 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-light text-[#1a2e45] mb-4">
            Order Confirmed!
          </h1>
          <p className="text-lg text-[#1a2e45]/70 mb-8">
            Thank you for your order. We've sent a confirmation email with all the details.
          </p>

          <div className="bg-[#f8f9fa] rounded-lg p-6 mb-8 text-left">
            <h2 className="font-semibold text-[#1a2e45] mb-4 text-center">
              Pickup Information
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1a2e45]">Soulard Market</p>
                  <p className="text-sm text-gray-600">730 Carroll St.</p>
                  <p className="text-sm text-gray-600">St. Louis, MO 63104</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1a2e45]">Call if you have questions</p>
                  <a href="tel:3145825011" className="text-sm text-[#d4a84b] hover:underline">
                    (314) 582-5011
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#d4a84b] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#1a2e45]">Confirmation sent</p>
                  <p className="text-sm text-gray-600">Check your email for details</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Link href={createPageUrl('Menu')} className="block">
              <Button className="w-full bg-[#d4a84b] hover:bg-[#e5b95c] text-[#1a2e45]">
                Continue Shopping
              </Button>
            </Link>
            <Link href={createPageUrl('Home')} className="block">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}