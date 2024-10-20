import mongoose from "mongoose";




const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["food", "clothing", "travel", "entertainment", "other"],
        required: true,
        default: "other",
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    }
})

const Transaction = new mongoose.model("Transaction", transactionSchema);

export default Transaction