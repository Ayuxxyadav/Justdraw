import { NextFunction , Request ,Response } from "express";

import jwt from "jsonwebtoken" ;


const JWT_SECRET = process.env.JWT_SECRET as string


interface Jwtpayload {
  userId : string
}

export const userMiddleware = ( req : Request , res:Response , next: NextFunction )=>{

const token = req.headers.authorization ;

if ( !token){
  return res.status(403).json
({
  message : " Token not found "
})}

const decoded = jwt.verify ( token ,JWT_SECRET) as Jwtpayload ;

if ( !decoded){
  return res.status(403).json
({
  message : " Token not matched "
})}

req.userId = decoded.userId ;
next() ;

}