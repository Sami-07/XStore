import { NextResponse } from "next/server";
import connectDB from "../../../middleware/mongoose";
import Product from "../../../models/Product";
import { getServerSession } from "next-auth";
import User from "../../../models/User";
export async function POST(req, res) {
    try {
        const session = await getServerSession();
        if (session) {
            connectDB();
            const body = await req.json();
            let category = body.category;
            let sizes = body.sizes;
            let colors = body.colors;
            let authors = body.authors;
            let genres = body.genres;
            let sortValue = body.sortValue;
            let incOutOfStock = body.incOutOfStock
           
            let results = await Product.find({ category: category })
            if (category === "Tshirts" || category === "Hoodies") {
                if (sortValue.length === 0 && colors.length === 0 && sizes.length === 0) {
                    if (!incOutOfStock) {
                        let filteredResults = results.filter((item) => {
                            return Number(item.availableQty) !== 0
                        })
                        return new NextResponse(JSON.stringify({ result: filteredResults }))
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: results }))
                    }
                }
                let filteredResults;
                if (colors.length === 0 && sizes.length === 0) {
                    filteredResults = results;

                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }
                if (colors.length !== 0 && sizes.length !== 0) {
                    filteredResults = results.filter((item) => {
                        return (sizes.includes(item.size) && colors.includes(item.color))
                    })
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }

                if (colors.length !== 0 && sizes.length === 0) {
                    filteredResults = results.filter((item) => {
                        return (colors.includes(item.color))
                    })
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }

                if (colors.length === 0 && sizes.length !== 0) {
                    filteredResults = results.filter((item) => {
                        return (sizes.includes(item.size))
                    })
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }
            }
            else {
                if (authors.length === 0 && genres.length === 0 && sortValue.length === 0) {
                    if (!incOutOfStock) {
                        let filteredResults = results.filter((item) => {
                            return Number(item.availableQty) !== 0
                        })
                        return new NextResponse(JSON.stringify({ result: filteredResults }))
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: results }))
                    }
                }
                let filteredResults;
                if (authors.length === 0 && genres.length === 0) {
                    filteredResults = results;
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }
                if (authors.length !== 0 && genres.length !== 0) {
                    filteredResults = results.filter((item) => {
                        return (authors.includes(item.author) && genres.includes(item.genre))
                    })
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }
                if (authors.length !== 0 && genres.length === 0) {
                    filteredResults = results.filter((item) => {
                        return (authors.includes(item.author))
                    })
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }
                if (authors.length === 0 && genres.length !== 0) {
                    filteredResults = results.filter((item) => {
                        return (genres.includes(item.genre))
                    })
                    let sorted = [];
                    if (sortValue === "high to low") {
                        sorted = filteredResults.sort((a, b) => a.price < b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "low to high") {
                        sorted = filteredResults.sort((a, b) => a.price > b.price ? 1 : -1)
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else if (sortValue === "popular") {
                        sorted = filteredResults.filter((item) => { return item.topSelling })
                        return new NextResponse(JSON.stringify({ result: sorted }));
                    }
                    else {
                        return new NextResponse(JSON.stringify({ result: filteredResults }));
                    }
                }
            }
            return new NextResponse(JSON.stringify({ result: results }))
        }
        else {
            return new NextResponse(JSON.stringify({ msg: "error" }));
        }
    }
    catch (err) {
        return new NextResponse(JSON.stringify({ msg: err }));
    }
}
