import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const product = await Product.findById(id);
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const body = await req.json();
        const product = await Product.findByIdAndUpdate(id, body, { new: true });
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        // Revalidate the product list pages
        revalidatePath('/products');
        revalidatePath('/admin/products');

        return NextResponse.json(product);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return NextResponse.json({ message: 'Product not found' }, { status: 404 });
        }
        // Revalidate the product list pages
        revalidatePath('/products');
        revalidatePath('/admin/products');

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
