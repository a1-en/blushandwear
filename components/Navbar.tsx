'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingBag, User, LogOut, Menu, X, LayoutDashboard, Search, Loader2, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';

interface SearchResult {
    _id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    images?: string[];
}

export default function Navbar() {
    const { data: session } = useSession();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { cartCount } = useCart();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current?.focus(), 100);
        }
    }, [isSearchOpen]);

    // Real-time search debounce
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.trim().length > 1) {
                setIsSearching(true);
                try {
                    const res = await fetch(`/api/products?search=${encodeURIComponent(searchQuery)}`);
                    const data = await res.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    const closeSearch = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-[#D4AF37]/20 py-1' : 'bg-transparent py-2'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    <div className="flex justify-between items-center h-14 relative">
                        {/* Mobile Menu Button - Left */}
                        <div className="md:hidden flex items-center">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-900 p-1">
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>

                        {/* Desktop Menu - Left */}
                        <div className="hidden md:flex items-center space-x-10">
                            <Link href="/products" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">SHOP ALL</Link>
                            <Link href="/products?category=skincare" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">SKINCARE</Link>
                            <Link href="/products?category=makeup" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">MAKEUP</Link>
                        </div>

                        {/* Logo - Center */}
                        <Link href="/" className="flex-shrink-0 flex items-center absolute left-1/2 -translate-x-1/2 z-50">
                            <span className={`text-2xl md:text-3xl font-serif text-gradient font-bold tracking-[-0.05em] transition-opacity duration-300 ${isSearchOpen ? 'opacity-0' : 'opacity-100'}`}>
                                Blush&Wear
                            </span>
                        </Link>

                        {/* Right Icons */}
                        <div className="flex items-center space-x-4 md:space-x-8">
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="group p-1"
                            >
                                <Search size={20} className="group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                            </button>

                            <Link href="/cart" className="relative group p-1">
                                <ShoppingBag size={20} className="group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {session ? (
                                <div className="hidden md:block relative group">
                                    <button className="flex items-center space-x-2 p-1">
                                        <User size={20} className="group-hover:text-[#D4AF37] transition-colors" strokeWidth={1.5} />
                                    </button>

                                    {/* Premium Dropdown */}
                                    <div className="absolute right-0 mt-4 w-56 bg-white/95 backdrop-blur-md rounded-sm shadow-2xl border border-[#D4AF37]/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right py-4 z-50">
                                        <div className="px-5 pb-3 mb-3 border-b border-gray-100">
                                            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Signed in as</p>
                                            <p className="text-sm font-semibold truncate">{session.user?.name}</p>
                                        </div>
                                        <div className="space-y-1">
                                            {(session.user as any).role === 'ADMIN' && (
                                                <Link href="/admin" className="flex items-center px-5 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#FAF9F6] hover:text-[#D4AF37] transition-colors">
                                                    <LayoutDashboard size={14} className="mr-3" /> Dashboard
                                                </Link>
                                            )}
                                            <Link href="/orders" className="flex items-center px-5 py-2 text-xs font-medium uppercase tracking-wider hover:bg-[#FAF9F6] hover:text-[#D4AF37] transition-colors">
                                                <ShoppingBag size={14} className="mr-3" /> My Orders
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    signOut();
                                                    toast.success('Signed out successfully');
                                                }}
                                                className="w-full flex items-center px-5 py-2 text-xs font-medium uppercase tracking-wider text-red-500 hover:bg-red-50 transition-colors"
                                            >
                                                <LogOut size={14} className="mr-3" /> Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : null}
                            {!session && (
                                <div className="hidden md:block">
                                    <Link href="/login" className="text-[11px] tracking-[0.2em] font-semibold hover:text-[#D4AF37] transition-all uppercase">
                                        Sign In
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden glass border-b border-[#D4AF37]/20 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}>
                    <div className="px-6 pt-4 pb-10 space-y-6">
                        <div className="space-y-4">
                            <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Categories</p>
                            <Link href="/products" onClick={() => setIsOpen(false)} className="block text-sm font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors">SHOP ALL</Link>
                            <Link href="/products?category=skincare" onClick={() => setIsOpen(false)} className="block text-sm font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors">SKINCARE</Link>
                            <Link href="/products?category=makeup" onClick={() => setIsOpen(false)} className="block text-sm font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors">MAKEUP</Link>
                        </div>

                        <div className="pt-6 border-t border-[#D4AF37]/10 space-y-4">
                            <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase">Account</p>
                            {session ? (
                                <>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                                            <User size={16} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold truncate">{session.user?.name}</p>
                                        </div>
                                    </div>
                                    {(session.user as any).role === 'ADMIN' && (
                                        <Link href="/admin" onClick={() => setIsOpen(false)} className="flex items-center text-sm font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors">
                                            <LayoutDashboard size={16} className="mr-3" /> Dashboard
                                        </Link>
                                    )}
                                    <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center text-sm font-semibold tracking-widest uppercase hover:text-[#D4AF37] transition-colors">
                                        <ShoppingBag size={16} className="mr-3" /> My Orders
                                    </Link>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            signOut();
                                            toast.success('Signed out successfully');
                                        }}
                                        className="flex items-center text-sm font-semibold tracking-widest uppercase text-red-500 hover:text-red-600 transition-colors"
                                    >
                                        <LogOut size={16} className="mr-3" /> Sign Out
                                    </button>
                                </>
                            ) : (
                                <Link href="/login" onClick={() => setIsOpen(false)} className="block text-sm font-semibold tracking-widest uppercase text-[#D4AF37]">
                                    SIGN IN
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Centered Floating Search Modal */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
                onClick={closeSearch}
            />

            <div
                className={`fixed top-24 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-[70] transition-all duration-300 ease-out ${isSearchOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
                    }`}
            >
                {/* Search Bar Pill */}
                <form
                    onSubmit={handleSearchSubmit}
                    className="bg-white rounded-full shadow-2xl flex items-center p-2 border border-[#d4af37]/20 relative z-[70]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="pl-6 text-[#d4af37]">
                        <Search size={24} strokeWidth={1.5} />
                    </div>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="What are you looking for?"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none px-4 py-3 text-lg text-[#1a1a1a] placeholder:text-gray-400 outline-none font-medium" // Added font-medium
                    />

                    {/* Optional Category Dropdown or Text */}
                    <div className="hidden sm:flex items-center px-4 border-l border-gray-100 text-sm font-semibold text-gray-500 cursor-pointer hover:text-[#d4af37] transition-colors">
                        Products <ArrowRight size={14} className="ml-1 rotate-90" />
                    </div>

                    <button
                        type="submit"
                        className="bg-[#d4af37] text-white p-3.5 rounded-full hover:bg-[#b59226] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 ml-2"
                    >
                        <Search size={20} strokeWidth={2} />
                    </button>
                </form>

                {/* Results Dropdown */}
                {isSearchOpen && (searchQuery || searchResults.length > 0) && (
                    <div
                        className="bg-white rounded-3xl shadow-2xl mt-4 max-h-[60vh] overflow-y-auto border border-gray-100 animate-in fade-in slide-in-from-top-2 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {isSearching ? (
                            <div className="flex items-center justify-center py-12 text-[#d4af37]">
                                <Loader2 size={24} className="animate-spin" />
                            </div>
                        ) : searchQuery && searchResults.length > 0 ? (
                            <div className="p-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 px-4 py-3">Products</p>
                                {searchResults.map((product) => (
                                    <Link
                                        key={product._id}
                                        href={`/products/${product._id}`}
                                        onClick={closeSearch}
                                        className="flex items-center p-3 rounded-2xl hover:bg-[#fcf8f1] transition-colors group cursor-pointer"
                                    >
                                        <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-gray-100 flex-shrink-0 border border-gray-100">
                                            <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="ml-4 flex-1 min-w-0">
                                            <h4 className="text-sm font-semibold text-[#1a1a1a] truncate group-hover:text-[#d4af37] transition-colors">{product.name}</h4>
                                            <p className="text-xs text-gray-500 truncate">{product.category} • ${product.price}</p>
                                        </div>
                                        <div className="mx-2 text-gray-300 group-hover:text-[#d4af37] transition-colors">
                                            <ArrowRight size={16} />
                                        </div>
                                    </Link>
                                ))}
                                <div className="p-2 mt-2 border-t border-gray-50 text-center">
                                    <button onClick={handleSearchSubmit} className="text-xs font-bold text-[#d4af37] hover:underline uppercase tracking-wider">
                                        View all results
                                    </button>
                                </div>
                            </div>
                        ) : searchQuery ? (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-sm">No results found for "{searchQuery}"</p>
                            </div>
                        ) : (
                            <div className="p-6">
                                <h5 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Popular Searches</h5>
                                <div className="flex flex-wrap gap-2">
                                    {['Lipstick', 'Serum', 'Gold', 'Face Cream', 'Eyeliner'].map((term) => (
                                        <button
                                            key={term}
                                            onClick={() => setSearchQuery(term)}
                                            className="px-4 py-2 bg-gray-50 hover:bg-[#fcf8f1] hover:text-[#d4af37] rounded-full text-sm font-medium text-gray-600 transition-colors"
                                        >
                                            {term}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
