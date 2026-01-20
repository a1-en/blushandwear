'use client';

import { useEffect, useState, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, MapPin, Clock, CheckCircle2, Truck, ChevronLeft, CreditCard, Calendar, Info } from 'lucide-react';
import Link from 'next/link';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { data: session, status } = useSession();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }

        if (status === 'authenticated') {
            fetch(`/api/orders/${id}`)
                .then(res => res.json())
                .then(data => {
                    setOrder(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [status, id, router]);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Delivered': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', icon: <CheckCircle2 size={18} /> };
            case 'Shipped': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', icon: <Truck size={18} /> };
            case 'Processing': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-100', icon: <Clock size={18} /> };
            default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100', icon: <Info size={18} /> };
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#FAF9F6]">
                <Navbar />
                <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 flex flex-col items-center justify-center">
                    <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500 font-medium">Loading details...</p>
                </div>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="min-h-screen bg-[#FAF9F6]">
                <Navbar />
                <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 text-center">
                    <h2 className="text-2xl font-serif font-bold">Order not found</h2>
                    <br />
                    <Link href="/orders" className="text-[#d4af37] font-bold underline">Back to Orders</Link>
                </div>
            </main>
        );
    }

    const currentStatus = getStatusStyles(order.status);

    return (
        <main className="min-h-screen bg-[#FAF9F6]">
            <Navbar />

            <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/orders" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#d4af37] transition-colors mb-8">
                    <ChevronLeft size={16} className="mr-2" /> Back to My Orders
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Order Info & Items */}
                    <div className="lg:col-span-2 space-y-8">
                        <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                                <div>
                                    <h1 className="text-3xl font-serif font-bold mb-2">Order Detail</h1>
                                    <p className="text-sm font-mono text-gray-400 font-bold">#{order._id}</p>
                                </div>
                                <div className={`${currentStatus.bg} ${currentStatus.text} ${currentStatus.border} border px-6 py-2.5 rounded-full flex items-center space-x-3 text-xs font-bold uppercase tracking-widest`}>
                                    {currentStatus.icon}
                                    <span>{order.status}</span>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] pb-4 border-b border-gray-50">Items Summary</h3>
                                {order.orderItems.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between group">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-20 h-24 rounded-2xl overflow-hidden border border-gray-100 flex-shrink-0">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#1a1a1a]">{item.name}</p>
                                                <p className="text-sm text-gray-500 mt-1">{item.quantity} units x ${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-[#1a1a1a]">${(item.quantity * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] mb-8 flex items-center">
                                <MapPin size={18} className="mr-3 text-[#d4af37]" /> Shipping Information
                            </h3>
                            <div className="text-sm text-gray-600 leading-relaxed grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">Recipient</p>
                                    <p className="font-bold text-[#1a1a1a]">{order.user?.name}</p>
                                    <p>{order.user?.email}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-400 uppercase tracking-widest text-[10px] mb-2">Address</p>
                                    <p className="font-bold text-[#1a1a1a]">{order.shippingAddress.address}</p>
                                    <p>{order.shippingAddress.city}, {order.shippingAddress.postal_code || order.shippingAddress.postalCode}</p>
                                    <p>{order.shippingAddress.country}</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Calculations & Payment */}
                    <div className="space-y-8">
                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1a1a1a] mb-8">Payment Summary</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Subtotal</span>
                                    <span className="font-bold font-mono text-gray-900">${order.totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="text-green-600 font-bold uppercase text-[10px] tracking-widest bg-green-50 px-2 py-1 rounded-md">Free</span>
                                </div>
                                <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                    <span className="font-bold text-[#1a1a1a] uppercase text-xs tracking-widest">Grand Total</span>
                                    <span className="text-2xl font-bold text-[#d4af37]">${order.totalPrice.toFixed(2)}</span>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                        <CreditCard size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Payment Method</p>
                                        <p className="text-xs font-bold text-[#1a1a1a]">Credit Card / Online</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Order Placed</p>
                                        <p className="text-xs font-bold text-[#1a1a1a]">{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>

                                {order.isPaid ? (
                                    <div className="bg-green-50 text-green-700 p-4 rounded-2xl flex items-center text-xs font-bold uppercase tracking-widest">
                                        <CheckCircle2 size={16} className="mr-2" /> Fully Paid
                                    </div>
                                ) : (
                                    <div className="bg-yellow-50 text-yellow-700 p-4 rounded-2xl flex items-center text-xs font-bold uppercase tracking-widest">
                                        <Clock size={16} className="mr-2" /> Payment Awaiting
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
