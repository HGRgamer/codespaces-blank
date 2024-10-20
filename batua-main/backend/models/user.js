import mongoose, { mongo } from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    family: {
      type: Number,
      default: null,
    },

    totalExpense: {
      type: Number,
      default: 0,
    },
    transactions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transaction",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const User = new mongoose.model("User", userSchema);

export default User;
