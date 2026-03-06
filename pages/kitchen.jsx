import React from 'react';
import { motion } from 'framer-motion';
import { ChefHat, ClipboardList, Clock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function KitchenDashboard() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero */}
      <section className="bg-[#1a2e45] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4"
          >
            <ChefHat className="w-10 h-10 text-[#d4a84b]" />
            <div>
              <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-xs font-medium">
                Kitchen
              </span>
              <h1 className="text-3xl font-light text-white mt-1">Kitchen Dashboard</h1>
              <p className="text-white/60 mt-1">
                {isAuthenticated ? `Welcome, ${user.name}` : 'Order preparation overview'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {!isAuthenticated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-8 p-4 bg-[#d4a84b]/10 border border-[#d4a84b]/30"
            >
              <p className="text-[#1a2e45] text-sm">
                <Link href={createPageUrl('Login')} className="text-[#d4a84b] font-semibold hover:underline">
                  Sign in as Kitchen staff
                </Link>
                {' '}to manage and update orders.
              </p>
            </motion.div>
          )}

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Pending', value: '0', color: '#d4a84b' },
              { label: 'In Progress', value: '0', color: '#3b82f6' },
              { label: 'Completed Today', value: '0', color: '#22c55e' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.15em] text-[#1a2e45]/40 font-medium">{stat.label}</p>
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                </div>
                <p className="text-4xl font-light text-[#1a2e45] mt-3">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          {/* Order Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <ClipboardList className="w-5 h-5 text-[#d4a84b]" />
                <h3 className="text-lg font-semibold text-[#1a2e45]">Incoming Orders</h3>
              </div>
              <div className="p-8 text-center">
                <ClipboardList className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-[#1a2e45]/30 text-sm">No pending orders</p>
                <p className="text-[#1a2e45]/20 text-xs mt-1">New orders will appear here</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-100"
            >
              <div className="p-6 border-b border-gray-100 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#d4a84b]" />
                <h3 className="text-lg font-semibold text-[#1a2e45]">Completed Today</h3>
              </div>
              <div className="p-8 text-center">
                <Clock className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                <p className="text-[#1a2e45]/30 text-sm">No completed orders yet</p>
                <p className="text-[#1a2e45]/20 text-xs mt-1">Completed orders will show here</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
