import express from "express" ;
import { userSignup } from "../controller/signup.js";
import { userSignin } from "../controller/signin.js";
import { userMiddleware } from "../middleware/usermiddleware.js";
import { createRoom } from "../controller/createRoom.js";

``

const router = express.Router() ;


router.post("/user/signup",userSignup);
router.post("/user/signin",userSignin);
router.post("/user/create-room",userMiddleware ,createRoom);


export default router ;