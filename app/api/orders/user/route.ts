import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const orders = await Order.find({ user: (session.user as any).id })
            .sort({ createdAt: -1 })
            .populate('orderItems.product');

        return NextResponse.json(orders);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
