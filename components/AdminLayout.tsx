'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut, Home } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated' || (status === 'authenticated' && (session.user as any).role !== 'ADMIN')) {
            router.push('/');
        }
    }, [status, session, router]);

    if (status === 'loading' || (status === 'authenticated' && (session.user as any).role !== 'ADMIN')) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const menuItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
        { icon: Package, label: 'Products', href: '/admin/products' },
        { icon: ShoppingCart, label: 'Orders', href: '/admin/orders' },
        // { icon: Users, label: 'Customers', href: '/admin/users' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-[#1a1a1a] text-white flex flex-col fixed inset-y-0 left-0 z-50">
                <div className="h-20 flex items-center px-8 border-b border-white/10">
                    <Link href="/" className="text-xl font-serif text-[#d4af37] font-bold tracking-tighter">
                        BLUSH & WEAR <span className="text-[10px] text-white/50 block tracking-widest -mt-1 uppercase">Admin Portal</span>
                    </Link>
                </div>

                <nav className="flex-grow py-8 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${pathname === item.href
                                    ? 'bg-[#d4af37] text-white shadow-lg shadow-[#d4af37]/20 font-bold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span className="text-sm">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 px-4 py-3 text-gray-400 hover:bg-white/5 hover:text-white rounded-xl transition-all"
                    >
                        <Home size={20} />
                        <span className="text-sm">Back to Store</span>
                    </Link>
                    <button
                        onClick={() => signOut()}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                    >
                        <LogOut size={20} />
                        <span className="text-sm font-bold">Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow pl-72">
                <div className="p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
