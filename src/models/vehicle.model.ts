import { time } from "console";
import mongoose from "mongoose";


type vechiletype =
  "bike" |
  "car" |
  "bus";


interface Ivehicle {
  owner: mongoose.Types.ObjectId,
  type: vechiletype,
  vechileModel: string,
  number: string,
  imageurl?: string
  baseFare?: number
  priceperKM: number
  waitingCharge: number
  status: "approved" | "pending" | "rejected"
  rejectionReson: string,
  isactive: boolean,
  createdAt: Date,
  updatedAt: Date
}

const vechileschema = mongoose.Schema<Ivehicle>(
  }, { })