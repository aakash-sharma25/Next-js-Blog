import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/model/userModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    // console.log(userName, email, password);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        {
          success: "true",
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      avatar:`https://ui-avatars.com/api/?name=${userName}`,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Unable to register user", success: false, error },
      { status: 500 }
    );
  }
}
