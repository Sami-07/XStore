import User from "../../../models/User"
import connectDB from "../../../middleware/mongoose"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const session = await getServerSession();
        if (session) {
            const email = session.user.email;
            connectDB();
            const user = await User.findOne({ email: email });
            return new NextResponse(JSON.stringify({ result: user.accountType }));
        }
        else {
            return new NextResponse(JSON.stringify({ status: 401 }));
        }

    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: err }));
    }
}