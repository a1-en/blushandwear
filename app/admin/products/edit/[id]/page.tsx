'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/AdminLayout';
import { ChevronLeft, Upload, Save, X, Package, DollarSign, Tag, Info, Layers, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        brand: '',
        stockCount: '',
        images: [''],
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setFormData({
                        name: data.name || '',
                        description: data.description || '',
                        price: data.price?.toString() || '',
                        category: data.category || '',
                        brand: data.brand || '',
                        stockCount: data.stockCount?.toString() || '',
                        images: (data.images && data.images.length > 0) ? data.images : [''],
                    });
                } else {
                    toast.error('Failed to fetch product data');
                    router.push('/admin/products');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error loading product');
            } finally {
                setFetching(false);
            }
        };

        fetchProduct();
    }, [id, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (index: number, value: string) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    const removeImageField = (index: number) => {
        const newImages = formData.images.filter((_, i) => i !== index);
        setFormData({ ...formData, images: newImages.length ? newImages : [''] });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/products/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    images: formData.images.filter(img => img.trim() !== ''),
                    price: parseFloat(formData.price),
                    stockCount: parseInt(formData.stockCount),
                    inStock: parseInt(formData.stockCount) > 0,
                }),
            });

            if (res.ok) {
                toast.success('Product updated successfully!');
                router.push('/admin/products');
                router.refresh();
            } else {
                const data = await res.json();
                toast.error(data.message || 'Failed to update product');
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <AdminLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh]">
                    <Loader2 className="animate-spin text-[#d4af37] mb-4" size={40} />
                    <p className="text-gray-500 font-medium">Loading product details...</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="max-w-4xl mx-auto">
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <Link href="/admin/products" className="flex items-center text-gray-500 hover:text-[#d4af37] transition-colors mb-4 font-medium">
                            <ChevronLeft size={20} className="mr-1" /> Back to Products
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Product</h1>
                        <p className="text-gray-500">Update your luxury cosmetic item details.</p>
                    </div>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Basic Info */}
                            <div className="md:col-span-2">
                                <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                                    <Package size={16} className="mr-2 text-[#d4af37]" /> PRODUCT NAME
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Silk Radiance Foundation"
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                                    <Tag size={16} className="mr-2 text-[#d4af37]" /> BRAND
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="e.g. Blush & Wear"
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                                    <Layers size={16} className="mr-2 text-[#d4af37]" /> CATEGORY
                                </label>
                                <select
                                    required
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-gray-900 appearance-none"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Face">Face</option>
                                    <option value="Lips">Lips</option>
                                    <option value="Eyes">Eyes</option>
                                    <option value="Skincare">Skincare</option>
                                    <option value="Fragrance">Fragrance</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                                    <DollarSign size={16} className="mr-2 text-[#d4af37]" /> PRICE ($)
                                </label>
                                <input
                                    required
                                    type="number"
                                    step="0.01"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-gray-900"
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                                    <Info size={16} className="mr-2 text-[#d4af37]" /> STOCK COUNT
                                </label>
                                <input
                                    required
                                    type="number"
                                    name="stockCount"
                                    value={formData.stockCount}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-gray-900"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="flex items-center text-sm font-bold text-gray-700 mb-3">
                                    DESCRIPTION
                                </label>
                                <textarea
                                    required
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={4}
                                    placeholder="Describe the product details, benefits, and ingredients..."
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-gray-900 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8 md:p-10">
                        <label className="flex items-center text-sm font-bold text-gray-700 mb-6">
                            <Upload size={16} className="mr-2 text-[#d4af37]" /> PRODUCT IMAGES
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {formData.images.map((url, index) => (
                                <div key={index} className="relative group">
                                    <div className="aspect-[3/4] rounded-2xl bg-gray-50 border-2 border-dashed border-gray-100 overflow-hidden flex items-center justify-center transition-all group-hover:border-[#d4af37]/30">
                                        {url ? (
                                            <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="text-center p-4">
                                                <Package className="mx-auto text-gray-300 mb-2" size={32} />
                                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">No Image</p>
                                            </div>
                                        )}

                                        {formData.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeImageField(index)}
                                                className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm text-red-500 rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
                                            >
                                                <X size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <input
                                            required={index === 0} // First image is required
                                            type="url"
                                            value={url}
                                            onChange={(e) => handleImageChange(index, e.target.value)}
                                            placeholder="Enter image URL..."
                                            className="w-full px-4 py-3 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-[#d4af37] outline-none transition-all text-xs text-gray-900"
                                        />
                                    </div>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={addImageField}
                                className="aspect-[3/4] rounded-2xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-all group bg-white"
                            >
                                <Plus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Add URL</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Link
                            href="/admin/products"
                            className="px-8 py-4 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all"
                        >
                            CANCEL
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#1a1a1a] text-white px-10 py-4 rounded-2xl flex items-center font-bold hover:bg-[#d4af37] transition-all shadow-xl disabled:opacity-50"
                        >
                            {loading ? (
                                'SAVING...'
                            ) : (
                                <>
                                    <Save size={20} className="mr-2" /> UPDATE PRODUCT
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
