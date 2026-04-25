import { auth } from "@/auth";
import connectDb from "@/lib/db";
import User from "@/models/user.model";
import Vehicle from "@/models/vehicle.model";

export async function POST(req: Request) {
  const VEHICLE_REGEX = /^[A-Z]{2}[0-9]{1,2}[A-Z]{0,2}[0-9]{4}$/;

  try {
    await connectDb();

    const session = await auth();
    if (!session || !session.user?.email) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const { type, number, vehicleModel } = await req.json();

    if (!type || !number || !vehicleModel) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    const vehicleNumber = number.toUpperCase().replace(/\s/g, "");

    if (!VEHICLE_REGEX.test(vehicleNumber)) {
      return Response.json(
        { message: "Invalid vehicle number" },
        { status: 400 }
      );
    }

    // ✅ check duplicate globally
    const existingVehicle = await Vehicle.findOne({ number: vehicleNumber });
    if (existingVehicle && existingVehicle.owner.toString() !== user._id.toString()) {
      return Response.json(
        { message: "Vehicle already registered" },
        { status: 400 }
      );
    }


    // ✅ find existing vehicle for this user
    let vehicle = await Vehicle.findOne({ owner: user._id });

    if (vehicle) {
      // update
      vehicle.type = type;
      vehicle.number = vehicleNumber;
      vehicle.vehicleModel = vehicleModel;
      vehicle.status = "pending";
      await vehicle.save();
    } else {
      // create
      vehicle = await Vehicle.create({
        owner: user._id,
        type,
        number: vehicleNumber,
        vehicleModel,
        status: "pending",
      });
    }

    return Response.json(
      {
        message: "Vehicle saved successfully",
        vehicle,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json({ message: "Server Error" }, { status: 500 });
  }
}