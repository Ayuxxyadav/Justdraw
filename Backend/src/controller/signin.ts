import { Request ,Response } from "express"
import { signinSchema } from "../zod/userZodSchema.js";
import {prisma} from "../db/src/db.js" ;
import bcrypt from "bcrypt" ;
import jwt from "jsonwebtoken" ;




export const userSignin = async (req:Request, res:Response) => {
  try {
   const parsedData= signinSchema.safeParse(req.body)
    if(!parsedData.success){
    return res.status(400).json({
        message:"Signin ip input validation failed"
     })
    }

   const { username ,password}  = parsedData.data ;
  

   const User = await prisma.user.findUnique({
    where : {
        username : username
    }
   })

    if( !User ){
    return res.status(400).json({
        message : "Username not registered in our database" 
    })
   }

   const hashedPassword = await bcrypt.compare(password,User.password)

   if ( !hashedPassword ){
    return res.status(400).json({
        message : "Username or password might be incorrect" 
    }) }

    const Token = jwt.sign({
        userId : User?.id
    },process.env.JWT_SECRET as string)

   return res.status(200).json({
    message : "User Successfully logged in",
    Token : Token ,
    username : User.username ,
    email : User.email
})


 } catch(error){
     res.status(500).json({ message: "Server error" });
} }
