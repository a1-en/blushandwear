'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Package, Clock, CheckCircle2, Truck, ExternalLink, ChevronRight, Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';

export default function OrdersPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }

        if (status === 'authenticated') {
            fetch('/api/orders/user')
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setOrders(data);
                    } else {
                        console.error('Expected array from /api/orders/user but got:', data);
                        setOrders([]);
                    }
                    setLoading(false);
                })
                .catch((err: any) => {
                    console.error('Error fetching orders:', err);
                    setOrders([]);
                    setLoading(false);
                });
        }
    }, [status, router]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle2 className="text-green-500" size={18} />;
            case 'Shipped': return <Truck className="text-blue-500" size={18} />;
            case 'Processing': return <Clock className="text-yellow-500" size={18} />;
            default: return <Clock className="text-gray-400" size={18} />;
        }
    };

    const copyOrderId = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success('Order ID copied!', {
            icon: '📋',
            style: {
                borderRadius: '1rem',
                background: '#1a1a1a',
                color: '#fff',
            },
        });
    };

    return (
        <main className="min-h-screen bg-[#fdf2f2]/10">
            <Navbar />
            <div className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-12">
                    <h1 className="text-4xl font-serif font-bold mb-2">My Order History</h1>
                    <p className="text-muted-foreground">Track your beauty collection and past purchases.</p>
                </header>

                {loading ? (
                    <div className="space-y-6">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-48 bg-gray-200/50 rounded-3xl animate-pulse" />
                        ))}
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100">
                        <Package className="mx-auto text-gray-200 mb-6" size={64} />
                        <h2 className="text-2xl font-serif font-bold mb-4">No orders yet</h2>
                        <p className="text-gray-500 mb-8">Start your beauty journey with our latest collection.</p>
                        <button
                            onClick={() => router.push('/products')}
                            className="gold-button px-10 py-4 rounded-full font-bold"
                        >
                            SHOP NOW
                        </button>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {orders.map((order: any) => (
                            <div key={order._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
                                <div className="p-8 border-b border-gray-50 flex flex-wrap justify-between items-center gap-4 bg-[#fdf2f2]/20">
                                    <div className="flex items-center space-x-6">
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Order #</p>
                                            <button
                                                onClick={() => copyOrderId(order._id)}
                                                className="flex items-center space-x-2 text-xs font-mono font-bold text-gray-400 hover:text-[#d4af37] transition-colors group"
                                            >
                                                <span>...{order._id.slice(-8)}</span>
                                                <Copy size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Date</p>
                                            <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Total</p>
                                            <p className="text-sm font-bold text-[#d4af37]">${order.totalPrice.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <div className={`px-4 py-1.5 rounded-full flex items-center space-x-2 text-xs font-bold uppercase tracking-widest border ${order.status === 'Delivered' ? 'bg-green-50 text-green-700 border-green-100' :
                                        order.status === 'Shipped' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                            'bg-yellow-50 text-yellow-700 border-yellow-100'
                                        }`}>
                                        {getStatusIcon(order.status)}
                                        <span>{order.status}</span>
                                    </div>
                                </div>

                                <div className="p-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                        {order.orderItems.map((item: any, i: number) => (
                                            <div key={i} className="flex items-center space-x-4">
                                                <div className="relative w-16 h-20 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0">
                                                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold leading-tight line-clamp-1">{item.name}</p>
                                                    <p className="text-xs text-gray-500 mt-1">{item.quantity} x ${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-end pt-6 border-t border-gray-50">
                                        <Link
                                            href={`/orders/${order._id}`}
                                            className="flex items-center text-xs font-bold uppercase tracking-[0.2em] text-gray-400 hover:text-[#d4af37] transition-colors"
                                        >
                                            View Details <ChevronRight size={16} className="ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
