import Product from "../../../models/Product"
import connectDB from "../../../middleware/mongoose"
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth";
export async function POST(req,res) {
    try {
        connectDB()
        const session = await getServerSession();
        if (session) {
        const body = await req.json();
        let clothes = await Product.find({ category: body })
      
        return new NextResponse(JSON.stringify({allProducts : clothes}))
    }
    else{
        return new NextResponse(JSON.stringify({ msg: "error" }))
    }
}
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: err.message }))
    }

}
