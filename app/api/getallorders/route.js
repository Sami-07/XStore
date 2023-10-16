import connectDB from "../../../middleware/mongoose";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
export async function POST(req, res) {
    try {
        const session = await getServerSession();
        if (session) {
            connectDB();
            const email = await req.json();
            const allOrders = await Order.find({ email: email })
            return new NextResponse(JSON.stringify({ allOrders }))
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error fetching your orders list" }))
        }

    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "error fetching your orders list" }))
    }

}