import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose"
import Product from "../../../models/Product"
export const dynamic = "force-dynamic"
export async function GET(req, res) {
    try {
        let query = req.nextUrl.searchParams.get("query")
        connectDB();
        const products = await Product.aggregate([
            {
                $match: {
                    $or: [
                        { "title": { $regex: query, $options: "i" } }
                    ]
                }
            }
        ]);
        return NextResponse.json({ ok: true, products})
    }
    catch (err) {
        return NextResponse.json({ ok: false })
    }
}