import dbConnect from "@/lib/dbConnect";
import Comment from "@/model/commentModel";
import Post from "@/model/postModel";
import User from "@/model/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const reqbody = await request.json();
    const { comment, userId, postId } = reqbody;

    const newComment = await Comment.create({
      user: userId,
      comment,
    });
    const post = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: newComment._id } }
    ).exec();
    return NextResponse.json({
      success: true,
      message: "comment created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}
export async function GET(request) {
  await dbConnect();
  try {
    
    return NextResponse.json({
      success: true,
      message: "comment fetched successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}
