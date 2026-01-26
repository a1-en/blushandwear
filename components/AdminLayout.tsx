"use client";

import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, LogOut, Home, ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = useState(false);

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
        { icon: Users, label: 'Customers', href: '/admin/customers' },
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside
                className={`bg-[#1a1a1a] text-white flex flex-col fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-72'
                    }`}
            >
                <div className={`h-20 flex items-center justify-between border-b border-white/10 transition-all duration-300 ${isCollapsed ? 'px-4' : 'px-8'
                    }`}>
                    {!isCollapsed && (
                        <Link href="/" className="text-xl font-serif text-[#d4af37] font-bold tracking-tighter whitespace-nowrap overflow-hidden animate-in fade-in duration-500">
                            BLUSH & WEAR <span className="text-[10px] text-white/50 block tracking-widest -mt-1 uppercase">Admin Portal</span>
                        </Link>
                    )}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className={`p-2 rounded-lg hover:bg-white/5 text-[#d4af37] transition-all ${isCollapsed ? 'mx-auto' : ''}`}
                    >
                        {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>
                </div>

                <nav className={`flex-grow py-8 space-y-2 transition-all duration-300 ${isCollapsed ? 'px-3' : 'px-4'}`}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            title={isCollapsed ? item.label : ''}
                            className={`flex items-center rounded-xl transition-all duration-200 group ${isCollapsed ? 'justify-center p-3.5' : 'space-x-3 px-4 py-3.5'
                                } ${pathname === item.href
                                    ? 'bg-[#d4af37] text-white shadow-lg shadow-[#d4af37]/20 font-bold'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className="shrink-0" />
                            {!isCollapsed && <span className="text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className={`p-4 border-t border-white/10 space-y-2 transition-all duration-300 ${isCollapsed ? 'px-3' : 'px-4'}`}>
                    <Link
                        href="/"
                        title={isCollapsed ? 'Back to Store' : ''}
                        className={`flex items-center rounded-xl transition-all group ${isCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'
                            } text-gray-400 hover:bg-white/5 hover:text-white`}
                    >
                        <Home size={20} className="shrink-0" />
                        {!isCollapsed && <span className="text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">Back to Store</span>}
                    </Link>
                    <button
                        onClick={() => signOut()}
                        title={isCollapsed ? 'Log Out' : ''}
                        className={`w-full flex items-center rounded-xl transition-all group ${isCollapsed ? 'justify-center p-3' : 'space-x-3 px-4 py-3'
                            } text-red-400 hover:bg-red-500/10`}
                    >
                        <LogOut size={20} className="shrink-0" />
                        {!isCollapsed && <span className="text-sm font-bold whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">Log Out</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-grow transition-all duration-300 ease-in-out ${isCollapsed ? 'pl-20' : 'pl-72'
                    }`}
            >
                <div className="p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
