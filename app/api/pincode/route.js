import { NextRequest, NextResponse } from "next/server"
import pincodes from "../../../pincodes.json"
import { getServerSession } from "next-auth";
export async function GET(req, res) {
    const session = await getServerSession();
  
    try {
        if(session){
            return new NextResponse(JSON.stringify(pincodes))
        }
        else{
            return new NextResponse("Method Not Allowed", { status: 405 });
        }
       
    }
    catch (err) {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }
} 
