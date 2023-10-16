import jsonWebToken from "jsonwebtoken"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
    try {
const session = await getServerSession();
if(session){

    const token = await req.json()
    const decryptedData = await jsonWebToken.verify(token, process.env.JWT_SECRET);
    const email = decryptedData.email
    const name = decryptedData.name
   
    return new NextResponse(JSON.stringify({ email: email, name: name }))
}    
else{
    return new NextResponse(JSON.stringify({ msg: "error occured" }))
}  
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "error occured" }))
    }

}