import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user";
import bcrypt from 'bcryptjs'
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request : Request){
    await dbconnect()

    try {
         const {username,email,password} = await request.json()
        
    } catch (error) {
        console.error('Error registering User',error)
        return Response.json
        {
            success: false
            message : "Error registering User"
        }
    }
}