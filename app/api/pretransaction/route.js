import connectDB from "../../../middleware/mongoose";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import { NextResponse } from "next/server";
import pincodes from "../../../pincodes.json"
import User from "../../../models/User";
import { getServerSession } from "next-auth";
export async function POST(req, res) {
    try {
        const session = await getServerSession();
        if (session) {
            connectDB()
            const { email, orderId, phone, cart, address, subTotal, amountToBePaid, pincode, city, state, name } = await req.json();
            const phoneNum = Number(phone);
            let containsBook = false;
            let containsNonBook = false;
            if (!Object.keys(pincodes).includes(pincode)) {
                return new NextResponse(JSON.stringify({ "msg": "The entered Pincode is not Servicable." }))
            }
            if (phone.length !== 10 || isNaN(phoneNum)) {
                return new NextResponse(JSON.stringify({ "msg": "Please Enter a 10 Digit Phone Number" }))
            }
            if (pincode.length !== 6 || isNaN(pincode)) {
                return new NextResponse(JSON.stringify({ "msg": "Please Enter a 6 Digit Pincode" }))
            }
            let checkTotal = 0;
            for (let item in cart) {
                let product = await Product.findOne({ slug: item })
           
                if (product.category === "ebooks") {
                    containsBook = true;
                }
                if (product.category === "Hoodies" || product.category === "Tshirts") {
                    containsNonBook = true;
                }
                if (containsBook && containsNonBook) {
                    return new NextResponse(JSON.stringify({ msg: "Remove clothes while ordering E Books" }))
                }
                checkTotal += product["price"] * cart[item]["qty"]
                if (product.price != cart[item]["price"]) {
                    return new NextResponse(JSON.stringify({ msg: "Some Cart item price has been tampered!", checkTotal: checkTotal }))
                }
            }
            if (checkTotal != subTotal) {
                return new NextResponse(JSON.stringify({ msg: "Cart sub Total has been tampered!", checkTotal: checkTotal }))
            }

            let order = new Order({
                name: name,
                email: email,
                phone: phone,
                orderId: orderId,
                products: cart,
                address: address,
                city: city,
                state: state,
                pincode: pincode,
                amount: amountToBePaid,
            })
            await order.save();
            return new NextResponse(JSON.stringify({ msg: "order initiated" }))
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error" }))
        }

    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: "couldn't initiate order" }))
    }

}