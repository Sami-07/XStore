import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import { getServerSession } from "next-auth";
import Order from "../../../models/Order";
export async function GET(req, res) {
    try {
        connectDB();
        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            let allOrders = await Order.find({})

            return new NextResponse(JSON.stringify({ allOrders: allOrders }));
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error" }));
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "error" }));
    }
}