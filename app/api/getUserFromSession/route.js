import { getServerSession } from "next-auth"
import { NextResponse } from "next/server";
export async function GET(req, res) {
    try {
        
        const session = await getServerSession();
        if(session){
            if (Object.keys(session.user).includes("image")) {
                return new NextResponse(JSON.stringify({ email: session.user.email, name: session.user.name, imgUrl: session.user.image }))
            }
            return new NextResponse(JSON.stringify({ email: session.user.email, name: session.user.name }))
        }
        else{
            return new NextResponse(JSON.stringify({ msg: "error" }))   
        }
        }
       
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "error" }))
    }
}