import mongoose, { Document } from "mongoose";

type VehicleType = "bike" | "car" | "bus";

interface IVehicle extends Document {
  owner: mongoose.Types.ObjectId;
  type: VehicleType;
  vehicleModel: string;
  number: string;
  imageUrl?: string;
  baseFare?: number;
  pricePerKM?: number;
  waitingCharge?: number;
  status: "approved" | "pending" | "rejected";
  rejectionReason?: string;
  isActive: boolean;
}

const vehicleSchema = new mongoose.Schema<IVehicle>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["bike", "car", "bus"],
      required: true,
    },

    vehicleModel: {
      type: String,
      required: true,
    },

    number: {
      type: String,
      required: true,
      unique: true,
    },

    imageUrl: String,
    baseFare: Number,
    pricePerKM: Number,
    waitingCharge: Number,

    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },

    rejectionReason: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle =
  mongoose.models.Vehicle ||
  mongoose.model<IVehicle>("Vehicle", vehicleSchema);

export default Vehicle;