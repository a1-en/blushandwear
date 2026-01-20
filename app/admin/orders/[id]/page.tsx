'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { ShoppingBag, MapPin, Calendar, User, ChevronLeft, CreditCard, Info, CheckCircle2, Clock, Truck, Package } from 'lucide-react';
import Link from 'next/link';
import OrderStatusUpdater from '@/components/OrderStatusUpdater';

export default function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetch(`/api/orders/${id}`)
            .then(res => {
                if (!res.ok) throw new Error('Order not found');
                return res.json();
            })
            .then(data => {
                setOrder(data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-gray-500 font-medium">Loading order details...</p>
                </div>
            </AdminLayout>
        );
    }

    if (!order) {
        return (
            <AdminLayout>
                <div className="text-center py-20">
                    <h2 className="text-2xl font-bold">Order Not Found</h2>
                    <br />
                    <Link href="/admin/orders" className="bg-[#1a1a1a] text-white px-8 py-3 rounded-xl font-bold">Back to Orders</Link>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <Link href="/admin/orders" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#d4af37] transition-colors mb-8">
                <ChevronLeft size={20} className="mr-2" /> Back to Management
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 pb-8 border-b border-gray-50">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-1">Order Details</h1>
                                <p className="text-sm font-mono text-gray-400 font-bold">#{order._id}</p>
                            </div>
                            <OrderStatusUpdater orderId={order._id} currentStatus={order.status} />
                        </div>

                        <div className="space-y-6">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-4">Ordered Items</h3>
                            {order.orderItems.map((item: any, i: number) => (
                                <div key={i} className="flex items-center justify-between py-2">
                                    <div className="flex items-center space-x-6">
                                        <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 leading-tight">{item.name}</p>
                                            <p className="text-xs text-gray-500 mt-1">Quantity: {item.quantity} x ${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <p className="font-bold text-gray-900">${(item.quantity * item.price).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 flex items-center">
                                <User size={16} className="mr-2 text-[#d4af37]" /> Customer Profile
                            </h3>
                            <div className="space-y-3">
                                <p className="font-bold text-gray-900">{order.user?.name}</p>
                                <p className="text-sm text-gray-500">{order.user?.email}</p>
                                <div className="pt-3">
                                    <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded uppercase font-bold tracking-widest">Customer ID: {order.user?._id}</span>
                                </div>
                            </div>
                        </section>

                        <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 flex items-center">
                                <MapPin size={16} className="mr-2 text-[#d4af37]" /> Shipping Destination
                            </h3>
                            <div className="space-y-2 text-sm">
                                <p className="font-bold text-gray-900">{order.shippingAddress.address}</p>
                                <p className="text-gray-600">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                                <p className="text-gray-600">{order.shippingAddress.country}</p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="space-y-8">
                    <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 font-mono">Financial Overview</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-bold text-gray-900">${order.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Shipping Fees</span>
                                <span className="text-green-600 font-bold">$0.00</span>
                            </div>
                            <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                                <span className="font-bold text-gray-900 text-xs uppercase tracking-widest">Final Total</span>
                                <span className="text-2xl font-bold text-[#d4af37]">${order.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                    <Calendar size={18} />
                                </div>
                                <div className="text-xs">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Creation Date</p>
                                    <p className="font-bold text-gray-900">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
                                    <CreditCard size={18} />
                                </div>
                                <div className="text-xs">
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Payment Status</p>
                                    <div className="flex items-center mt-1">
                                        {order.isPaid ? (
                                            <span className="text-green-600 font-bold uppercase tracking-widest text-[9px] bg-green-50 px-2 py-0.5 rounded">Paid</span>
                                        ) : (
                                            <span className="text-yellow-600 font-bold uppercase tracking-widest text-[9px] bg-yellow-50 px-2 py-0.5 rounded">Awaiting Payment</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </AdminLayout>
    );
}
