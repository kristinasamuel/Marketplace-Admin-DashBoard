// login route
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken" 
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    console.log("email >>", email);
    console.log("password >>", password);

    const validEmail = "kristina23@gmail.com";
    const validPassword = "2244784";

    if (email === validEmail && password === validPassword) {
      // JWT token
      const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: '1d', // Token expires in 1 day
      });

      // Set HttpOnly cookie with JWT token
      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );

      response.cookies.set({
        name: "token",
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day expiration
      });

      return response;
    }

    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error processing request" },
      { status: 500 }
    );
  }
}