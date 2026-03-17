import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { cartItems, shippingAddress, totalPrice } = await req.json();

        if (!cartItems || cartItems.length === 0) {
            return NextResponse.json({ message: 'Cart is empty' }, { status: 400 });
        }

        await connectDB();

        const orderItems = cartItems.map((item: any) => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
        }));

        const order = await Order.create({
            user: (session.user as any).id,
            orderItems,
            shippingAddress,
            totalPrice,
        });

        revalidatePath('/admin/orders');
        revalidatePath('/admin');

        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
