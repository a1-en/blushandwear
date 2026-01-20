'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

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
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            _id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: 1
        });
        toast.success(`Added ${product.name} to bag`);
    };

    return (
        <div className="group bg-white overflow-hidden border border-[#E8E4E1] transition-all duration-700 hover:border-[#D4AF37]/30 flex flex-col h-full">
            {/* Image Container */}
            <Link href={`/products/${product._id}`} className="relative aspect-[4/5] overflow-hidden bg-[#FAF9F6]">
                {product.images?.[0] && typeof product.images[0] === 'string' ? (
                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#FAF9F6]">
                        <ShoppingBag size={48} strokeWidth={0.5} className="text-[#D4AF37]/20" />
                    </div>
                )}

                {/* Status Tag */}
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/95 text-[9px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 border border-[#D4AF37]/10">
                        {product.brand}
                    </span>
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] flex items-center justify-center space-x-4 z-20">
                    <div className="p-3 bg-white/90 hover:bg-[#D4AF37] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 shadow-xl">
                        <Eye size={18} strokeWidth={1.5} />
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-white/90 hover:bg-[#D4AF37] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-500 delay-75 shadow-xl">
                        <ShoppingBag size={18} strokeWidth={1.5} />
                    </button>
                </div>
            </Link>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-serif text-xl font-medium tracking-tight group-hover:text-[#D4AF37] transition-colors duration-300">
                        <Link href={`/products/${product._id}`}>{product.name}</Link>
                    </h3>
                </div>

                <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-[#D4AF37] text-[#D4AF37]" />
                    ))}
                    <span className="text-[10px] text-muted-foreground tracking-widest uppercase ml-2">(4.9)</span>
                </div>

                <p className="text-muted-foreground text-xs font-light leading-relaxed mb-6 line-clamp-2 italic">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 border-t border-[#F2F2F2] flex justify-between items-center">
                    <span className="text-[#0F0F0F] font-semibold tracking-tighter text-lg">
                        ${product.price.toFixed(2)}
                    </span>
                    <button
                        onClick={handleAddToCart}
                        className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#0F0F0F] transition-colors">
                        Add to Bag +
                    </button>
                </div>
            </div>
        </div>
    );
}
