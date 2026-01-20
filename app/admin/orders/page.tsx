import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import AdminLayout from '@/components/AdminLayout';
import { ShoppingBag, MapPin, Calendar, User, ChevronRight } from 'lucide-react';
import OrderStatusUpdater from '@/components/OrderStatusUpdater';

async function getOrders() {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).populate('user', 'name email');
    return JSON.parse(JSON.stringify(orders));
}

export default async function AdminOrdersPage() {
    const orders = await getOrders();

    return (
        <AdminLayout>
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-500">Track and update customer order statuses.</p>
            </header>

            <div className="space-y-6">
                {orders.map((order: any) => (
                    <div key={order._id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
                        <div className="p-8 border-b border-gray-50 flex flex-wrap justify-between items-center gap-6">
                            <div className="flex items-center space-x-6">
                                <div className="w-14 h-14 bg-[#fdf2f2] rounded-2xl flex items-center justify-center text-[#d4af37]">
                                    <ShoppingBag size={24} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Order ID</p>
                                    <p className="text-sm font-mono font-bold">#{order._id.slice(-10)}</p>
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
                            <button className="flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-[#1a1a1a] transition-colors">
                                View full details <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
