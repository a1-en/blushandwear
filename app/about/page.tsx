'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Leaf, Award, Heart, Sparkles, Star, Users, Clock } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#faf9f6]">
            <Navbar />

            {/* Hero Section - Elegant and Minimal */}
            <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden">
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="inline-block mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <span className="py-2 px-6 rounded-full border border-[#d4af37]/30 text-[#d4af37] text-xs font-bold uppercase tracking-[0.2em] bg-white/50 backdrop-blur-sm">
                            Since 2024
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#1a1a1a] mb-8 tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        The Art of <br className="hidden md:block" />
                        <span className="italic text-[#d4af37]">Radiance</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-gray-500 text-lg md:text-xl font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Blush & Wear was founded on a simple yet profound belief: that beauty is an expression of self-love. We craft premium cosmetics that honor your skin and elevate your everyday rituals.
                    </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                    <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-[#fdf2f2] rounded-full blur-[100px] opacity-60"></div>
                    <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-[#d4af37]/10 rounded-full blur-[80px] opacity-60"></div>
                </div>
            </section>

            {/* Visual Story Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative order-2 lg:order-1 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2670&auto=format&fit=crop"
                                    alt="Our Philosophy"
                                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>
                            {/* Floating Card */}
                            <div className="absolute -bottom-12 -right-12 md:bottom-12 md:-right-12 bg-white p-8 rounded-[2rem] shadow-xl max-w-xs border border-[#d4af37]/10 animate-in fade-in zoom-in duration-1000 delay-500 hidden md:block">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#fdf2f2] flex items-center justify-center text-[#d4af37]">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Excellence</p>
                                        <p className="font-serif font-bold text-[#1a1a1a]">Award Winning</p>
                                    </div>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed mb-4">Recognized for our commitment to clean beauty and sustainable luxury.</p>
                                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="w-3/4 h-full bg-[#d4af37]"></div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8 animate-in fade-in slide-in-from-right duration-1000 delay-300">
                            <span className="text-[#d4af37] font-bold tracking-[0.2em] text-xs uppercase flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-[#d4af37]"></span> Our Philosophy
                            </span>
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight">
                                Beauty Without <br /> Compromise
                            </h2>
                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                We believe you shouldn't have to choose between high-performance formulas and clean ingredients. Our products are meticulously crafted in our atelier, merging nature's most potent botanicals with cutting-edge skincare science.
                            </p>
                            <p className="text-gray-600 text-lg leading-relaxed font-light">
                                Every texture, every scent, and every pigment is designed to be an experience. We don't just sell cosmetics; we offer a moment of luxury in your daily life.
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-8">
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-serif font-bold text-[#d4af37]">100%</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Vegan Formulas</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-3xl font-serif font-bold text-[#d4af37]">Zero</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Harmful Toxins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 bg-[#1a1a1a] text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-[#d4af37] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold">The Pillars of Perfection</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: Leaf, title: "Clean Beauty", desc: "Sourced responsibly, free from parabens and sulfates." },
                            { icon: Clock, title: "Long Lasting", desc: "Formulated to stay flawless from dawn to dusk." },
                            { icon: Heart, title: "Cruelty Free", desc: "Never tested on animals, always kind to the earth." },
                            { icon: Star, title: "Premium Quality", desc: "Small-batch production ensuring highest standards." }
                        ].map((item, index) => (
                            <div key={index} className="group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-[#d4af37] transition-all duration-500 hover:-translate-y-2">
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-[#d4af37] group-hover:bg-white group-hover:text-[#d4af37] transition-colors">
                                    <item.icon size={32} strokeWidth={1} />
                                </div>
                                <h3 className="text-xl font-serif font-bold mb-4">{item.title}</h3>
                                <p className="text-white/60 font-light leading-relaxed group-hover:text-white/90 transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-32 px-6 bg-[#fdf2f2]/30">
                <div className="max-w-4xl mx-auto text-center">
                    <Sparkles className="mx-auto text-[#d4af37] mb-8" size={40} />
                    <blockquote className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] leading-tight mb-12">
                        "True luxury is not about exclusivity, but about the feeling of being completely and utterly <span className="text-[#d4af37] italic">yourself</span>."
                    </blockquote>
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#d4af37]">
                            <img src="https://images.unsplash.com/photo-1596462502278-27bfdd403348?q=80&w=2574&auto=format&fit=crop" alt="Founder" className="w-full h-full object-cover" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-[#1a1a1a]">Isabella Rose</div>
                            <div className="text-xs text-[#d4af37] uppercase tracking-widest font-bold">Founder & CEO</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
