import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import connectDB from "../../../middleware/mongoose"
import User from "../../../models/User"
export const dynamic = "force-dynamic"
export async function GET(req, res) {
    try {
        connectDB();

        const session = await getServerSession();
        if(session){
            const email = session.user.email;
            const user = await User.findOne({ email: email })
            
           
            return new NextResponse(JSON.stringify({ isAdmin: user.isAdmin }));
        }
        else{
            return new NextResponse(JSON.stringify({ msg: "error" }))
        }
      
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: err.message }))
    }

}