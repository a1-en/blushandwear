'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye } from 'lucide-react';

interface ProductCardProps {
    product: {
        _id: string;
        name: string;
        description: string;
        price: number;
        images: string[];
        brand: string;
    };
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3 z-20">
                    <Link
                        href={`/products/${product._id}`}
                        className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[#d4af37] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg"
                    >
                        <Eye size={20} />
                    </Link>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-[#d4af37] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-lg">
                        <ShoppingBag size={20} />
                    </button>
                </div>

                {/* Category Tag */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-sm">
                        {product.brand}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg font-bold group-hover:text-[#d4af37] transition-colors line-clamp-1">
                        {product.name}
                    </h3>
                    <span className="text-[#d4af37] font-bold text-lg">${product.price.toFixed(2)}</span>
                </div>
                <p className="text-muted-foreground text-xs line-clamp-2 leading-relaxed mb-4">
                    {product.description}
                </p>

                <div className="mt-auto">
                    <button className="w-full py-3 border border-gray-200 rounded-xl text-xs font-bold tracking-wider uppercase hover:bg-[#1a1a1a] hover:text-white hover:border-[#1a1a1a] transition-all">
                        Add to Bag
                    </button>
                </div>
            </div>
        </div>
    );
}
