import { setCookie } from "../utils/cookieSetter.js"
import User from "../models/user.js"
import bcrypt from "bcryptjs"


export const signIn = async (req, res) => {

    try{
        const {emailOrNumber, password} = req.body
        if(!emailOrNumber || !password){
            return res.status(400).json({message: "insufficient data"})
        }
        const user = await User.findOne({email: emailOrNumber}) 
        if(!user){
            return res.status(400).json({message: "user not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message: "incorrect password"})
        }
        setCookie(user._id, res)
        return res.status(200).json({message: "successfully Logged in"})    
    
}
    catch(error){   
        console.log("error in sign in controller ", error)
        res.status(500).json({message: "internal server error"} )
}
}