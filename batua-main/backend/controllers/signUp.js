import { setCookie } from "../utils/cookieSetter.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

export const singUp = async (req, res) => {
  try {
    const { name, email, number, password } = req.body;
    if(!name || !email || !number || !password){
      return res.status(201).json({message: "insufficient data"})
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid Email" });
      }

      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ message: "email already registered" });
      }
      const existingNumber = await User.findOne({ number });
      if (existingNumber) {
        return res.status(400).json({ message: "number already registered" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      
      const newUser = new User({
        name,
        number,
        email,
        password: hashedPassword
      })

    await newUser.save()
    setCookie(newUser._id, res)
    return res.status(200).json({ newUser });
  
  } catch (error) {
    console.log("error in signup controller", error);
    return res.status(500).json({ message: "internal server error" });
  }
};
