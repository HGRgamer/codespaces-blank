import Family from "../models/family.js";
import Transaction from "../models/transaction.js";


 
export const getDailyFamilyKharcha = async (req,res) => {
try {
    const userId = req.userId
    const date = req.body.date
    if (!date) {
        return res.status(400).json({ message: "invalid data" });
    }

    const family = await Family.findOne({ members: userId });
    if (!family) {
        return res.status(400).json({ message: "Not in Family" });
    }

    const transactions = await Transaction.find({
        userId: family.members,
        date: new Date(date).getDate() +
            "-" +
            (new Date(date).getMonth() + 1) +
            "-" +
            new Date(date).getFullYear(date),
    });

    var dailyKharcha = 0;
    if(transactions.length ===0){
        return res.status(200).json(dailyKharcha)
    }

    transactions.forEach((transaction) => {
        dailyKharcha += transaction.amount;
    });

    return res.status(200).json(dailyKharcha)



} catch (error) {
    console.log("error in getDailyFamilyKharcha", error);
    return res.status(500).json({message: "internal server error"})
}


}