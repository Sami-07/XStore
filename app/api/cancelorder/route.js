import { getServerSession } from "next-auth";
import connectDB from "../../../middleware/mongoose"
import Order from "../../../models/Order"
import { NextResponse } from "next/server";
import Product from "../../../models/Product"
export async function POST(req, res) {
    try {

        const session = await getServerSession();

        const body = await req.json();

       
        connectDB();
        const order = await Order.findOne({ orderId: body.orderId });
        if (order.email === session.user.email) {
            if (order.deliveryStatus !== "Cancelled") {
                await Order.findOneAndUpdate({ orderId: body.orderId }, { deliveryStatus: "Cancelled" })

                const products = order["products"];
                Object.keys(products).map(async (product) => {
                    let item = await Product.findOne({ slug: product })
                    let itemQty = parseInt(item.availableQty)
                    let updatedQty = itemQty + products[product].qty
                    await Product.findOneAndUpdate({ slug: product }, { availableQty: updatedQty })
                })
                return new NextResponse(JSON.stringify({ ok: true }))
            }
            else {
                return new NextResponse(JSON.stringify({ ok: false }))
            }
        }
        else {
            return new NextResponse(JSON.stringify({ ok: false }))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ ok: false, msg: err.message }))
    }
}