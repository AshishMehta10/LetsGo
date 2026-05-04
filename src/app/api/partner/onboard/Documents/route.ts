import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";

export async function POST(req: Request) {
  try {
    await connectDb();
    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "User Not found" }, { status: 400 });
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User Not found" }, { status: 400 });
    }

    const formdata = await req.formData();

    const adharUrl = formdata.get("adharUrl") as Blob | null;
    const rc = formdata.get("rc") as Blob | null;
    const licenceurl = formdata.get("licenceurl") as Blob | null;

    if (!adharUrl || !rc || !licenceurl) {
      return Response.json(
        { message: "All documents are required" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }