import z from "zod" ;


export const signupSchema = z.object({
   username : z.string().min(3).max(15),
    email : z.email().min(3).max(25),
    password:z.string().min(3).max(30),

})

export const signinSchema = z.object({
   username : z.string().min(3).max(15),
    password:z.string().min(3).max(30),
})

export const roomSchema = z.object({
   roomname : z.string().min(3)
})