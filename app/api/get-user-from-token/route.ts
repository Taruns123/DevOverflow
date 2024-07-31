import { NextRequest, NextResponse } from "next/server";
import User from "@/database/user.model";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongoose";

connectToDatabase();
export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({
        message: "User not found",
        success: false,
      });
    }
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    const userId = decoded.id;
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json({
      message: "User data fetched successfully",
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
