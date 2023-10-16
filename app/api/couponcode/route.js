import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
export async function POST(req, res) {
    const session = await getServerSession();
    if(session){
        const couponCode = await req.json();
        const couponCodes = ["123", "234"]
        if (couponCodes.includes(couponCode)) {
            return NextResponse.json({ valid: true })
        }
        else {
            return NextResponse.json({ valid: false })
        }  
    }
    else{
        return NextResponse.json({ valid: false })
    }

}