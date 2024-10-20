import Family from "../models/family.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const makeTransaction = async (req, res) => {
  try {
    const userId = req.userId;
    const familyId = req.familyId;
    const name = req.name;
    const { amount, description, type } = req.body;
    const date = new Date().getDate() + "-" + (new Date().getMonth()+1)  + "-" + new Date().getFullYear();
    const month = new Date().getMonth() +1 + "-" + new Date().getFullYear();
    if (!userId || !amount || !description || !type) {
      return res.status(400).json({ message: "insuffiecient data" });
    }
    
    const newTransaction = new Transaction({
      userId: userId,
      name: name,
      description: description,
      type: type,
      amount: amount,
      date: date,
      month: month
    })

    await newTransaction.save();
    await User.updateOne({_id: userId}, { $push: {transactions: newTransaction._id}, $inc: {totalExpense: amount}});
    familyId ? await Family.updateOne({familyId: familyId}, { $push: {transactions: newTransaction._id}, $inc: {totalFamilyExpense: amount}}) : ""
    
    return res.status(200).json({ message: "transaction created" });
  } catch (error) {
    console.log("error in makeTransaction ", error);
    res.status(500).json({ message: "internal server error" });
  }
};
