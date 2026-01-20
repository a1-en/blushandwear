'use client';

import { useCart } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <main className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex flex-center items-center justify-center pt-20">
                    <div className="text-center px-4">
                        <div className="w-24 h-24 bg-[#fdf2f2] rounded-full flex items-center justify-center mx-auto mb-8 border border-[#d4af37]/20">
                            <ShoppingBag size={40} className="text-[#d4af37]" />
                        </div>
                        <h1 className="text-4xl font-serif font-bold mb-4">Your bag is empty</h1>
                        <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
                            Looks like you haven't added anything to your collection yet.
                        </p>
                        <Link href="/products" className="gold-button px-10 py-4 rounded-full font-bold inline-block">
                            START SHOPPING
                        </Link>
                    </div>
                </div>
                <Footer />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#fdf2f2]/10">
            <Navbar />
            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-serif font-bold mb-12">Shopping Bag</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-6">
                                <div className="relative w-32 h-40 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                                    {item.image && typeof item.image === 'string' ? (
                                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                            <ShoppingBag size={32} strokeWidth={1} />
                                        </div>
                                    )}
                                </div>

                                <div className="flex-grow flex flex-col py-2">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-serif font-bold">{item.name}</h3>
                                            <p className="text-sm text-[#d4af37] font-semibold mt-1">${item.price.toFixed(2)}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="mt-auto flex justify-between items-center">
                                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="px-4 font-bold text-sm">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="p-2 hover:bg-gray-50 transition-colors"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-32">
                            <h3 className="text-xl font-serif font-bold mb-8">Order Summary</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-semibold uppercase tracking-wider text-xs">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-2xl">
                                    <span>Total</span>
                                    <span className="text-[#d4af37]">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full gold-button py-5 rounded-2xl flex items-center justify-center font-bold text-lg group"
                            >
                                PROCEED TO CHECKOUT <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-6 text-center">
                                <p className="text-xs text-muted-foreground uppercase tracking-widest">Secure Checkout Powered by Blush & Wear</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
