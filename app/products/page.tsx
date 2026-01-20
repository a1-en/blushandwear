import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

async function getProducts(category?: string) {
    await connectDB();
    const query = category ? { category: category.toLowerCase() } : {};
    const products = await Product.find(query).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const products = await getProducts(category);

    return (
        <main className="min-h-screen bg-[#fdf2f2]/20">
            <Navbar />

            <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-16 text-center">
                    <span className="text-[#d4af37] font-bold tracking-widest text-xs uppercase mb-2 block">
                        {category ? category : 'All Collections'}
                    </span>
                    <h1 className="text-5xl font-serif font-bold">
                        {category ? `${category.charAt(0).toUpperCase()}${category.slice(1)}` : 'Our Collection'}
                    </h1>
                    <div className="mt-4 w-20 h-1 bg-[#d4af37] mx-auto" />
                </header>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500 italic text-lg">No products found in this category.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product: any) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </main>
    );
}
