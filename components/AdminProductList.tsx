'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Edit, Trash2, Search, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Product {
    _id: string;
    name: string;
    brand: string;
    category: string;
    price: number;
    stockCount: number;
    images: string[];
}

export default function AdminProductList({ initialProducts }: { initialProducts: Product[] }) {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setProducts(products.filter(p => p._id !== id));
                router.refresh();
            } else {
                alert('Failed to delete product');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong');
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-96">
                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#d4af37] outline-none transition-all"
                    />
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span className="font-bold text-gray-900">{filteredProducts.length}</span> Products found
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
                        {filteredProducts.map((product) => (
                            <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-16 relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 flex items-center justify-center">
                                            {product.images && product.images[0] ? (
                                                <img src={product.images[0]} alt={product.name} className="object-cover w-full h-full" />
                                            ) : (
                                                <Package className="text-gray-300" size={20} />
                                            )}
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
                                        <button
                                            onClick={() => handleDelete(product._id, product.name)}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                        >
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
    );
}
