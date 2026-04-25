import mongoose from "mongoose";


interface IpartnerDoc {
  owner: mongoose.Types.ObjectId,
  adharUrl: string,
  rc: string,
  licenceurl: string,
  status: "approved" | "pending" | "rejected";
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const partnerdocSchema = new mongoose.Schema<IpartnerDoc>(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    adharUrl: String,
    rc: String,
    licenceurl: String,

    status: {
      type: String,
      enum: ["approved", "pending", "rejected"],
      default: "pending",
    },

    rejectionReason: {
      type: String,
    },


  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);



const partnerdoc =
  mongoose.models.Vehicle || mongoose.model<IpartnerDoc>("partnerdocS", partnerdocSchema);

export default partnerdoc;