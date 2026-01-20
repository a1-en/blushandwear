import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

const initialProducts = [
    {
        name: "Aurum Foundation Cream",
        description: "A weightless foundation that provides medium-to-full buildable coverage with a natural, skin-like finish. Infused with hyaluronic acid for 24-hour hydration.",
        price: 45.00,
        category: "face",
        brand: "Blush&Wear",
        images: ["/hero.png"], // Using the hero image as placeholder for now
        stockCount: 50,
    },
    {
        name: "Velvet Rose Lipstick",
        description: "A rich, creamy matte lipstick that delivers high-impact color in one swipe. The long-wearing formula keeps lips hydrated throughout the day.",
        price: 28.00,
        category: "lips",
        brand: "Blush&Wear",
        images: ["/hero.png"],
        stockCount: 100,
    },
    {
        name: "Midnight Silk Eyeliner",
        description: "An ultra-precision waterproof liquid eyeliner with an intense black finish. Glides on smoothly without skipping or tugging.",
        price: 22.00,
        category: "eyes",
        brand: "Blush&Wear",
        images: ["/hero.png"],
        stockCount: 75,
    },
    {
        name: "Golden Hour Glow Serum",
        description: "A lightweight, vitamin C-rich serum that instantly brightens and refreshes dull skin, leaving a subtle luminous glow.",
        price: 58.00,
        category: "skincare",
        brand: "Blush&Wear",
        images: ["/hero.png"],
        stockCount: 30,
    }
];

export async function GET() {
    try {
        await connectDB();

        // Clear existing products to avoid duplicates during development
        await Product.deleteMany({});

        await Product.insertMany(initialProducts);

        return NextResponse.json({ message: "Database seeded correctly" });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
