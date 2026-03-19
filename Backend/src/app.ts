import express from "express" ;
import dotenv from "dotenv" ;
import "./socket.js"
import userRoutes from "./routes/userRoutes.js"



dotenv.config() ;


const PORT = process.env.PORT 

const app = express();


app.use(express.json()) ;

app.use("/api",userRoutes);




app.listen(PORT, async ()=>{
    console.log(`server is listening at ${PORT}`)
})
    
