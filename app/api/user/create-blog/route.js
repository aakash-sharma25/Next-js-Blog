import dbConnect from "@/lib/dbConnect";
import Post from "@/model/postModel";
import User from "@/model/userModel";
import { NextResponse } from "next/server";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { title, description, userId, image, video } = reqBody;

    if (!title || !description || !userId || !image) {
      return NextResponse.json(
        {
          sucess: false,
          message: "all fileds are required",
        },
        { status: 400 }
      );
    }
    const post = await Post.create({
      author: userId,
      title: title,
      content: description,
      image: image,
      video: video,
    });
    // console.log(post);
    let user = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { posts: post._id } }
    ).exec();
    const response = NextResponse.json(
      {
        message: "Blog Created  successfully",
        success: true,
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
