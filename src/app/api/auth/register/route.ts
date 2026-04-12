import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    console.log(name, email, password)
    await connectDb()
    let user = await User.findOne({ email })
    if (user) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ message: "Password must be at least 6 characters long" }, { status: 400 })
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    user = await User.create({ name, email, password: hashedPassword })
    return NextResponse.json(user, { status: 201 })



  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Error registering user" }, { status: 500 })
  }
}