import dbConnect from "@/lib/dbConnect";
import Post from "@/model/postModel";
import User from "@/model/userModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  await dbConnect();
  try {
    const posts = await Post.find().populate('author','userName avatar');
    return NextResponse.json({
      success: true,
      message: "all post fetched successfully",
      blogs: posts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}
