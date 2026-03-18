import { Request ,Response } from "express"
import { prisma } from "../db/src/db.js";



export const deleteRoom = async (req:Request , res:Response) => {

   const userId = req.userId  as string ;
   const roomId = req.params.id as string ;

   try {
       if (!roomId) {
            return res.status(400).json({
                message: "Wrong roomId found"
            })
        }
    const data =await prisma.room.findFirst({
        where : {
            id : roomId
        }
    })

    if (!data) {
        return res.status(400).json({
         message: "Wrong roomId "
            })
    }

    if ( data.AdminId !== userId){
        return res.status(400).json({
            message : "Not authorized"
        })
    }


    const deleteData = await prisma.room.delete({
        where : {
            id : roomId
        }
    })

    return res.status(200).json({
        message : "Successfully Deleted"
    })

   } catch (error) {
    console.log(error);
    
   }



}