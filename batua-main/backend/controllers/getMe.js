import { getUserId } from "../middlewares/getUserIDFromCookie.js"
import User from "../models/user.js"


export const getMe = async (req, res) => {
    const userId = req.userId
    const signedUser = await User.findById(userId).select("-password");
    res.status(200).json(signedUser)
}