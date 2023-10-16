import NextAuth from "next-auth/next";
import connectDB from "../../../../middleware/mongoose";
import GoogleProvider from "next-auth/providers/google"
import User from "../../../../models/User"
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import CryptoJS from "crypto-js";
var jwt = require('jsonwebtoken');
const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                try {
                    connectDB()
                    // let body = await req.json();
                    const inputEmail = email
                    const inputPassword = password
                    let user = await User.findOne({ email: inputEmail })
                    if (user) {
                        const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
                        const descyptedPass = bytes.toString(CryptoJS.enc.Utf8);


                        if (inputEmail === user.email && inputPassword === descyptedPass) {
                            var token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, {
                                expiresIn: "2d"
                            });


                            // return {myStatus: true,user};
                            return user;
                        }
                        else {
                            // return {myStatus: false, msg: "Invalid Credentials"};
                            return null;
                        }
                    }
                    else {
                        // return {myStatus: false, msg: "No user Found"};
                        return null;
                    }
                }
                catch (err) {
                    // return {myStatus: false, msg: "Error Encountered"};
                    return null;
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        })
    ],

    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }


})


export { handler as GET, handler as POST }