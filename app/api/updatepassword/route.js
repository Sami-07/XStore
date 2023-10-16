import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import { NodeNextResponse } from "next/dist/server/base-http/node";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js"
import { getServerSession } from "next-auth";

export async function POST(req, res) {
    try {
const session = await getServerSession();
if(session){
    connectDB()
    const { email, newPassword } = await req.json();

    await User.findOneAndUpdate({ email: email }, { password: CryptoJS.AES.encrypt(newPassword, process.env.AES_SECRET).toString() })
    return new NextResponse(JSON.stringify({ msg: "Password Updated Successfully!", myStatus: true }))
}
else{
    return new NextResponse(JSON.stringify({ msg: "error", myStatus: false }))
}
       
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "Couldn't Update Password.", myStatus: false }))
    }
}