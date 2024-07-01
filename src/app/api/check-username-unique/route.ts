import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpschema";


const UsernameQuerySchema = z.object({
    username : usernameValidation
})

export async function GET(request: Request){
    await dbconnect()

}