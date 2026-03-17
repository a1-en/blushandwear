import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import AdminLayout from '@/components/AdminLayout';
import AdminOrderList from '@/components/AdminOrderList';

export const dynamic = 'force-dynamic';

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

            <AdminOrderList initialOrders={orders} />
        </AdminLayout>
    );
}
