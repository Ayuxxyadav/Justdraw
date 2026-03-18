import { roomSchema } from "../zod/userZodSchema.js"
import { Request ,Response } from "express";
import { prisma } from "../db/src/db.js";




export const createRoom =  async (req : Request , res :Response ) =>{

try {

    const parsedData = roomSchema.safeParse(req.body) ;
     if(!parsedData.success){
    return res.status(400).json({
        message:"Roomname input validation failed"
     })
    }
    
    const userId = req.userId as string ; 

    if (!userId) {
         return res.status(400).json({
        message:"Unauthorized access" 
     })
    }

   const { roomname }  = parsedData.data ;

   const createRoom = await prisma.room.create({
    data : {
        roomName : roomname, 
         AdminId : userId
    }
   })

    return res.status(201).json({
        message: `Room created successfully with name ${createRoom.roomName} ` ,
        roomId : createRoom.id ,
        createdAt : createRoom.createdAt,
        adminId : createRoom.AdminId
     })


    
} catch (error) {
   res.status(500).json({ message: "Server error" });
}



}