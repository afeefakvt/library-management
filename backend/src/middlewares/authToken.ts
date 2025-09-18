import { verifyAccessToken } from "../utils/jwt";
import { Request,Response,NextFunction } from "express";
import User,{IUser} from "../models/user";
import { HTTP_STATUS } from "../constants/httpStatus";


export interface AuthRequest extends Request{
    user?:IUser;
}

export const authToken = async(req:AuthRequest,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if(!token){
            res.status(HTTP_STATUS.FORBIDDEN).json({message:"Access denied no token provided"});
            return;
        }
        const decoded = verifyAccessToken(token) as {id:string};
        
        const user = await User.findById(decoded.id)
        if (!user) {
        return res.status(HTTP_STATUS.FORBIDDEN).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(HTTP_STATUS.FORBIDDEN).json({message:'Token is expired.Please login again.'})
        return;
        
    }
}