import {z} from 'zod'

export const usernameValidation = z
         .string()
         .min(2, "Username must be atleast 2 character")
         .max(20, "Username must be noMore than 20 character")
         .regex(/^[a-zA-Z0-9._-]+$/ , "Username must not contain special character"
        )

        export const signUpSchema = z.object({
            username:  usernameValidation,
            email: z.string().email({ message:'Invalid email address'
            }),
            passsword : z.string().min(6,{message: "password must be atleast 6 characters"})

        })