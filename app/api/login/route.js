import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');
export async function POST(req, res) {
    try {
        connectDB()
        let body = await req.json();
        const inputEmail = body.email
        const inputPassword = body.password
        let user = await User.findOne({ email: inputEmail })
        if (user) {
            if (user.accountType === "third party") {
                return new NextResponse(JSON.stringify({ status: false, msg: "You are logged in with Google with this email" }))
            }
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
            const descyptedPass = bytes.toString(CryptoJS.enc.Utf8);


            if (inputEmail === user.email && inputPassword === descyptedPass) {
                var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {
                    expiresIn: "2d"
                });

                return new NextResponse(JSON.stringify({ status: true, msg: "Logged in Successfully!", token }))
            }
            else {
                return new NextResponse(JSON.stringify({ status: false, msg: "Invalid Credentials" },))
            }
        }
        else {
            return new NextResponse(JSON.stringify({ status: false, msg: "No user Found" },))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ status: false, msg: "Error Encountered" }))
    }

}