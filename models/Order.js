import mongoose, { mongo } from "mongoose";
const { Schema } = mongoose
const OrderSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    orderId: { type: String, required: true },
    paymentInfo: { type: String, default: "initiated" },
    products: { type: Object, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending", required: true },
    deliveryStatus: { type: String, default: "Yet to be delivered", required: true },
}, { timestamps: true })
export default mongoose.models?.Order || mongoose.model("Order", OrderSchema)
