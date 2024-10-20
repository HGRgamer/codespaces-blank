import { getUserId } from "../middlewares/getUserIDFromCookie.js"
import Family from "../models/family.js"
import User from "../models/user.js"


export const makeFamily = async (req, res) =>{
   try{
    const userId = req.userId

    const family = await Family.findOne({owner: userId}) || await Family.findOne({members: userId})
    if(family){
        return res.status(400).json({message: "Already in a Family"})
    }


    const newFamily = new Family({
        members: [userId],
        owner: userId,
        familyId: Math.floor(100000 + Math.random() * 900000)
    })
    await newFamily.save()
    await User.updateOne({ _id: userId}, {family: newFamily.familyId})
    res.status(200).json({message: "family created"})
   }
   catch(error){
    console.log("error in makeFamily ", error)
    res.status(500).json({message: "internal server error"})
   }
}