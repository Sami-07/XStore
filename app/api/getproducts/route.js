import Product from "../../../models/Product";
import connectDB from "../../../middleware/mongoose";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
export async function GET(req, res) {
    try {
        await connectDB()
        const session = await getServerSession();
   
        if (session) {
            const products = await Product.find();

            return new NextResponse(JSON.stringify({ products: products }), {
                headers: {
                    "Content-Type": "application/json",
                }
            })
        }
        else {
            return new NextResponse(JSON.stringify({ error: "error" }), {
                status: 500,
            });
        }

    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
            status: 500,
        });
    }
}
