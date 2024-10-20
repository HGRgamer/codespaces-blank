import jwt from "jsonwebtoken"
import User from "../models/user.js";


export const getUserId = async (req, res, next) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "You need to login first" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
        return res.status(401).json({ message: "You need to login first" });
    }
    req.name = user.name;
    req.familyId = user.family;
    req.userId = decodedToken.userId;
    next();

}