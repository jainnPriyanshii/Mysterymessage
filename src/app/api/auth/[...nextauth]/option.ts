import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcryptjs';
import UserModel from "@/models/user";
import CredentialsProvider from "next-auth/providers/credentials";
import dbconnect from "@/lib/dbconnect";
import Email from "next-auth/providers/email";



export const authOptions : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbconnect()
                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    })
                    if (!user) {
                        throw new Error("No user found with this email")
                    }

                    if (!user.isVerified) {
                        throw new Error("Please Verify your account")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                    if (isPasswordCorrect) {
                        return user
                    }
                    else {
                        throw new Error("Incorrect Password")
                    }

                } catch (err: any) {
                    throw new Error(err)
                }
            }
        })
    ],

    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
                session.user.username = token.username
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString(),
                    token.isVerified = user.isVerified,
                    token.isAcceptingMessage = user.isAcceptingMessage,
                    token.username = user.username
            }
            return token
        }
    },
    pages: {
        signIn: '/sign-in'
    },

    session: {
        strategy: 'jwt'
    },

    secret: process.env.NEXTAUTH_SECRET,
}