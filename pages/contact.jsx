import React from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Star, ChevronRight } from 'lucide-react';
const LeafletMap = dynamic(() => import('@/components/contact/LeafletMap'), { ssr: false });

export default function Contact() {

return (
<div className="min-h-screen bg-white">
    {/* Hero */}
    <section className="bg-[#1a2e45] py-24">
        <div className="max-w-7xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <span className="text-[#d4a84b] uppercase tracking-[0.2em] text-sm font-medium">
                    Soulard Farmers Market
                </span>
                <h1 className="text-5xl md:text-6xl font-light text-white mt-4 mb-6">
                    Visit Us
                </h1>
                <p className="text-white/60 text-lg max-w-2xl mx-auto">
                    Find us at the historic Soulard Farmers Market,
                    one of the oldest public markets west of the Mississippi
                </p>
            </motion.div>
        </div>
    </section>

    {/* Content */}
    <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
                {/* Left - Info */}
                <div>
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                        {/* Location */}
                        <div className="flex gap-6 p-6 bg-[#f8f9fa]">
                            <div
                                className="w-14 h-14 bg-[#1a2e45] rounded-full flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-[#d4a84b]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#1a2e45] mb-2">Location</h3>
                                <p className="text-[#1a2e45]/70">Soulard Market</p>
                                <p className="text-[#1a2e45]/70">730 Carroll St.</p>
                                <p className="text-[#1a2e45]/70">St. Louis, MO 63104</p>
                                <a href="https://maps.google.com/?q=730+Carroll+St+St+Louis+MO+63104" target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 text-[#d4a84b] font-medium mt-3 hover:underline">
                                    Get Directions
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Hours */}
                        <div className="flex gap-6 p-6 bg-[#f8f9fa]">
                            <div
                                className="w-14 h-14 bg-[#1a2e45] rounded-full flex items-center justify-center flex-shrink-0">
                                <Clock className="w-6 h-6 text-[#d4a84b]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#1a2e45] mb-2">Market Hours</h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-[#1a2e45]/70">Thursday</span>
                                        <span className="text-[#1a2e45] font-medium">9:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#1a2e45]/70">Friday</span>
                                        <span className="text-[#1a2e45] font-medium">9:00 AM - 5:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-[#1a2e45]/70">Saturday</span>
                                        <span className="text-[#1a2e45] font-medium">9:00 AM - 5:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex gap-6 p-6 bg-[#f8f9fa]">
                            <div
                                className="w-14 h-14 bg-[#1a2e45] rounded-full flex items-center justify-center flex-shrink-0">
                                <Phone className="w-6 h-6 text-[#d4a84b]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-[#1a2e45] mb-2">Call Us</h3>
                                <a href="tel:3145825011" className="text-2xl text-[#d4a84b] font-light hover:underline">
                                    (314) 582-5011
                                </a>
                                <p className="text-[#1a2e45]/60 text-sm mt-2">
                                    Call ahead for special orders or current market prices
                                </p>
                            </div>
                        </div>

                        {/* Special */}
                        <div className="p-6 bg-[#d4a84b]">
                            <div className="flex items-start gap-4">
                                <Star className="w-6 h-6 text-[#1a2e45] flex-shrink-0" />
                                <div>
                                    <h3 className="text-xl font-semibold text-[#1a2e45] mb-2">
                                        Thursday Specials
                                    </h3>
                                    <p className="text-[#1a2e45]/80">
                                        10% discount for Seniors & Veterans every Thursday.
                                        We're proud to support our community!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right - Map */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    className="h-[500px] lg:h-full min-h-[400px] relative z-0">
                    <LeafletMap />
                </motion.div>
            </div>
        </div>
    </section>

    {/* Bottom CTA */}
    <section className="py-16 bg-[#1a2e45]">
        <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-light text-white mb-4">
                Fresh Wild-Caught Seafood Daily
            </h2>
            <p className="text-white/60 mb-8">
                From Kentucky Lake to your table - experience the difference of truly fresh,
                sustainably sourced seafood.
            </p>
            <a href="tel:3145825011"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#d4a84b] text-[#1a2e45] font-semibold hover:bg-[#e5b95c] transition-all">
                <Phone className="w-5 h-5" />
                Call to Order
            </a>
        </div>
    </section>
</div>
);
}