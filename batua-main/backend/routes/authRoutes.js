import express from "express"
import { getMe } from "../controllers/getMe.js"
import { singUp } from "../controllers/signUp.js"
import { getUserId } from "../middlewares/getUserIDFromCookie.js"
import { signIn } from "../controllers/signIn.js"
import { makeFamily } from "../controllers/makeFamily.js"
import { logout } from "../controllers/logout.js"
import { joinFamily } from "../controllers/joinFamily.js"

const router = express.Router()

router.get("/me",getUserId, getMe)
router.post("/signup", singUp)
router.post("/signin", signIn)
router.post("/makeFamily", getUserId, makeFamily)
router.post("/logout", logout)
router.put("/joinfamily",getUserId, joinFamily)


export default router