import Family from "../models/family.js";
import Transaction from "../models/transaction.js";





export const getLastMonthFamilyExpense = async (req, res) => {
    try {
        const userId = req.userId;
        const date = req.body.date;
        if (!date) {
            return res.status(400).json({ message: "invalid data" });
        }

        const family = await Family.findOne({ members: userId });
        if (!family) {
            return res.status(400).json({ message: "Not in Family" });
        }

        const transactions = await Transaction.find({
            userId: family.members,
            month: new Date(date).getMonth() + "-" + new Date(date).getFullYear(),
        });

        var lastMonthExpense = 0;
        if (transactions.length === 0) {
            return res.status(200).json({ lastMonthExpense: lastMonthExpense });
        }

        transactions.forEach((transaction) => {
            lastMonthExpense += transaction.amount;
        });

        return res.status(200).json({ lastMonthExpense: lastMonthExpense });
    } catch (error) {
        console.log("error in getDailyExpense ", error);
        res.status(500).json({ message: "internal server error" });
    }
}