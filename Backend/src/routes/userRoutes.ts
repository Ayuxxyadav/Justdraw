import express from "express" ;
import { userSignup } from "../controller/signup.js";
import { userSignin } from "../controller/signin.js";
import { userMiddleware } from "../middleware/usermiddleware.js";
import { createRoom } from "../controller/createRoom.js";
import { listofRoom } from "../controller/listofRoom.js";
import { editRoom } from "../controller/editRoom.js";
import { deleteRoom } from "../controller/deleteRoom.js";



const router = express.Router() ;


router.post("/user/signup",userSignup);
router.post("/user/signin",userSignin);

router.post("/user/create-room",userMiddleware ,createRoom);
router.get("/user/list-of-room",userMiddleware,listofRoom);
router.put("/user/edit-room/:id",userMiddleware,editRoom);
router.delete("/user/delete-room/:id",userMiddleware,deleteRoom);


export default router ;