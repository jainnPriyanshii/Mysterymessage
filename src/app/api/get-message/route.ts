import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import dbconnect from "@/lib/dbconnect";
import UserModel from "@/models/user";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbconnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "Not Authenticated"
            },
            { status: 401 }
        )
    }
    const userId = new mongoose.Types.ObjectId(user._id);

    try {
        const user = await UserModel.aggregate([
            { $match: { id: userId } },
            { $unwind: 'messages' },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: 'messages' } } }
        ])

        if (!user || user.length === 0) {
            return Response.json(
                {
                    success: false,
                    message: "User Not found"
                },
                { status: 401 }
            )
        }

        return Response.json(
            {
                success: true,
                messages: user[0].messages
            },
            { status: 200 }
        )
    } catch (error) {
        console.log("Unexpected Error occurred", error)
        return Response.json(
            {
                success: false,
                message: "Unexpected Error occurred"
            },
            { status: 500 }
        )
    }
}