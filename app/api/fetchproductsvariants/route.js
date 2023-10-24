import Product from '../../../models/Product';
import connectDB from '../../../middleware/mongoose';
import { NextResponse } from 'next/server';
import { notFound } from "next/navigation"
import { getServerSession } from 'next-auth';
export const dynamic = "force-dynamic"
export async function GET(req, res) {
    try {
        const session = await getServerSession();
        // if (session) {
            connectDB()
            let slug = await req.nextUrl.searchParams.get("query")
            let singleProduct = await Product.findOne({ slug: slug })
           
            if (singleProduct == null) {
                return new NextResponse(JSON.stringify(), { status: 404 })
            }
            let variants = await Product.find({ title: singleProduct.title })
            let colorSizeSlug = {}
            for (let item of variants) {
                if (Object.keys(colorSizeSlug).includes(item.color)) {
                    colorSizeSlug[item.color][item.size] = { slug: item.slug }
                }
                else {
                    colorSizeSlug[item.color] = {}
                    colorSizeSlug[item.color][item.size] = { slug: item.slug }
                }
            }

            return new NextResponse(JSON.stringify({ singleProduct: singleProduct, colorSizeSlug: colorSizeSlug }))
        // }
        // else {
        //     return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
        //         status: 500,
        //     });
        // }
    }

    catch (error) {
        if (error) {
            notFound()
        }
        else {
            return new NextResponse(JSON.stringify({ error: "An error occurred" }), {
                status: 500,
            });
        }

    }
}