import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose"
import User from "../../../models/User";
import { getServerSession } from "next-auth";
import Order from "../../../models/Order"
export async function POST(req, res) {
    try {
        connectDB();
        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            const { orderId, status } = await req.json();
            await Order.findOneAndUpdate({ orderId: orderId }, { deliveryStatus: status })
            return new NextResponse(JSON.stringify({ status: true }))
        }
        else {
            return new NextResponse(JSON.stringify({ status: false }))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ status: false }))
    }
}