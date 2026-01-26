import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail, ArrowRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#0F0F0F] text-[#FAF9F6] pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 mb-20 text-center md:text-left">
                    {/* Brand & Mission */}
                    <div className="md:col-span-4 flex flex-col items-center md:items-start">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-3xl font-serif text-gradient font-bold tracking-[-0.05em]">
                                Blush&Wear
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed font-light tracking-wide max-w-sm mb-10 mx-auto md:mx-0">
                            The definitive destination for premium cosmetics. We craft an experience that transcends beauty, where every application is a ceremony of self-love and sophistication.
                        </p>
                        <div className="flex space-x-6 justify-center md:justify-start w-full">
                            <Instagram size={18} className="text-white/40 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                            <Twitter size={18} className="text-white/40 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                            <Facebook size={18} className="text-white/40 hover:text-[#D4AF37] transition-colors cursor-pointer" />
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div className="md:col-span-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8">Collections</h3>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Shop All</Link></li>
                            <li><Link href="/products?category=skincare" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Skincare</Link></li>
                            <li><Link href="/products?category=makeup" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Makeup</Link></li>
                            <li><Link href="/about" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Our Story</Link></li>
                        </ul>
                    </div>

                    {/* Assistance */}
                    <div className="md:col-span-2">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8">Assistance</h3>
                        <ul className="space-y-4">
                            <li><Link href="/contact" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Contact Us</Link></li>
                            <li><Link href="/shipping" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Bespoke Shipping</Link></li>
                            <li><Link href="/returns" className="text-white/60 hover:text-white text-xs font-light tracking-[0.1em] transition-colors uppercase">Care & Returns</Link></li>
                        </ul>
                    </div>

                    {/* The Inner Circle (Newsletter) */}
                    <div className="md:col-span-4">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37] mb-8 text-center md:text-left">The Inner Circle</h3>
                        <p className="text-white/60 text-sm mb-6 font-light tracking-wide text-center md:text-left">Join our community for private access to new collections and exclusive events.</p>
                        <form className="relative group max-w-md mx-auto md:mx-0">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full bg-transparent border-b border-white/20 py-4 pr-10 text-sm font-light tracking-widest focus:outline-none focus:border-[#D4AF37] transition-all placeholder:text-white/20 text-center md:text-left"
                            />
                            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-[#D4AF37] transition-all">
                                <ArrowRight size={20} strokeWidth={1} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em]">© 2024 Blush&Wear • All rights reserved</p>
                    <div className="flex space-x-12">
                        <Link href="/privacy" className="text-[10px] text-white/30 hover:text-white uppercase tracking-[0.2em] transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-[10px] text-white/30 hover:text-white uppercase tracking-[0.2em] transition-colors">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
