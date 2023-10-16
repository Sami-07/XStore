import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose";
import { getServerSession } from "next-auth";
import Product from "../../../models/Product"
export async function POST(req, res) {
    try {
        const session = await getServerSession();
        if(session){
            connectDB();
            const cart = await req.json();
    
            let stockQty = {};
            for (let i = 0; i < Object.keys(cart).length; i++) {
    
                let slug = Object.keys(cart)[i];
                let product = await Product.findOne({ slug: slug });
    
    
                stockQty[slug] = product.availableQty
    
            }
    
    
            return NextResponse.json({ ok: true, stockQty })
        }
        else{
            return NextResponse.json({ ok: false });
        }
     
    }
    catch (err) {
        return NextResponse.json({ ok: false });
    }
}