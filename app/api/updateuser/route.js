import { getServerSession } from "next-auth";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import jsonWebToken from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req, res) {
    try {
        connectDB()
        const session = await getServerSession();
        if (session) {
            const { email, address, phone, pincode } = await req.json()

            await User.findOneAndUpdate({ email: email }, { address: address, phone: phone, pincode: pincode })
            return new NextResponse(JSON.stringify({ msg: "Updated user Successfully" }))
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error occured" }))
        }

    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "error occured" }))
    }

}