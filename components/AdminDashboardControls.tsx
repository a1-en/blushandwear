'use client';

import { Download, Filter, Calendar, CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface AdminDashboardControlsProps {
    orders: any[];
}

export default function AdminDashboardControls({ orders }: AdminDashboardControlsProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentRange = searchParams.get('range') || 'all';

    const handleRangeChange = (range: string) => {
        const params = new URLSearchParams(searchParams);
        if (range === 'all') {
            params.delete('range');
        } else {
            params.set('range', range);
        }
        router.push(`/admin?${params.toString()}`);
    };

    const handleExport = () => {
        if (!orders || orders.length === 0) {
            toast.error('No data available to export');
            return;
        }

        toast.promise(
            new Promise((resolve) => {
                // CSV Generation
                const headers = ['Order ID', 'Date', 'Customer Name', 'Customer Email', 'Total Price', 'Status', 'Paid'];
                const csvRows = orders.map(order => {
                    return [
                        order._id,
                        new Date(order.createdAt).toISOString(),
                        order.user?.name || 'N/A',
                        order.user?.email || 'N/A',
                        order.totalPrice,
                        order.status,
                        order.isPaid ? 'Yes' : 'No'
                    ].map(value => `"${value}"`).join(',');
                });

                const csvContent = [headers.join(','), ...csvRows].join('\n');
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                link.setAttribute('download', `blush_wear_orders_${currentRange}_${new Date().toISOString().split('T')[0]}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                setTimeout(resolve, 500);
            }),
            {
                loading: 'Preparing export...',
                success: 'File downloaded successfully!',
                error: 'Export failed',
            }
        );
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 bg-white/50 backdrop-blur-sm p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-2">
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-50 w-fit px-3 py-1 rounded-full border border-gray-100 mb-2">
                    <Calendar size={12} className="mr-2" />
                    Time Range Filter
                </div>
                <div className="flex items-center space-x-1 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-50">
                    {[
                        { id: 'all', label: 'All History' },
                        { id: 'weekly', label: 'Past 7 Days' },
                        { id: 'monthly', label: 'Past 30 Days' }
                    ].map((range) => (
                        <button
                            key={range.id}
                            onClick={() => handleRangeChange(range.id)}
                            className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${currentRange === range.id
                                ? 'bg-white text-[#d4af37] shadow-sm scale-105'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
                <div className="flex items-center text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-50 w-fit px-3 py-1 rounded-full border border-gray-100 mb-2">
                    <Download size={12} className="mr-2" />
                    Data Operations
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center justify-center space-x-3 bg-gray-900 text-white px-8 py-3 rounded-2xl text-sm font-bold hover:bg-[#d4af37] transition-all duration-300 shadow-xl shadow-gray-200 active:scale-95 group"
                >
                    <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
                    <span>Export Sequence Data</span>
                </button>
            </div>
        </div>
    );
}
