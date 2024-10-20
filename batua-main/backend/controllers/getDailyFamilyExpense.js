import Family from "../models/family.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const getDailyFamilyExpense = async (req, res) => {
  try {
    const userId = req.userId;
    const date = req.body.date;

    if (!date) return res.status(401).json({ message: "invalid data" });

    const family = await Family.findOne({ members: userId });
    if (!family) return res.status(400).json({ message: "Not in Family" });

    const transactions = await Transaction.find({
      userId: family.members,
      date:
        new Date(date).getDate() +
        "-" +
        (new Date(date).getMonth() + 1) +
        "-" +
        new Date(date).getFullYear(date),
    });
    if (transactions.length === 0)
      return res.status(200).json({ message: "nothing found" });
    return res.status(200).json( transactions );
  } catch (error) {
    console.log("error in getDailyExpense ", error);
    res.status(500).json({ message: "internal server error" });
  }
};
