import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose"
import Product from "../../../models/Product"
import User from "../../../models/User";
import { getServerSession } from "next-auth";
export async function GET(req, res) {
    try {
        connectDB();
        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            let products = await Product.find({})
            return NextResponse.json({ ok: true, products })
        }
        else {
            return NextResponse.json({ ok: false })
        }
    }
    catch (err) {
        return NextResponse.json({ ok: false })
    }
}