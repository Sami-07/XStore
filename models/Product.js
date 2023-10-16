import mongoose from "mongoose";
const { Schema } = mongoose;
const ProductSchema = new Schema({

    //COMMON keys to all Products
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String },
    category: { type: String, required: true },
    previousPrice: { type: Number },
    price: { type: Number, required: true },
    availableQty: { type: String, required: true },
    topSelling: { type: Boolean, default: false },

    //Keys for Tshirts and Hoodies
    size: { type: String },
    color: { type: String },

    //Keys for E Books
    author: { type: String },
    pages: { type: String },
    genre: { type: String },
    fileName : {type: String},
    filePath : {type: String}

}, { timestamps: true })
export default mongoose.models.Product || mongoose.model("Product", ProductSchema)