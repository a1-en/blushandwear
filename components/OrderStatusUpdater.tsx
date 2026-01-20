'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function OrderStatusUpdater({
    orderId,
    currentStatus
}: {
    orderId: string,
    currentStatus: string
}) {
    const [status, setStatus] = useState(currentStatus);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (newStatus: string) => {
        setLoading(true);
        try {
            const res = await fetch(`/api/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) setStatus(newStatus);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered'];

    return (
        <div className="relative">
            {loading && (
                <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-10">
                    <Loader2 className="animate-spin text-[#d4af37]" />
                </div>
            )}
            <select
                value={status}
                onChange={(e) => handleUpdate(e.target.value)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest outline-none border transition-all cursor-pointer ${status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' :
                        status === 'Shipped' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                            'bg-yellow-100 text-yellow-700 border-yellow-200'
                    }`}
            >
                {statuses.map((s) => (
                    <option key={s} value={s}>{s}</option>
                ))}
            </select>
        </div>
    );
}
