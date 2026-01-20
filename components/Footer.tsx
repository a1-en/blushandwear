import Link from 'next/link';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-1">
                        <h2 className="text-2xl font-serif text-[#d4af37] font-bold mb-6">BLUSH & WEAR</h2>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Experience the ultimate expression of beauty. Premium, ethical, and elegant cosmetics for the modern individual.
                        </p>
                        <div className="flex space-x-4">
                            <Instagram size={20} className="text-gray-400 hover:text-[#d4af37] cursor-pointer" />
                            <Twitter size={20} className="text-gray-400 hover:text-[#d4af37] cursor-pointer" />
                            <Facebook size={20} className="text-gray-400 hover:text-[#d4af37] cursor-pointer" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37] mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-gray-400 hover:text-white text-sm transition-colors">Shop All</Link></li>
                            <li><Link href="/products?category=best-sellers" className="text-gray-400 hover:text-white text-sm transition-colors">Best Sellers</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">Our Story</Link></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37] mb-6">Customer Care</h3>
                        <ul className="space-y-4">
                            <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</Link></li>
                            <li><Link href="/shipping" className="text-gray-400 hover:text-white text-sm transition-colors">Shipping Info</Link></li>
                            <li><Link href="/returns" className="text-gray-400 hover:text-white text-sm transition-colors">Returns & Exchanges</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-[#d4af37] mb-6">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive offers and news.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-sm focus:outline-none focus:border-[#d4af37] transition-all"
                            />
                            <button className="absolute right-2 top-1.5 bg-[#d4af37] p-1.5 rounded-full hover:bg-white hover:text-[#d4af37] transition-all">
                                <Mail size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
                    <p>© 2024 BLUSH & WEAR. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
