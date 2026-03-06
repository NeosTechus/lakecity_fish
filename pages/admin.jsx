import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Package, Users, DollarSign, ClipboardList, BarChart3 } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import Link from 'next/link';
import { createPageUrl } from '@/utils';

export default function AdminDashboard() {
  const { user, isAuthenticated, isAdmin } = useAuth();

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
            <Shield className="w-10 h-10 text-[#d4a84b]" />
            <div>
              <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-xs font-medium">
                Management
              </span>
              <h1 className="text-3xl font-light text-white mt-1">Admin Dashboard</h1>
              <p className="text-white/60 mt-1">
                {isAuthenticated ? `Welcome back, ${user.name}` : 'Overview of store management'}
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
                  Sign in as Admin
                </Link>
                {' '}to manage products, orders, and users.
              </p>
            </motion.div>
          )}

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { label: 'Total Products', value: '25', sub: 'Across 5 categories' },
              { label: 'Pending Orders', value: '0', sub: 'No orders yet' },
              { label: 'Registered Users', value: '—', sub: 'Connect MongoDB to view' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 border border-gray-100"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-[#1a2e45]/40 font-medium">{stat.label}</p>
                <p className="text-3xl font-light text-[#1a2e45] mt-2">{stat.value}</p>
                <p className="text-sm text-[#1a2e45]/40 mt-1">{stat.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Management Sections */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Package,
                title: 'Products',
                desc: 'Manage menu items, pricing, and categories',
              },
              {
                icon: DollarSign,
                title: 'Orders',
                desc: 'View and manage customer orders',
              },
              {
                icon: Users,
                title: 'Users',
                desc: 'Manage staff and customer accounts',
              },
              {
                icon: ClipboardList,
                title: 'Kitchen Queue',
                desc: 'Monitor active kitchen orders',
                link: createPageUrl('KitchenDashboard'),
              },
              {
                icon: BarChart3,
                title: 'Analytics',
                desc: 'Sales reports and insights',
              },
              {
                icon: Shield,
                title: 'Settings',
                desc: 'Store configuration and preferences',
              },
            ].map((item, i) => {
              const Icon = item.icon;
              const Wrapper = item.link ? Link : 'div';
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                >
                  <Wrapper
                    {...(item.link ? { href: item.link } : {})}
                    className="block bg-white p-6 border border-gray-100 hover:border-[#d4a84b]/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <Icon className="w-8 h-8 text-[#d4a84b] mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg font-semibold text-[#1a2e45]">{item.title}</h3>
                    <p className="text-[#1a2e45]/60 text-sm mt-1">{item.desc}</p>
                  </Wrapper>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
