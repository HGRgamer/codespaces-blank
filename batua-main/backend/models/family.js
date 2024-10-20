import mongoose from "mongoose";
import User from "./user.js";

const familySchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    
    totalFamilyExpense: {
      type: Number,
      default: 0,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    familyId: {
      type: Number,
      required: true,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        default: []
      }
    ],
  },
  { timestamps: true }
);

const Family = new mongoose.model("Family", familySchema);

export default Family;
