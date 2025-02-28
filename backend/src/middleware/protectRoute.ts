import jwt, { JwtPayload } from "jsonwebtoken"
import { Response,Request, NextFunction } from "express"
import prisma from "../db/prisma.js"

interface DecodedToken extends JwtPayload{
    userId:string
}

declare global{
    namespace Express{
        export interface Request{
            user:{
                id:string,
            }
        }

    }
}

const protectRoute=async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const token=req.cookies.jwt
        if(! token){
            res.status(401).json({error:"Unauthorized : No token found"})
            return
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET!) as DecodedToken

        if(! decoded){
            res.status(401).json({error:"Unauthorized : No token found"})
            return

        }

        const user=await prisma.user.findUnique({where:{id:decoded.userId},select:{id:true,username:true,fullname:true,profilepic:true}})
        if(!user){
            res.status(404).json({error:"user not found"})
            return

        }

        req.user=user

        next()
        
    } catch (error:any) {
        res.status(500).json("Internal server error")
        console.log("Error in protectRoute middleware",error.message)
        return
        
    }

}

export default protectRoute