import { roomSchema } from "../zod/userZodSchema.js"
import { Request ,Response } from "express";
import { prisma } from "../db/src/db.js";




export const listofRoom =  async (req : Request , res :Response ) =>{

try {
    
    const userId = req.userId as string ; 

    if (!userId) {
         return res.status(400).json({
        message:"Unauthorized access" 
     })
    }



   const roomList = await prisma.room.findMany({
     where : {
        AdminId : userId
     },
     orderBy : {
      createdAt : "desc"
     }
   })

    return res.status(201).json({
        message: `Here are the list of all rooms  ` ,
        roomList : roomList
     })


    
} catch (error) {
   console.log(error);
   
   res.status(500).json({ message: "Server error" });
}



}