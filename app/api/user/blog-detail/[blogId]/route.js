import dbConnect from "@/lib/dbConnect";
import Post from "@/model/postModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  await dbConnect();
  try {
    const blogId = params.blogId;
    const blog = await Post.findById(blogId).populate("author","avatar userName")
    .populate({
      path: 'comments',
      populate: {
          path: 'user',
          select:"avatar userName"
      }
  })
  .exec();

    return NextResponse.json({
      success: true,
      message: "post fetched successfully",
      blogs: blog,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "internal server error",
    });
  }
}
