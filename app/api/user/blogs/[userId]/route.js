import dbConnect from "@/lib/dbConnect";
import User from "@/model/userModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const userId = params.userId;
    const user = await User.findById(userId)
    .populate({
        path: 'posts',
        populate: {
            path: 'author',
            select:"avatar userName"
        }
    })
    .exec();

    return NextResponse.json({
      success: true,
      message: "all post fetched successfully",
      blogs: user.posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}
