'use client';

import { useState, useEffect } from 'react';
import { Search, Mail, Calendar, ShoppingBag, DollarSign, TrendingUp, Filter, Download, UserCheck, UserX } from 'lucide-react';
import toast from 'react-hot-toast';

interface CustomerStats {
    totalSpent: number;
    orderCount: number;
    lastOrderDate: string | null;
    averageOrderValue: number;
}

interface Customer {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    stats: CustomerStats;
}

export default function AdminCustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<'ALL' | 'USER' | 'ADMIN'>('ALL');
    const [sortBy, setSortBy] = useState<'name' | 'totalSpent' | 'orderCount' | 'recent'>('totalSpent');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const res = await fetch('/api/admin/customers');
            if (res.ok) {
                const data = await res.json();
                setCustomers(data);
            } else {
                toast.error('Failed to fetch customers');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const filteredCustomers = customers
        .filter(customer => {
            const matchesSearch =
                customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesRole = filterRole === 'ALL' || customer.role === filterRole;
            return matchesSearch && matchesRole;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'totalSpent':
                    return b.stats.totalSpent - a.stats.totalSpent;
                case 'orderCount':
                    return b.stats.orderCount - a.stats.orderCount;
                case 'recent':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                default:
                    return 0;
            }
        });

    const totalCustomers = customers.length;
    const totalRevenue = customers.reduce((sum, c) => sum + c.stats.totalSpent, 0);
    const activeCustomers = customers.filter(c => c.stats.orderCount > 0).length;
    const avgOrderValue = totalRevenue / customers.reduce((sum, c) => sum + c.stats.orderCount, 0) || 0;

    const exportToCSV = () => {
        const headers = ['Name', 'Email', 'Role', 'Total Spent', 'Orders', 'Avg Order Value', 'Last Order', 'Joined'];
        const rows = filteredCustomers.map(c => [
            c.name,
            c.email,
            c.role,
            c.stats.totalSpent.toFixed(2),
            c.stats.orderCount,
            c.stats.averageOrderValue.toFixed(2),
            c.stats.lastOrderDate ? new Date(c.stats.lastOrderDate).toLocaleDateString() : 'Never',
            new Date(c.createdAt).toLocaleDateString()
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        toast.success('Customer data exported successfully');
    };

    const getRoleBadge = (role: string) => {
        if (role === 'ADMIN') return { label: 'Admin', color: 'bg-purple-100 text-purple-700 border border-purple-200' };
        return { label: 'User', color: 'bg-blue-100 text-blue-700 border border-blue-200' };
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl">
                            <UserCheck size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Customers</h3>
                    <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                            <DollarSign size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Total Revenue</h3>
                    <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Active Customers</h3>
                    <p className="text-2xl font-bold text-gray-900">{activeCustomers}</p>
                </div>

                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-2xl">
                            <TrendingUp size={24} />
                        </div>
                    </div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">Avg Order Value</h3>
                    <p className="text-2xl font-bold text-gray-900">${avgOrderValue.toFixed(2)}</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search customers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#d4af37] outline-none transition-all"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value as any)}
                            className="px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#d4af37] outline-none transition-all"
                        >
                            <option value="ALL">All Roles</option>
                            <option value="USER">Users</option>
                            <option value="ADMIN">Admins</option>
                        </select>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#d4af37] outline-none transition-all"
                        >
                            <option value="totalSpent">Highest Spent</option>
                            <option value="orderCount">Most Orders</option>
                            <option value="recent">Recently Joined</option>
                            <option value="name">Name (A-Z)</option>
                        </select>

                        <button
                            onClick={exportToCSV}
                            className="px-6 py-3 bg-[#d4af37] hover:bg-[#c49d2f] text-white font-bold rounded-xl transition-all flex items-center gap-2"
                        >
                            <Download size={18} />
                            Export
                        </button>
                    </div>
                </div>

                <div className="mt-4 text-sm text-gray-500">
                    Showing <span className="font-bold text-gray-900">{filteredCustomers.length}</span> of {totalCustomers} customers
                </div>
            </div>

            {/* Customer Table */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <th className="px-8 py-4">Customer</th>
                                <th className="px-8 py-4">Role</th>
                                <th className="px-8 py-4">Total Spent</th>
                                <th className="px-8 py-4">Orders</th>
                                <th className="px-8 py-4">Avg Order</th>
                                <th className="px-8 py-4">Last Order</th>
                                <th className="px-8 py-4">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filteredCustomers.map((customer) => {
                                const roleBadge = getRoleBadge(customer.role);
                                return (
                                    <tr key={customer._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-gradient-to-br from-[#d4af37] to-[#f4d03f] text-white rounded-full flex items-center justify-center font-bold text-lg">
                                                    {customer.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-gray-900 group-hover:text-[#d4af37] transition-colors">
                                                        {customer.name}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                                        <Mail size={12} />
                                                        {customer.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${roleBadge.color}`}>
                                                {roleBadge.label}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 font-bold text-gray-900">
                                            ${customer.stats.totalSpent.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2">
                                                <ShoppingBag size={16} className="text-gray-400" />
                                                <span className="font-medium">{customer.stats.orderCount}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-gray-600">
                                            ${customer.stats.averageOrderValue.toFixed(2)}
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500">
                                            {customer.stats.lastOrderDate
                                                ? new Date(customer.stats.lastOrderDate).toLocaleDateString()
                                                : <span className="text-gray-400 italic">Never</span>
                                            }
                                        </td>
                                        <td className="px-8 py-6 text-sm text-gray-500">
                                            {new Date(customer.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredCustomers.length === 0 && (
                    <div className="text-center py-16">
                        <UserX size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-500 font-medium">No customers found</p>
                        <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}
