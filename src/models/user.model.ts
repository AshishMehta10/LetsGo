import mongoose, { Document } from 'mongoose'

interface IUser extends Document {
    name: string,
    email: string,
    password?: string,
    role: "user" | "partner" | "admin",
    emailVerified: boolean,
    otp?: string,
    otpExpires?: Date,
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String, enum: ["user", "partner", "admin"], default: "user" },
    emailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date }


}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User