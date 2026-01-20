'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Loader2, CheckCircle, CreditCard, MapPin } from 'lucide-react';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [address, setAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    if (status === 'unauthenticated') {
        router.push('/login?callbackUrl=/checkout');
        return null;
    }

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    cartItems: cart,
                    shippingAddress: address,
                    totalPrice: cartTotal,
                }),
            });

            if (res.ok) {
                setSuccess(true);
                clearCart();
                setTimeout(() => router.push('/orders'), 3000);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center p-8 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle size={48} />
                    </div>
                    <h1 className="text-4xl font-serif font-bold mb-4 text-[#1a1a1a]">Order Confirmed!</h1>
                    <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                        Thank you for choosing Blush & Wear. Your order has been placed successfully and is being processed.
                    </p>
                    <p className="mt-8 text-[#d4af37] font-bold animate-pulse text-sm">Redirecting to your orders...</p>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#fdf2f2]/20">
            <Navbar />
            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Shipping Form */}
                    <div>
                        <h2 className="text-3xl font-serif font-bold mb-8 flex items-center">
                            <MapPin className="mr-3 text-[#d4af37]" /> Shipping Details
                        </h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-gray-700">Street Address</label>
                                <input
                                    required
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                                    placeholder="123 Luxury Lane"
                                    onChange={(e) => setAddress({ ...address, address: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-700">City</label>
                                    <input
                                        required
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                                        placeholder="Elegance City"
                                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold uppercase tracking-widest text-gray-700">Postal Code</label>
                                    <input
                                        required
                                        className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                                        placeholder="90210"
                                        onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-widest text-gray-700">Country</label>
                                <input
                                    required
                                    className="w-full px-6 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#d4af37] outline-none transition-all"
                                    placeholder="United States"
                                    onChange={(e) => setAddress({ ...address, country: e.target.value })}
                                />
                            </div>

                            <div className="pt-8">
                                <h2 className="text-3xl font-serif font-bold mb-8 flex items-center">
                                    <CreditCard className="mr-3 text-[#d4af37]" /> Payment Method
                                </h2>
                                <div className="p-6 bg-white border-2 border-[#d4af37] rounded-3xl flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-[#fdf2f2] rounded-full flex items-center justify-center mr-4">
                                            <CreditCard className="text-[#d4af37]" />
                                        </div>
                                        <div>
                                            <p className="font-bold">Cash on Delivery</p>
                                            <p className="text-xs text-muted-foreground uppercase tracking-widest">Pay when you receive</p>
                                        </div>
                                    </div>
                                    <CheckCircle className="text-[#d4af37]" />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading || cart.length === 0}
                                className="w-full gold-button py-5 rounded-2xl font-bold text-xl mt-12 flex items-center justify-center disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin" size={28} /> : `PLACE ORDER • $${cartTotal.toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    {/* Order Snapshot */}
                    <div className="lg:pl-16">
                        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-[#d4af37]/10 sticky top-32">
                            <h3 className="text-2xl font-serif font-bold mb-8 pb-4 border-b border-gray-100">Order Snapshot</h3>
                            <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item._id} className="flex justify-between items-center">
                                        <div className="flex items-center">
                                            <div className="w-16 h-16 relative rounded-xl overflow-hidden border border-gray-100 mr-4">
                                                <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm leading-tight">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-[#d4af37]">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4 pt-4 border-t border-gray-100">
                                <div className="flex justify-between text-gray-500 text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold uppercase tracking-[0.2em] text-[10px]">Complimentary</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-serif font-bold">Total Amount</span>
                                    <span className="text-3xl font-bold text-[#d4af37]">${cartTotal.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
