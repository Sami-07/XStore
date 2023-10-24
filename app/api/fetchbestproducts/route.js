import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose";
import Product from "../../../models/Product";
import { getServerSession } from "next-auth";
export const dynamic = "force-dynamic"
export async function GET(req, res) {
    try {
        const session = await getServerSession();
        // if(session){
            connectDB();
            let products = await Product.find({ topSelling: true });
            return NextResponse.json({ ok: true, products });
    //     }
    //    else{
    //     return NextResponse.json({ ok: false });
    //    }
    }
    catch (err) {
        return NextResponse.json({ ok: false });
    }
}