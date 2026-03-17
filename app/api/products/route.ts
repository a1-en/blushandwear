import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();

        const product = await Product.create(body);

        // Revalidate the product list pages
        revalidatePath('/products');
        revalidatePath('/admin/products');

        return NextResponse.json(product, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get('search');

        let query = {};
        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };
            query = {
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { category: searchRegex },
                    { brand: searchRegex }
                ]
            };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        return NextResponse.json(products);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
