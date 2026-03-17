import { Request ,Response } from "express"
import { signupSchema } from "../zod/userZodSchema.js";
import {prisma} from "../db/src/db.js"
import bcrypt from "bcrypt"

export const userSignup = async (req:Request, res:Response) => {
  try {
   const parsedData= signupSchema.safeParse(req.body)
  if(!parsedData.success){
    return res.status(400).json({
        message:"Signup input validation failed"
    })
  }

  const {username,email,password} = parsedData.data
  const hashedPassword = await bcrypt.hash(password,10)

  const data =  await prisma.user.create({
    data:{
        username : username,
        email : email ,
        password : hashedPassword
    }
   })
   return res.status(201).json({
    message : `Congratulations ${data.username},you are successfully registered`
   })

  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Server error" });
  }
};