import { Suspense } from 'react';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';

async function getProducts() {
    await connectDB();
    const products = await Product.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <main className="min-h-screen bg-[#fdf2f2]/10">
            <Navbar />

            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16 text-center">
                    <span className="text-[#d4af37] font-bold tracking-widest text-xs uppercase mb-2 block">
                        Exclusive Collection
                    </span>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">
                        Discover Your Glow
                    </h1>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg italic">
                        Explore our curated selection of premium cosmetics designed to elevate your natural beauty.
                    </p>
                    <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto" />
                </header>

                <Suspense fallback={<div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div></div>}>
                    <ProductGrid initialProducts={products} />
                </Suspense>
            </div>

            <Footer />
        </main>
    );
}
