'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, User, LogOut, Menu, X, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-[#d4af37]/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-serif text-gradient font-bold tracking-tighter">
                            BLUSH & WEAR
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/products" className="text-sm font-medium hover:text-[#d4af37] transition-colors">SHOP ALL</Link>
                        <Link href="/products?category=skincare" className="text-sm font-medium hover:text-[#d4af37] transition-colors">SKINCARE</Link>
                        <Link href="/products?category=makeup" className="text-sm font-medium hover:text-[#d4af37] transition-colors">MAKEUP</Link>
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/cart" className="relative group">
                            <ShoppingBag size={22} className="group-hover:text-[#d4af37] transition-colors" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-[#d4af37] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {session ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 border border-[#d4af37]/20 rounded-full px-4 py-1.5 hover:bg-[#d4af37]/5 transition-all">
                                    <User size={18} className="text-[#d4af37]" />
                                    <span className="text-sm font-medium max-w-[100px] truncate">{session.user?.name}</span>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                                    <div className="py-2">
                                        {(session.user as any).role === 'ADMIN' && (
                                            <Link href="/admin" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf2f2] hover:text-[#d4af37]">
                                                <LayoutDashboard size={16} className="mr-2" /> Admin Dashboard
                                            </Link>
                                        )}
                                        <Link href="/orders" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-[#fdf2f2] hover:text-[#d4af37]">
                                            <ShoppingBag size={16} className="mr-2" /> My Orders
                                        </Link>
                                        <button
                                            onClick={() => signOut()}
                                            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut size={16} className="mr-2" /> Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <Link href="/login" className="gold-button px-6 py-2 rounded-full text-sm font-semibold">
                                SIGN IN
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-700">SHOP ALL</Link>
                        <Link href="/products?category=skincare" className="block px-3 py-2 text-base font-medium text-gray-700">SKINCARE</Link>
                        <Link href="/products?category=makeup" className="block px-3 py-2 text-base font-medium text-gray-700">MAKEUP</Link>
                        {!session && (
                            <Link href="/login" className="block px-3 py-2 text-base font-medium text-[#d4af37]">SIGN IN</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
