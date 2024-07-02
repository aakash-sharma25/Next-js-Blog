import dbConnect from "@/lib/dbConnect";
import Post from "@/model/postModel";
import User from "@/model/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { title, description, userId } = reqBody;

    if (!title || !description || !userId) {
      return NextResponse.json(
        {
          sucess: false,
          message: "all fileds are required",
        },
        { status: 400 }
      );
    }
    const postData = {
      author: userId,
      title: title,
      content: description,
    };
    console.log(postData)
    const post = await Post.create(postData);
    let user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { posts: post._id } }
    ).exec();
    // const updatedUser = await User.findById(userId).populate("posts");
    const response = NextResponse.json(
      {
        message: "Blog Created  successfully",
        success: true,
        // postData,
        // postComment
      },
      { status: 200 }
    );
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        sucess: false,
        message: "error in creating blog",
      },
      { status: 500 }
    );
  }
}
