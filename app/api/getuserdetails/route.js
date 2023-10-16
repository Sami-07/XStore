import { getServerSession } from "next-auth";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        const session = await getServerSession();
        const userEmail = session.user.email;

        connectDB()
        const body = await req.json()
        const email = body.paramEmail

        if (userEmail === email) {
            const user = await User.findOne({ email: email })
         
            return new NextResponse(JSON.stringify({
                address: user.address, phone: user
                    .phone, pincode: user.pincode, name: user.name
            }))
        }
        else{
            return new NextResponse(JSON.stringify({ myStatus: false, msg: "error"}))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ myStatus: false, msg: err.message }))
    }

}