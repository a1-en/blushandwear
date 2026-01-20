'use client';

import { useCart } from '@/context/CartContext';
import { ShoppingBag, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = () => {
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <button
            onClick={handleAdd}
            className={`w-full py-5 rounded-2xl flex items-center justify-center font-bold text-lg transition-all duration-300 ${added
                    ? 'bg-green-600 text-white'
                    : 'gold-button'
                }`}
        >
            {added ? (
                <>
                    <CheckCircle2 className="mr-2" size={24} />
                    ADDED TO BAG
                </>
            ) : (
                <>
                    <ShoppingBag className="mr-2" size={24} />
                    ADD TO BAG
                </>
            )}
        </button>
    );
}
