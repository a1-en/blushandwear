import AdminLayout from '@/components/AdminLayout';
import AdminCustomerList from '@/components/AdminCustomerList';

export default function CustomersPage() {
    return (
        <AdminLayout>
            <header className="mb-10">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Customer Management</h1>
                <p className="text-gray-500 mt-2">View and manage your customer base with detailed insights.</p>
            </header>

            <AdminCustomerList />
        </AdminLayout>
    );
}
