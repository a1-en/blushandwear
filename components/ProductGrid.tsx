'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Search, SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    inStock: boolean;
    brand: string;
}

export default function ProductGrid({ initialProducts }: { initialProducts: Product[] }) {
    const searchParams = useSearchParams();
    const categoryParam = searchParams.get('category');

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [sortBy, setSortBy] = useState('newest');
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase());
        } else {
            setSelectedCategory('All');
        }
    }, [categoryParam]);

    const categories = useMemo(() => {
        // Start with the specific order requested by the user + common ones
        const predefined = ['Skincare', 'Makeup', 'Lips', 'Face'];
        const dynamicCats = initialProducts.map(p => p.category);

        // Combine and distinct
        const allCats = new Set([...predefined, ...dynamicCats]);

        // Return structured list
        return ['All', ...Array.from(allCats)].map(c =>
            c.charAt(0).toUpperCase() + c.slice(1).toLowerCase()
        );
    }, [initialProducts]);

    const filteredProducts = useMemo(() => {
        return initialProducts
            .filter(product => {
                const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesCategory = selectedCategory === 'All' ||
                    product.category.toLowerCase() === selectedCategory.toLowerCase();
                const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

                return matchesSearch && matchesCategory && matchesPrice;
            })
            .sort((a, b) => {
                if (sortBy === 'price-low') return a.price - b.price;
                if (sortBy === 'price-high') return b.price - a.price;
                if (sortBy === 'newest') return new Date(b as any).getTime() - new Date(a as any).getTime();
                return 0;
            });
    }, [initialProducts, searchTerm, selectedCategory, priceRange, sortBy]);

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
        setPriceRange([0, 1000]);
        setSortBy('newest');
    };

    return (
        <div className="flex flex-col lg:flex-row gap-12 relative">
            {/* Main Product Area */}
            <div className="flex-1 order-2 lg:order-1">
                {/* Results Info */}
                <div className="flex justify-between items-center text-sm mb-12">
                    <p className="text-gray-500">Showing <span className="text-[#1a1a1a] font-bold">{filteredProducts.length}</span> results</p>
                    {selectedCategory !== 'All' && (
                        <span className="bg-[#f2e6e6] text-[#8e5a63] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                            Category: {selectedCategory}
                        </span>
                    )}
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-32 bg-white/50 rounded-[3rem] border border-dashed border-gray-200">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Search className="text-gray-200" size={32} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-[#1a1a1a] mb-2">No products found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-16">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>

            {/* Sticky Sidebar Right */}
            <aside className="w-full lg:w-72 shrink-0 order-1 lg:order-2">
                <div className="lg:sticky lg:top-32 space-y-8">
                    {/* Search */}
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#d4af37] transition-colors" size={16} />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-100 rounded-xl outline-none focus:border-[#d4af37] transition-all shadow-sm text-sm"
                        />
                    </div>

                    {/* Desktop Filters */}
                    <div className="bg-white rounded-[2rem] p-6 border border-gray-100 shadow-sm space-y-8">
                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Category</h4>
                            <div className="flex flex-col gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat)}
                                        className={`text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-[#d4af37]/10 text-[#d4af37]' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Price Range</h4>
                            <div className="space-y-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full accent-[#d4af37] h-1 bg-gray-100 rounded-full cursor-pointer"
                                />
                                <div className="text-xs font-bold text-[#d4af37]">Under ${priceRange[1]}</div>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Sort By</h4>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2 bg-gray-50 border-none rounded-xl outline-none focus:ring-1 focus:ring-[#d4af37]/50 text-xs font-bold text-gray-600 appearance-none cursor-pointer"
                            >
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>

                        {(searchTerm || selectedCategory !== 'All' || priceRange[1] < 1000) && (
                            <button
                                onClick={resetFilters}
                                className="w-full py-2 text-[10px] font-bold uppercase tracking-widest text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                </div>
            </aside>
        </div>
    );
}
