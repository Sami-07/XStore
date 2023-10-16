import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose"
import Order from "../../../models/Order"
import Product from "../../../models/Product"
export async function POST(req, res) {
    try {
       
        connectDB();
        const body = await req.json();
        const order = await Order.findOne({ orderId: body.orderId })
        const products = order["products"];
      
        const session = await getServerSession();
    
        if (session.user.email === order.email) {

            Object.keys(products).map(async (product) => {
                let item = await Product.findOne({ slug: product })

                let itemQty = parseInt(item.availableQty)
              
                let updatedQty = itemQty - products[product].qty

            
                await Product.findOneAndUpdate({ slug: product }, { availableQty: updatedQty })
              
             
            })
return new NextResponse(JSON.stringify({success : true}))
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error1" }))
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: err.message }))
    }
}