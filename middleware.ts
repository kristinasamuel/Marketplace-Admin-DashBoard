// Home middleware
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  const token = (await cookies()).get("token");
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and is trying to access the login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/order", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/", "/login", "/order"],
};
