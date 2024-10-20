import Family from "../models/family.js";
import Transaction from "../models/transaction.js";
import User from "../models/user.js";

export const getFamilyLineGraphData = async (req, res) => {
  try {
    const userId = req.userId;
    const date = req.body.date;
    if (!date) {
      return res.status(400).json({ message: "invalid data" });
    }
    const family = await Family.findOne({ members: userId });
    let data = [];
    for(let i = 10; i >=0 ; i--){
        const transactions = await Transaction.find({
            userId: family.members,
            date:
              (new Date(date).getDate()-i) +
              "-" +
              (new Date(date).getMonth() + 1) +
              "-" +
              new Date(date).getFullYear(),
          });
          
          var totalExpense = 0;
          transactions.forEach((transaction) => {
              totalExpense += transaction.amount;
          })
          data.push({date: (new Date(date).getDate()-i) +
            "-" +
            (new Date(date).getMonth() + 1) +
            "-" +
            new Date(date).getFullYear(), totalExpense: totalExpense});
    }
    return res.status(200).json({data});
  } catch (error) {
    console.log("error in getDailyExpense ", error);
    res.status(500).json({ message: "internal server error" });
  }
};
