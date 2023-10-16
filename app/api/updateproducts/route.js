import Product from "../../../models/Product";
import connectDB from "../../../middleware/mongoose";
import { NextResponse } from "next/server";
import User from "../../../models/User";
import { getServerSession } from "next-auth";
export async function POST(req, res) {
    try {
        connectDB();

        const session = await getServerSession();
        const userEmail = session.user.email;
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            const body = await req.json();
            for (let i = 0; i < body.length; i++) {
                try {
                    await Product.findByIdAndUpdate(body[i]._id, body[i]);
                }
                catch (err) {
                  
                }
            }

            return new NextResponse(JSON.stringify({ success: "SUCCESS" }))
        }
        else{
            return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
                status: 500,
            });
        }
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}

