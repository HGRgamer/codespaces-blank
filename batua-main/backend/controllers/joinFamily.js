import Family from "../models/family.js";
import User from "../models/user.js";


export const joinFamily = async (req, res) => {
    try{
        const { familyId } = req.body;
    const userId = req.userId;

    if (!familyId) {
        return res.status(400).json({ message: "invalid data" });
    }
    const family = await Family.findOne({ familyId: familyId });

    if (!family) {
        return res.status(404).json({ message: "family not found" });
    }

    if (family.members.includes(userId)) {
        return res.status(400).json({ message: "user already in the family" });
    }

    await Family.updateOne({ familyId: familyId }, { $push: { members: userId } });
    await User.updateOne({ _id: userId },  { family: family.familyId } );
    return res.status(200).json({ message: "family joined" });
    }   
    catch(error){
        console.log("error in joinFamily ", error);
        res.status(500).json({ message: "internal server error" });
    }
}