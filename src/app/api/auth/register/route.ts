import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/senmail";


export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    console.log(name, email, password)
    await connectDb()
    let user = await User.findOne({ email })
    if (user && user.emailVerified) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // OTP expires in 10 minutes

    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    if (user && !user.emailVerified) {
      user.name = name,
        user.password = hashedPassword
      user.email = email
      user.otp = otp

      user.otpExpires = otpExpires
      await user.save(
      )
    } else {
      user = await User.create({ name, email, password: hashedPassword, otp, otpExpires })
    }
    await sendEmail(email, "Verify your email", `<p>Your OTP for email verification is: <b>${otp}</b>. It will expire in 10 minutes.</p>`)


    return NextResponse.json(user, { status: 201 })



  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error registering user" }, { status: 500 })
  }
}