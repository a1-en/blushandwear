'use client';

import { useState } from 'react';
import { ShoppingBag, MapPin, Calendar, User, ChevronRight, Search, Copy, Check } from 'lucide-react';
import OrderStatusUpdater from '@/components/OrderStatusUpdater';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface Order {
    _id: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    user: {
        name: string;
        email: string;
    };
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
    };
}

export default function AdminOrderList({ initialOrders }: { initialOrders: Order[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const copyToClipboard = (id: string) => {
        navigator.clipboard.writeText(id);
        setCopiedId(id);
        toast.success('Order ID copied');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const highlightText = (text: string, highlight: string) => {
        if (!highlight.trim()) return <span>#{text.slice(-10)}</span>;
        const fullText = `#${text}`;
        const regex = new RegExp(`(${highlight})`, 'gi');
        const parts = fullText.split(regex);

        return (
            <span>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i} className="bg-[#d4af37] text-white px-0.5 rounded-sm">
                            {part}
                        </mark>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </span>
        );
    };

    const filteredOrders = initialOrders.filter(order =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusIcon = (status: string) => {
        // You might already have this somewhere, but redefined here for the component
        return <ShoppingBag size={24} />;
    };

    return (
        <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative max-w-md group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search by Order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white border border-gray-100 rounded-2xl outline-none focus:border-[#d4af37] focus:ring-4 focus:ring-[#d4af37]/5 transition-all shadow-sm text-sm"
                />
            </div>

            {filteredOrders.length === 0 ? (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-gray-200">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="text-gray-300" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
                    <p className="text-gray-500">We couldn't find any orders matching "{searchTerm}"</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                            <div className="p-8 border-b border-gray-50 flex flex-wrap justify-between items-center gap-6">
                                <div className="flex items-center space-x-6">
                                    <div className="w-14 h-14 bg-[#fdf2f2] rounded-2xl flex items-center justify-center text-[#d4af37]">
                                        <ShoppingBag size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order ID</p>
                                        <button
                                            onClick={() => copyToClipboard(order._id)}
                                            className="flex items-center space-x-2 text-sm font-mono font-bold hover:text-[#d4af37] transition-colors group/id text-left"
                                        >
                                            {highlightText(order._id, searchTerm)}
                                            {copiedId === order._id ? (
                                                <Check size={14} className="text-green-500" />
                                            ) : (
                                                <Copy size={14} className="opacity-0 group-hover/id:opacity-100 transition-opacity" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex space-x-12">
                                    <div className="hidden md:block">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1 flex items-center"><User size={12} className="mr-1" /> Customer</p>
                                        <p className="text-sm font-bold">{order.user?.name}</p>
                                    </div>
                                    <div className="hidden lg:block">
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1 flex items-center"><Calendar size={12} className="mr-1" /> Placed On</p>
                                        <p className="text-sm font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Grand Total</p>
                                        <p className="text-lg font-bold text-[#d4af37]">${order.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>

                                <OrderStatusUpdater orderId={order._id} currentStatus={order.status} />
                            </div>

                            <div className="px-8 py-6 bg-gray-50/50 flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center text-xs text-gray-500">
                                    <MapPin size={14} className="mr-2 text-[#d4af37]" />
                                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}
                                </div>
                                <Link
                                    href={`/admin/orders/${order._id}`}
                                    className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] transition-colors"
                                >
                                    View full details <ChevronRight size={16} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
