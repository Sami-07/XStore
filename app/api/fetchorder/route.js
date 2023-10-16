import Order from '../../../models/Order';
import connectDB from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import User from '../../../models/User';
export async function POST(req, res) {
    connectDB()
    const orderId = await req.json();
    const session = await getServerSession();
    const email = session.user.email;

    try {
        let order = await Order.findOne({ orderId: orderId })
        if (email === order.email) {
            return new NextResponse(JSON.stringify({ order: order }))
        }
        else {
            return new NextResponse(JSON.stringify({ order: [] }));
        }

    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: err }), {
            status: 500,
        });
    }
}