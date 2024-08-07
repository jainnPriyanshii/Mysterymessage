// import dbconnect from "@/lib/dbconnect";
// import UserModel from "@/models/user";  
// import bcrypt from 'bcryptjs'
// import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

// export async function POST(request: Request) {
//     await dbconnect()

//     try {
//         const { username, email, password } = await request.json()


//         const exsistingUserVerifiedbyUsername = await
//             UserModel.findOne({
//                 username,
//                 isVerified: true
//             })

//         if (exsistingUserVerifiedbyUsername) ({
//             return Response.json({
//                 success: false,
//                 message: "Username is already taken "
//             }, { status: 400 })


//         })

//         const exsistingUserbyEmail = await UserModel.findOne({ email })
//         const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()

//         if (exsistingUserbyEmail) {
//            if(exsistingUserbyEmail.isVerified){
//             return Response.json({
//             success:false,
//             message: "This Email is already registered."},{status:400}
//         )}
        

//         else{
//             const hashedpassword = await bcrypt.hash(password, 10)
//             exsistingUserbyEmail.password = hashedpassword ;
//             exsistingUserbyEmail.verifyCode = verifyCode;
//             exsistingUserbyEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
//            await exsistingUserbyEmail.save()
//         }
//     }
//         else {
//             const hashedpassword = await bcrypt.hash(password, 10)

//             const expiryDate = new Date()
//             expiryDate.setHours(expiryDate.getHours() + 1)


//             const newUser = new UserModel({
//                 username,
//                 email,
//                 password: hashedpassword,
//                 verifyCode,
//                 verifyCodeExpiry: expiryDate,
//                 isVerified: false,
//                 isAcceptingMessage: true,
//                 messages: []
//             })

//             await newUser.save()
//         }
//         //sending verification email
//         const emailResponse = await sendVerificationEmail(
//             email,
//             username,
//             verifyCode
//         )

//         if (!emailResponse.success) {
//             return Response.json({
//                 success: false,
//                 message: emailResponse.message
//             }, { status: 500 })
//         }
//         else {
//             return Response.json({
//                 success: true,
//                 message: "User registered successfully. Please  verify  your email"
//             }, { status: 201 })
//         }

//     } catch (error) {
//         console.error('Error registering User', error)
//         return Response.json
//         {
//             success: false
//             message: "Error registering User"
//         }
//     }
// }


import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user";  
import bcrypt from 'bcryptjs';
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbconnect();

    try {
        const { username, email, password } = await request.json();

        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        });

        if (existingUserVerifiedByUsername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, { status: 400 });
        }

        const existingUserByEmail = await UserModel.findOne({ email });
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "This Email is already registered."
                }, { status: 400 });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
                await existingUserByEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date(Date.now() + 3600000);

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            });

            await newUser.save();
        }

        // sending verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message
            }, { status: 500 });
        } else {
            return Response.json({
                success: true,
                message: "User registered successfully. Please verify your email."
            }, { status: 201 });
        }
    } catch (error) {
        console.error('Error registering User', error);
        return Response.json({
            success: false,
            message: "Error registering User"
        }, { status: 500 });
    }
}

