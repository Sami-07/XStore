import User from "models/User"
import connectDB from "../../../middleware/mongoose"
import { NextResponse } from "next/server"
import CryptoJS from "crypto-js"

export async function POST(req, res) {

    try {
        connectDB()
        let body = await req.json()
        const { name, email, password} = body

        let u = new User({
            name, email, password: CryptoJS.AES.encrypt(password, process.env.AES_SECRET).toString(), accountType : "custom signup"

        })
        await u.save()

        return new NextResponse(JSON.stringify({ success: "api success", myStatus : true }))

    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "Error Signing up.", myStatus : false  }))
    }
}