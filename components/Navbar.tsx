'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, User, LogOut, Menu, X, LayoutDashboard, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-[#D4AF37]/20 py-1' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex justify-between items-center h-20">
                    {/* Desktop Menu - Left */}
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="/products" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">SHOP ALL</Link>
                        <Link href="/products?category=skincare" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">SKINCARE</Link>
                        <Link href="/products?category=makeup" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">MAKEUP</Link>
                    </div>

                    {/* Logo - Center */}
                    <Link href="/" className="flex-shrink-0 flex items-center absolute left-1/2 -translate-x-1/2">
                        <span className="text-3xl font-serif text-gradient font-bold tracking-[-0.05em]">
                            Blush&Wear
                        </span>
                    </Link>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-8">
                        <button className="hidden md:block group p-1">
                            <Search size={20} className="group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                        </button>

                        <Link href="/cart" className="relative group p-1">
                            <ShoppingBag size={20} className="group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {session ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 p-1">
                                    <User size={20} className="group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                                </button>

                                {/* Premium Dropdown */}
                                <div className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-md rounded-sm shadow-2xl border border-[#D4AF37]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right py-4 z-50">
                                    <div className="px-5 pb-3 mb-3 border-b border-gray-100">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                        <p className="text-sm font-semibold truncate">{session.user?.name}</p>
                                    </div>
                                    <div className="space-y-1">
                                        {(session.user as any).role === 'ADMIN' && (
                                            <Link href="/admin" className="flex items-center px-5 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#FAF9F6] hover:text-[#D4AF37] transition-colors">
                                                <LayoutDashboard size={14} className="mr-3" /> Dashboard
                                            </Link>
                                        )}
                                        <Link href="/orders" className="flex items-center px-5 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#FAF9F6] hover:text-[#D4AF37] transition-colors">
                                            <ShoppingBag size={14} className="mr-3" /> My Orders
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center px-5 py-2 text-xs font-medium uppercase tracking-wider text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <LogOut size={14} className="mr-3" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="hidden md:block">
                                <Link href="/login" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">
                                    Sign In
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-1">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass border-b border-[#D4AF37]/20 animate-in slide-in-from-top duration-500 overflow-hidden">
                    <div className="px-6 pt-4 pb-10 space-y-4">
                        <Link href="/products" className="block text-sm font-semibold tracking-widest uppercase">SHOP ALL</Link>
                        <Link href="/products?category=skincare" className="block text-sm font-semibold tracking-widest uppercase">SKINCARE</Link>
                        <Link href="/products?category=makeup" className="block text-sm font-semibold tracking-widest uppercase">MAKEUP</Link>
                        {!session && (
                            <Link href="/login" className="block text-sm font-semibold tracking-widest uppercase text-[#D4AF37]">SIGN IN</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
