import dbConnect from "@/lib/dbConnect";
import User from "@/model/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  await dbConnect();
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return NextResponse.json(
        {
          sucess: false,
          message: "enter full detail",
        },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          sucess: false,
          message: "not a registered user please login",
        },
        { status: 400 }
      );
    }

    const ismatch = await bcryptjs.compare(password, user.password);
    if (!ismatch) {
      return NextResponse.json(
        {
          sucess: false,
          message: "invalid username or password",
        },
        { status: 400 }
      );
    }
    const response = NextResponse.json(
      {
        message: "User Logged in  successfully",
        success: true,
        userData: {
          userId: user._id,
          userName: user.userName,
        },
      },
      { status: 200 }
    );

    // response.cookies.set("token", token);
    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        sucess: false,
        message: "error in login",
      },
      { status: 500 }
    );
  }
}
