import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, User } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { createPageUrl } from '@/utils';
import { useAuth } from '@/components/auth/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === 'signin') {
        const user = await login(formData.email, formData.password);
        toast.success(`Welcome back, ${user.name}!`);
        redirectByRole(user.role);
      } else {
        if (!formData.name) {
          toast.error('Please enter your name');
          setIsSubmitting(false);
          return;
        }
        const user = await register(formData.name, formData.email, formData.password);
        toast.success(`Account created! Welcome, ${user.name}`);
        redirectByRole(user.role);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectByRole = (role) => {
    switch (role) {
      case 'admin':
        router.push(createPageUrl('AdminDashboard'));
        break;
      case 'kitchen':
        router.push(createPageUrl('KitchenDashboard'));
        break;
      default:
        router.push(createPageUrl('Home'));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Hero Banner */}
      <section className="bg-[#1a2e45] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
              Account
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-white mt-4 mb-4">
              Welcome
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Sign in to track orders and enjoy faster checkout
            </p>
          </motion.div>
        </div>
      </section>

      {/* Login Card */}
      <section className="py-16">
        <div className="max-w-md mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white border border-gray-100 shadow-sm">
              <div className="p-8">
                {/* Sign In / Sign Up Tabs */}
                <div className="flex border border-gray-200 mb-8">
                  <button
                    onClick={() => setActiveTab('signin')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                      activeTab === 'signin'
                        ? 'bg-[#1a2e45] text-white'
                        : 'bg-white text-[#1a2e45]/60 hover:bg-gray-50'
                    }`}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </button>
                  <button
                    onClick={() => setActiveTab('signup')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                      activeTab === 'signup'
                        ? 'bg-[#1a2e45] text-white'
                        : 'bg-white text-[#1a2e45]/60 hover:bg-gray-50'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    Sign Up
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {activeTab === 'signup' && (
                    <div>
                      <label className="block text-xs uppercase tracking-[0.15em] text-[#1a2e45]/50 font-medium mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a2e45]/30" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 bg-[#f8f9fa] border border-gray-200 text-[#1a2e45] placeholder:text-[#1a2e45]/30 focus:outline-none focus:border-[#d4a84b] focus:ring-1 focus:ring-[#d4a84b] transition-colors"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-[#1a2e45]/50 font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a2e45]/30" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-[#f8f9fa] border border-gray-200 text-[#1a2e45] placeholder:text-[#1a2e45]/30 focus:outline-none focus:border-[#d4a84b] focus:ring-1 focus:ring-[#d4a84b] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.15em] text-[#1a2e45]/50 font-medium mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a2e45]/30" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="w-full pl-10 pr-12 py-3 bg-[#f8f9fa] border border-gray-200 text-[#1a2e45] placeholder:text-[#1a2e45]/30 focus:outline-none focus:border-[#d4a84b] focus:ring-1 focus:ring-[#d4a84b] transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1a2e45]/30 hover:text-[#1a2e45] transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-[#d4a84b] hover:bg-[#e5b95c] text-[#1a2e45] font-semibold tracking-wide transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting
                      ? 'Please wait...'
                      : activeTab === 'signin'
                        ? 'SIGN IN'
                        : 'CREATE ACCOUNT'
                    }
                  </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-[#1a2e45]/30 text-xs uppercase tracking-[0.15em]">or continue with</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 py-3 border border-gray-200 hover:bg-[#f8f9fa] hover:border-gray-300 transition-colors"
                  onClick={() => toast.info('Google sign-in coming soon!')}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                  </svg>
                  <span className="text-[#1a2e45] font-medium text-sm">Sign in with Google</span>
                </button>
              </div>
            </div>

            {/* Guest Link */}
            <p className="text-center text-[#1a2e45]/40 text-sm mt-6">
              You can also{' '}
              <Link href={createPageUrl('Menu')} className="text-[#d4a84b] font-medium hover:underline">
                browse as a guest
              </Link>
              {' '}and create an account later
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
