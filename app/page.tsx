import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, ShieldCheck, Sparkles, Play } from 'lucide-react';

export default function Home() {
  const categories = [
    { name: 'Lips', image: '/cat_lips.png', description: 'Timeless shades for every mood' },
    { name: 'Eyes', image: '/cat_eyes.png', description: 'Define your gaze with precision' },
    { name: 'Skincare', image: '/cat_skincare.png', description: 'Unlock your natural radiance' },
    { name: 'Face', image: '/cat_face.png', description: 'The perfect canvas for beauty' },
  ];

  return (
    <main className="min-h-screen bg-[#FAF9F6]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero_light.png"
            alt="Premium Cosmetics"
            fill
            className="object-cover scale-100"
            priority
          />
          <div className="absolute inset-0 bg-white/10 lg:bg-gradient-to-r lg:from-white/60 lg:via-white/20 lg:to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 w-full">
          <div className="max-w-3xl">
            <div className="overflow-hidden mb-6">
              <span className="inline-block px-5 py-2 bg-[#D4AF37] text-white text-[10px] font-bold tracking-[0.3em] uppercase reveal-text">
                Established 2024 • Excellence in Beauty
              </span>
            </div>

            <h1 className="text-6xl md:text-9xl font-serif text-[#0F0F0F] mb-8 leading-[1]">
              Elevate <br />
              <span className="text-gradient font-light italic">Every Detail</span>
            </h1>

            <p className="text-lg md:text-xl text-[#333333] mb-12 leading-relaxed max-w-lg font-light tracking-wide">
              An exquisite collection where science meets sophistication. Designed for those who demand more from their beauty ritual.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link href="/products" className="premium-button w-full sm:w-auto">
                Discover The Collection
              </Link>
              <button className="flex items-center space-x-4 group text-[#0F0F0F] hover:text-[#D4AF37] transition-all">
                <div className="w-12 h-12 rounded-full border border-[#0F0F0F]/10 flex items-center justify-center group-hover:border-[#D4AF37] transition-all">
                  <Play size={16} fill="currentColor" className="ml-1" />
                </div>
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Watch The Film</span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#0F0F0F]/30 to-transparent" />
          <span className="text-[10px] text-[#0F0F0F]/30 uppercase tracking-[0.4em] mt-4 rotate-180 [writing-mode:vertical-lr]">Scroll</span>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-[#D4AF37] text-[11px] font-bold tracking-[0.4em] uppercase mb-8 inline-block">Our Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-12 leading-tight">
            Beauty is the harmony of <br />
            <span className="italic">intent and expression.</span>
          </h2>
          <div className="w-20 h-[1px] bg-[#D4AF37]/50 mx-auto mb-12" />
          <p className="text-lg text-muted-foreground leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
            We believe that cosmetics should not just enhance your features, but reflect your essence. Each formula is crafted with rare ingredients, ensuring that your skin feels as luxurious as it looks. Experience the Blush&Wear standard of uncompromising quality.
          </p>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-serif">Curated Collections</h2>
              <p className="text-muted-foreground mt-4 font-light tracking-widest uppercase text-xs">Explore by department</p>
            </div>
            <Link href="/products" className="text-[11px] font-bold tracking-[0.2em] text-[#D4AF37] border-b border-[#D4AF37]/30 pb-1 mt-6 md:mt-0 hover:border-[#D4AF37] transition-all uppercase">
              View All Products
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <Link
                key={cat.name}
                href={`/products?category=${cat.name.toLowerCase()}`}
                className="group relative flex flex-col category-card"
              >
                <div className="relative aspect-[3/4] overflow-hidden mb-6">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-500" />
                </div>
                <div className="px-2">
                  <h3 className="text-2xl font-serif mb-2">{cat.name}</h3>
                  <p className="text-muted-foreground text-xs font-light tracking-wide">{cat.description}</p>
                  <div className="mt-4 flex items-center text-[#D4AF37] text-[10px] font-bold tracking-[0.2em] uppercase opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    Discover More <ArrowRight className="ml-2" size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Trust Bar */}
      <section className="py-24 border-y border-[#D4AF37]/10 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center">
              <Sparkles className="text-[#D4AF37] mb-8" size={32} strokeWidth={1} />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Artisanal Formulations</h3>
              <p className="text-muted-foreground text-sm font-light leading-loose">
                Meticulously developed in small batches to ensure the highest purity and potency for your skin.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="text-[#D4AF37] mb-8" size={32} strokeWidth={1} />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Ethical Excellence</h3>
              <p className="text-muted-foreground text-sm font-light leading-loose">
                Our commitment to cruelty-free and sustainably sourced components defines our brand core.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Star className="text-[#D4AF37] mb-8" size={32} strokeWidth={1} />
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4">Expert Curation</h3>
              <p className="text-muted-foreground text-sm font-light leading-loose">
                Selected by a panel of world-renowned aestheticists to provide a professional-grade experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quote / Callout */}
      <section className="relative py-40 flex items-center justify-center overflow-hidden parallax-bg"
        style={{ backgroundImage: 'url("/hero_premium.png")', backgroundPosition: 'center 30%' }}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center max-w-4xl px-6">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-12 italic leading-tight">
            "True beauty is an radiance that <br /> originates from within."
          </h2>
          <Link href="/products" className="premium-button bg-white text-black border-white hover:text-white">
            Shop The Infinite Collection
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
