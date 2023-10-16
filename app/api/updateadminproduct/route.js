import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose"
import User from "../../../models/User";
import { getServerSession } from "next-auth";
import Product from "../../../models/Product"
export async function POST(req, res) {
    try {
        connectDB();
        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            const { slug, name, price, prevPrice, category, availableQty, color, size , img} = await req.json();
            await Product.findOneAndUpdate({ slug: slug }, { name, slug, category, price, prevPrice, availableQty, color, size, img})
            return NextResponse.json({ ok: true })
        }
        else{
            return NextResponse.json({ ok: false }) 
        }
    }
    catch (err) {
        return NextResponse.json({ ok: false })
    }
}