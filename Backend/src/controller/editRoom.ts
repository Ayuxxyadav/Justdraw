
import { Request, Response } from "express"
import { prisma } from "../db/src/db.js";



export const editRoom = async (req: Request, res: Response) => {

    const userId = req.userId as string;
    const { roomName } = req.body;
    const roomId = req.params.id as string

    try {

        if (!roomId) {
            return res.status(400).json({
                message: "Wrong roomId found"
            })
        }

        if (!roomName) {
            return res.status(400).json({ message: "Room name required" });
        }
        const data = await prisma.room.findFirst({
            where: {
                id: roomId
            }
        })
        if (!data) {
            return res.status(400).json({
                message: "No room found with this roomId "
            })
        }

        if (data.AdminId !== userId) {
            return res.status(400).json({
                message: "You are not  Authorized to edit this data "
            })
        }

        const editData = await prisma.room.update({
            where: {
                id: data.id
            },
            data: {
                roomName: roomName
            }
        })


        return res.status(200).json({
            message: "Room Update successfully",
            data: editData
        })




    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",

        })
    }


}