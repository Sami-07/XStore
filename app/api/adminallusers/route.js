import { getServerSession } from "next-auth";
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic"
export async function GET(req, res) {
    try {
        connectDB();
        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            const users = await User.find({});
            return new NextResponse(JSON.stringify({ ok: true, users: users }));

        }
        else {
            return new NextResponse(JSON.stringify({ ok: false }))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ ok: false, err: err.message }))
    }

}