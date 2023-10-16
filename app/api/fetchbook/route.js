import { NextResponse } from "next/server";
import Product from "../../../models/Product";
import connectDB from "../../../middleware/mongoose";
import { getServerSession } from "next-auth";
import User from "../../../models/User";
export async function POST(req, res) {
    try {
      
        const session = getServerSession();
        if(session){
            connectDB();
            const body = await req.json();
            const slug = body.slug
    
            let bookInfo = await Product.findOne({ slug: slug })
    
            if (bookInfo.category === "ebooks") {
                return new NextResponse(JSON.stringify({ bookDetails: bookInfo }));
            }
            return new NextResponse(JSON.stringify({ msg: "category is not ebooks" }))
        }
        else{
            return new NextResponse(JSON.stringify({ err: "error" }));
        }

    }
    catch (err) {
        return new NextResponse(JSON.stringify({ err: err.message }));
    }


}