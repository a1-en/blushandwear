import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import AdminProductList from '@/components/AdminProductList';

export const dynamic = 'force-dynamic';

async function getProducts() {
    await connectDB();
    const products = await Product.find().sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <AdminLayout>
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500">Manage your cosmetics inventory and prices.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-[#1a1a1a] text-white px-6 py-3.5 rounded-2xl flex items-center font-bold hover:bg-[#d4af37] transition-all shadow-lg"
                >
                    <Plus size={20} className="mr-2" /> ADD NEW PRODUCT
                </Link>
            </header>

            <AdminProductList initialProducts={products} />
        </AdminLayout>
    );
}
