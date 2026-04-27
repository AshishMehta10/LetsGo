import mongoose from "mongoose";

interface IPartnerBank {
  partner: mongoose.Types.ObjectId;

  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  upi?: string;

  branchName?: string;


  status: "not_added" | "added" | "verified";

  createdAt: Date;
  updatedAt: Date;
}

const partnerBankSchema = new mongoose.Schema<IPartnerBank>(
  {
    partner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    accountHolderName: {
      type: String,
      required: true,
    },

    bankName: {
      type: String,
      required: true,
    },

    accountNumber: {
      type: String,
      required: true,
    },

    ifscCode: {
      type: String,
      required: true,
    },

    branchName: {
      type: String,
    },

    upi: {
      type: String

    },

    status: {
      type: String,
      enum: ["not_added", "added", "verified"],
      default: "not_added",
    }


  },
  {
    timestamps: true,
  }
);

const PartnerBank =
  mongoose.models.PartnerBank ||
  mongoose.model<IPartnerBank>("PartnerBank", partnerBankSchema);

export default PartnerBank;