import AdminLayout from '@/components/AdminLayout';
import { ShoppingCart, Package, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';

async function getStats() {
    await connectDB();
    const [orderCount, productCount, userCount, orders] = await Promise.all([
        Order.countDocuments(),
        Product.countDocuments(),
        User.countDocuments(),
        Order.find().limit(5).sort({ createdAt: -1 }).populate('user', 'name email'),
    ]);

    const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0);

    return {
        orderCount,
        productCount,
        userCount,
        totalRevenue,
        recentOrders: JSON.parse(JSON.stringify(orders)),
    };
}

export default async function AdminDashboardOverview() {
    const stats = await getStats();

    const cards = [
        { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Total Orders', value: stats.orderCount, icon: ShoppingCart, color: 'text-blue-600', bg: 'bg-blue-100' },
        { label: 'Products', value: stats.productCount, icon: Package, color: 'text-purple-600', bg: 'bg-purple-100' },
        { label: 'Customers', value: stats.userCount, icon: Users, color: 'text-orange-600', bg: 'bg-orange-100' },
    ];

    return (
        <AdminLayout>
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500">Welcome to your daily business performance summary.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {cards.map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <span className="text-green-500 flex items-center text-xs font-bold">
                                <TrendingUp size={14} className="mr-1" /> +12%
                            </span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium mb-1">{card.label}</h3>
                        <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-10">
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
                        <button className="text-sm font-bold text-[#d4af37] flex items-center hover:underline">
                            View All <ArrowUpRight size={16} className="ml-1" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                    <th className="px-8 py-4">Customer</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Amount</th>
                                    <th className="px-8 py-4">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {stats.recentOrders.map((order: any) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-[#fdf2f2] text-[#d4af37] rounded-full flex items-center justify-center font-bold">
                                                    {order.user?.name?.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900">{order.user?.name}</p>
                                                    <p className="text-xs text-gray-400">{order.user?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-gray-900">
                                            ${order.totalPrice.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
