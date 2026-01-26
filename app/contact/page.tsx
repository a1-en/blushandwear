'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone, Send, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function ContactPage() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        toast.success('Message sent! We will get back to you shortly.');
        setLoading(false);
        (e.target as HTMLFormElement).reset();
    };

    return (
        <main className="min-h-screen bg-[#fdf2f2]/10">
            <Navbar />

            {/* Header Section */}
            <div className="pt-40 pb-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d4af37]/20 to-transparent"></div>
                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <span className="text-[#d4af37] font-bold tracking-widest text-xs uppercase mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                        Get in Touch
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-[#1a1a1a] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                        Contact Us
                    </h1>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                        We are here to assist you with any inquiries regarding our products, orders, or bespoke services.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                    {/* Contact Info */}
                    <div className="animate-in fade-in slide-in-from-left duration-700 delay-300">
                        <h2 className="text-3xl font-serif font-bold mb-8">Client Services</h2>
                        <div className="space-y-8">
                            <div className="flex items-start group">
                                <div className="w-12 h-12 bg-white border border-[#d4af37]/20 rounded-full flex items-center justify-center mr-6 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email Us</h3>
                                    <p className="text-gray-500 text-sm mb-1">For general inquiries and support</p>
                                    <a href="mailto:concierge@blushandwear.com" className="text-[#d4af37] font-semibold hover:underline">concierge@blushandwear.com</a>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="w-12 h-12 bg-white border border-[#d4af37]/20 rounded-full flex items-center justify-center mr-6 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                                    <Phone size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Call Us</h3>
                                    <p className="text-gray-500 text-sm mb-1">Mon-Fri from 9am to 6pm EST</p>
                                    <a href="tel:+18001234567" className="text-[#d4af37] font-semibold hover:underline">+1 (800) 123-4567</a>
                                </div>
                            </div>

                            <div className="flex items-start group">
                                <div className="w-12 h-12 bg-white border border-[#d4af37]/20 rounded-full flex items-center justify-center mr-6 group-hover:bg-[#d4af37] group-hover:text-white transition-all duration-500">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Visit Our Boutique</h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        123 Luxury Avenue, Suite 100<br />
                                        Beverly Hills, CA 90210
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-16 p-8 bg-white border border-[#d4af37]/10 rounded-2xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="font-serif font-bold text-xl mb-4">FAQ</h3>
                                <p className="text-gray-500 text-sm mb-6">Find answers to common questions about shipping, returns, and product details.</p>
                                <button className="text-[#d4af37] font-bold text-xs uppercase tracking-widest flex items-center hover:opacity-70 transition-opacity">
                                    View FAQ <MessageSquare size={14} className="ml-2" />
                                </button>
                            </div>
                            <div className="absolute -bottom-10 -right-10 text-[#fdf2f2] opacity-50">
                                <MessageSquare size={150} />
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#d4af37]/10 animate-in fade-in slide-in-from-right duration-700 delay-300">
                        <h2 className="text-2xl font-serif font-bold mb-8">Send a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#d4af37] px-4 py-3 rounded-t-lg outline-none transition-colors"
                                        placeholder="Jane"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#d4af37] px-4 py-3 rounded-t-lg outline-none transition-colors"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#d4af37] px-4 py-3 rounded-t-lg outline-none transition-colors"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Subject</label>
                                <select className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#d4af37] px-4 py-3 rounded-t-lg outline-none transition-colors text-gray-600">
                                    <option>General Inquiry</option>
                                    <option>Order Status</option>
                                    <option>Product Advice</option>
                                    <option>Returns & Exchanges</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-gray-50 border-b-2 border-transparent focus:border-[#d4af37] px-4 py-3 rounded-t-lg outline-none transition-colors resize-none"
                                    placeholder="How can we help you today?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full gold-button py-4 rounded-xl font-bold text-sm tracking-widest uppercase mt-4 flex items-center justify-center disabled:opacity-70 group"
                            >
                                {loading ? 'Sending...' : (
                                    <>
                                        Send Message <Send size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
