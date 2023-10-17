import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import { getServerSession } from "next-auth";
import Order from "../../../models/Order";
export const dynamic = "force-dynamic"
export async function POST(req, res) {
    try {
        connectDB();
        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            const orderId = await req.json();
            const orderDetails = await Order.findOne({ orderId: orderId })

            return new NextResponse(JSON.stringify({ orderDetails: orderDetails, myStatus: true }))
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error.", myStatus: false }))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "couldn't fetch Order corrosding to the orderID.", myStatus: false }))
    }
}