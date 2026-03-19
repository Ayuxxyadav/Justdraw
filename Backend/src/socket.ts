import { WebSocketServer ,WebSocket} from "ws";
import { Request } from "express";

import jwt from "jsonwebtoken" ;
import dotenv from "dotenv"

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

 
const wss = new WebSocketServer({port:8080}) ;   // connection websocket server 


function decodedToken( token: string ) : string | null{     // decode token and return UserID
    const decoded = jwt.verify(token , JWT_SECRET) ;
    if (typeof decoded == "string"){
        return null ;
    }
    if (!decoded || !decoded.userId){
        return null ;
    }

    return decoded.userId ;
}


interface User {
    userId: string ,
    ws : WebSocket,
    rooms :  number []
}

const users :User[] = [] ;

wss.on("connection" , function Connection (ws,req:Request){
    const url =  req.url ;
    if ( !url){
        return ;
    }

    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token =  queryParams.get("token") || ""

    const userId = decodedToken(token);
    
    if ( userId == null){
        ws.close() ;
        return ;
    }
   const user:User = {userId , ws , rooms:[]}
    users.push(user) ;

    console.log("User connected");
    


interface SocketMessage {
  type: "join_room" | "leave_room" | "chat" | "draw";
  roomId: number;
  message?: string;
  drawData?: any;
}

    ws.on("message" , (data)=>{
        const msg = JSON.parse(data.toString()) as SocketMessage
      

        const {type , roomId  , message } = msg ;
      
 

    // JOIN room 

        if ( type == "join_room"){
            if ( !user.rooms.includes(roomId)){
                user.rooms.push(roomId) ;
            }

            ws.send(
                JSON.stringify({
                    type : "joined",
                    roomId,
                    message
                })
            )
        }
     // Leave room
        if ( type == "leave_room"){
         user.rooms = user.rooms.filter((id)=> id !==roomId) ;
        }
     // Chat message

     if ( type == "chat"){
        users.forEach((u)=>{
            if ( u.rooms.includes(roomId)){
                u.ws.send(JSON.stringify({
                    type : "chat" ,
                    roomId,
                    userId,
                    message
                }))
            }
        })
     }

     
    })

     ws.on("close" , ()=>{
        const index = users.findIndex((u)=> u.ws ===ws);
        if ( index !==-1){
            users.splice(index,1) ;
        }
        console.log("User diconnected");
        
     })

})

console.log("websocket server running ");

