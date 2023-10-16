import Product from "../../../models/Product"
import connectDB from "../../../middleware/mongoose";
import User from "../../../models/User"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export async function POST(req, res) {
    try {
        connectDB()
        const session = await getServerSession();
        const userEmail = session.user.email;
       
        const DBuser = await User.findOne({ email: userEmail })
        if (DBuser.isAdmin === true) {
            const formData = await req.formData();
            let body = Object.fromEntries(formData);
          
            let title = body.name
            let slug = body.slug
            let desc = body.desc
            let img = body.img
            let category = body.category
            let size = body.size
            let color = body.color
            let price = body.price
            let previousPrice = body.previousPrice
            let availableQty = body.availableQty
            let author = body.author
            let pages = body.pages
            let fileName = body.fileName
            let filePath = body.filePath
            let genre = body.genre
            let myProduct = new Product({
                title: title,
                slug: slug,
                desc: desc,
                img: img,
                category: category,
                size: size,
                color: color,
                price: price,
                previousPrice: previousPrice,
                availableQty: availableQty,
                author: author,
                pages: pages,
                genre : genre,
                fileName: fileName,
                filePath: filePath
            })


            await myProduct.save()
          

            return new NextResponse(JSON.stringify({ myStatus: true, success: "SUCCESS" }))
        }
        else {
            return new NextResponse(JSON.stringify({ myStatus: false, msg: err.message })
            );
        }
    }

    catch (err) {
        return new NextResponse(JSON.stringify({ myStatus: false, msg: err.message })
        );
    }
}

