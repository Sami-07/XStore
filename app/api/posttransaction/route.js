import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Razorpay from 'razorpay';

export async function POST(req, res) {
    try {
        const session = await getServerSession();
        if (session) {
            const body = await req.json();
            const razorpayInstance = new Razorpay({
                key_id: process.env.RAZORPAY_KEY_ID,
                key_secret: process.env.RAZORPAY_KEY_SECRET
            })
            //check the amount varialbe name
            const amount = body.amountToBePaid * 100;

            const options = {
                amount: amount,
                currency: "INR",
                receipt: "sami@gmail.com",
            }

            const order = await razorpayInstance.orders.create(options);
           
            return new NextResponse(JSON.stringify({ success: true, msg: "Payment Success", razorpayOrderId: order.id, amount: amount, key_id: process.env.RAZORPAY_KEY_ID }));
        }
        else {
            return new NextResponse(JSON.stringify({ success: false, msg: "error" }));
        }

    } catch (err) {

        return new NextResponse(JSON.stringify({ success: false, msg: "Payment Failed" }));
    }
}
