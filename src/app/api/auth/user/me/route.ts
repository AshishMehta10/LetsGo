import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { connect } from "mongoose";

export async function GET(request: Request) {
  try {
    await connectDb()
    const session = await auth()
    if (!session || !session.user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 })
    }
    const user = await User.findOne({ email: session.user.email })
    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 })
    }
    return new Response(JSON.stringify({ user }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error fetching user" }), { status: 500 })
  }
}