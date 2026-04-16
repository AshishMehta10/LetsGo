import connectDb from "@/lib/db"
import User from "@/models/user.model"
import { NextRequest } from "next/dist/server/web/spec-extension/request"
import { NextResponse } from "next/dist/server/web/spec-extension/response"

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { message: "Email already verified" },
        { status: 400 }
      );
    }

   //✅ 1. Check expiry FIRST
    if (!user.otpExpires || new Date(user.otpExpires) < new Date()) {
      console.log("OTP expired:", user.otpExpires);
      return NextResponse.json(
        { message: "OTP has expired" },
        { status: 400 }
      );
    } 

    // ✅ 2. Convert both to string before comparing
    if (String(user.otp) !== String(otp)) {
      console.log("Stored OTP:", user.otp);
      console.log("Entered OTP:", otp);
      return NextResponse.json(
        { message: "Invalid OTP" },
        { status: 400 }
      );
    }

    // ✅ 3. Mark verified
    user.emailVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error verifying email" },
      { status: 500 }
    );
  }
}