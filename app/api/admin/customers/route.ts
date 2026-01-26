import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== 'ADMIN') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Get all users with their order statistics
        const users = await User.find({}).select('-password').lean();

        // Get order statistics for each user
        const usersWithStats = await Promise.all(
            users.map(async (user) => {
                const orders = await Order.find({ user: user._id });
                const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
                const orderCount = orders.length;
                const lastOrderDate = orders.length > 0
                    ? orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
                    : null;

                return {
                    ...user,
                    stats: {
                        totalSpent,
                        orderCount,
                        lastOrderDate,
                        averageOrderValue: orderCount > 0 ? totalSpent / orderCount : 0
                    }
                };
            })
        );

        return NextResponse.json(usersWithStats);
    } catch (error) {
        console.error('Error fetching customers:', error);
        return NextResponse.json({ error: 'Failed to fetch customers' }, { status: 500 });
    }
}
