import Transaction from "../models/transaction.js";



export const getLastMonthExpense = async (req, res) => {

    const userId = req.userId;
    const date = req.body.date;

    if(!date){
        return res.status(400).json({ message: "invalid data" });
    }

    const transactions = await Transaction.find({
        userId: userId,
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

}