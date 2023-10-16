import User from "models/User"
import connectDB from "../../../middleware/mongoose"
import { NextResponse } from "next/server"


export async function POST(req, res) {

    try {
        connectDB()
        let body = await req.json()
        const { name, email } = body
        const user = await User.findOne({ email: email })
        if (user) {
            return new NextResponse(JSON.stringify({ msg: "user already exists as a member via google" }))
        }
        if (!user) {
            
            let u = new User({
                name, email, accountType: "third party"
            })
            await u.save()
            return new NextResponse(JSON.stringify({ success: "user created with email supplied by google", myStatus: true }))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "Error Signing up.", myStatus: false }))
    }
}