import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Premium Cosmetics"
            fill
            className="object-cover brightness-[0.85]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <span className="inline-block px-4 py-1.5 bg-[#d4af37] text-white text-xs font-bold tracking-[0.2em] rounded-full mb-6">
              NEW COLLECTION 2024
            </span>
            <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-[1.1]">
              Unveil Your <br />
              <span className="text-gradient drop-shadow-sm">Radiance</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 leading-relaxed max-w-lg">
              Discover a curated selection of premium cosmetics designed to enhance your natural beauty with effortless elegance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products" className="gold-button px-10 py-4 rounded-full font-bold text-center flex items-center justify-center group">
                SHOP THE COLLECTION <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/about" className="glass px-10 py-4 rounded-full font-bold text-center border-white/30 text-white hover:bg-white/10 transition-all">
                OUR STORY
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-[#fdf2f2] rounded-full flex items-center justify-center mb-6 border border-[#d4af37]/20 group-hover:scale-110 transition-transform">
                <Sparkles className="text-[#d4af37]" size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Premium Quality</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Formulated with the finest ingredients to ensure lasting results and comfort.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-[#fdf2f2] rounded-full flex items-center justify-center mb-6 border border-[#d4af37]/20 group-hover:scale-110 transition-transform">
                <ShieldCheck className="text-[#d4af37]" size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Ethically Sourced</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                100% cruelty-free and sustainably sourced ingredients for a cleaner beauty.
              </p>
            </div>
            <div className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-[#fdf2f2] rounded-full flex items-center justify-center mb-6 border border-[#d4af37]/20 group-hover:scale-110 transition-transform">
                <Star className="text-[#d4af37]" size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold mb-4">Expert Curated</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Handpicked by top industry experts to give you that celebrity look every day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#fdf2f2]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-[#d4af37] font-bold tracking-widest text-xs uppercase">Categories</span>
              <h2 className="text-4xl font-serif mt-2">Shop by Category</h2>
            </div>
            <Link href="/products" className="text-[#d4af37] font-bold flex items-center hover:underline decoration-2 underline-offset-8">
              VIEW ALL <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Lips', 'Eyes', 'Skincare', 'Face'].map((category, i) => (
              <Link
                key={category}
                href={`/products?category=${category.toLowerCase()}`}
                className="group relative h-80 overflow-hidden rounded-2xl"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 z-10" />
                <div className="h-full w-full bg-gray-200 transition-transform duration-700 group-hover:scale-110 flex items-center justify-center text-gray-400">
                  {/* Fallback pattern/text for categories */}
                  <span className="font-serif italic text-2xl opacity-20">{category}</span>
                </div>
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-white text-2xl font-serif font-bold">{category}</h3>
                  <p className="text-white/80 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Discover more</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
