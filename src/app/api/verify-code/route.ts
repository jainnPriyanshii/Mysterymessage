import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user";

export async function POST(request: Request) { 

    await dbconnect()

    try {

        const {username ,code } = await request.json()
        
        const decodedUsername = decodeURIComponent(username)
        const user = await UserModel.findOne({username:decodedUsername})

        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User Not found",
                },
                { status: 400 }
            )
        }

        const  isCodeValid = user.verifyCode=== code
        const  isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()


        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

            return Response.json(
                {
                    success: true,
                    message: "User verified successfully",
                },
                { status: 200 }
            )
        }  
        else if(!isCodeNotExpired){
            return Response.json(
                {
                    success: false,
                    message: "Verification code has expired please signup again for new code ",
                },
                { status: 200 }
            )
        }
        else {
            return Response.json(
                {
                    success: false,
                    message: "Incorrect Verification Code ",
                },
                { status: 200 }
            )
        }

    } catch (error) {
        console.log("Error verifiying user  ", error)
        return Response.json(
            {
                success: false,
                message: "Error verifiying user",
            },
            { status: 500 }
        )
    }
    
}