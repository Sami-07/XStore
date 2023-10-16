import mongoose from 'mongoose';
const { Schema } = mongoose;
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: "" },
    password: { type: String },
    address: { type: String, default: "" },
    pincode: { type: String, default: "" },
    accountType: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true })
export default mongoose.models.User || mongoose.model("User", UserSchema)