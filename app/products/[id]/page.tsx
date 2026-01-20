import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';
import { Star, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

async function getProduct(id: string) {
    await connectDB();
    const product = await Product.findById(id);
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Product Image */}
                    <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-8">
                            <span className="text-[#d4af37] font-bold tracking-widest text-xs uppercase mb-2 block">
                                {product.brand} • {product.category}
                            </span>
                            <h1 className="text-5xl font-serif font-bold mb-4">{product.name}</h1>
                            <div className="flex items-center space-x-4 mb-6">
                                <div className="flex text-[#d4af37]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" />
                                    ))}
                                </div>
                                <span className="text-sm text-gray-500">(48 Reviews)</span>
                            </div>
                            <p className="text-3xl font-bold text-[#1a1a1a]">${product.price.toFixed(2)}</p>
                        </div>

                        <div className="prose prose-sm text-gray-600 mb-10">
                            <p className="leading-relaxed text-lg italic">
                                {product.description}
                            </p>
                        </div>

                        <div className="space-y-6 mb-12">
                            <AddToCartButton product={product} />

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#fdf2f2]/50 border border-[#d4af37]/10">
                                    <Truck size={20} className="text-[#d4af37]" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">Free Shipping</span>
                                </div>
                                <div className="flex items-center space-x-3 p-4 rounded-2xl bg-[#fdf2f2]/50 border border-[#d4af37]/10">
                                    <RefreshCw size={20} className="text-[#d4af37]" />
                                    <span className="text-xs font-semibold uppercase tracking-wider">30-Day Returns</span>
                                </div>
                            </div>
                        </div>

                        {/* Guarantees */}
                        <div className="border-t border-gray-100 pt-8 space-y-4">
                            <div className="flex items-start space-x-3">
                                <ShieldCheck className="text-[#d4af37] mt-0.5" size={20} />
                                <div>
                                    <h4 className="font-bold text-sm">Authenticity Guaranteed</h4>
                                    <p className="text-xs text-gray-500">All our products are 100% genuine and sourced directly from brands.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
