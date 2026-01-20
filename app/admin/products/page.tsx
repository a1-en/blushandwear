import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { Plus, Edit, Trash2, Search } from 'lucide-react';

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

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-gray-200 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <span className="font-bold text-gray-900">{products.length}</span> Products found
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">
                                <th className="px-8 py-4">Product</th>
                                <th className="px-8 py-4">Brand</th>
                                <th className="px-8 py-4">Category</th>
                                <th className="px-8 py-4">Price</th>
                                <th className="px-8 py-4">Stock</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {products.map((product: any) => (
                                <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-16 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0">
                                                <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                                            </div>
                                            <p className="font-bold text-sm text-gray-900 group-hover:text-[#d4af37] transition-colors">{product.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-medium text-gray-500 uppercase tracking-widest">{product.brand}</td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-[#fdf2f2] text-[#d4af37] rounded-full text-[10px] font-bold uppercase tracking-widest border border-[#d4af37]/10">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-gray-900">${product.price.toFixed(2)}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center space-x-2">
                                            <div className={`w-2 h-2 rounded-full ${product.stockCount > 10 ? 'bg-green-500' : 'bg-red-500'}`} />
                                            <span className="text-sm font-medium">{product.stockCount} in stock</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex justify-end space-x-2">
                                            <Link
                                                href={`/admin/products/edit/${product._id}`}
                                                className="p-2 text-gray-400 hover:text-[#d4af37] hover:bg-[#d4af37]/5 rounded-lg transition-all"
                                            >
                                                <Edit size={18} />
                                            </Link>
                                            {/* Delete functionality will be added in API step */}
                                            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
