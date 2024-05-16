import { resend } from "@/lib/resend"; 



import VerificationEmail from "../../Emails/VerificationEmail";

import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username : string,
    verifyCode: string
):Promise<ApiResponse>{
    try {
         await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: ' Mystery message | Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return{success : true , message:"Successfully sent the verification mail"}
    } catch(emailError)
    {
    console.error("Error in sending Verification Mail",emailError);
    return{success : false , message:"Failed to send verification mail"}
    }
}


