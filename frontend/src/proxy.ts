import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const authRoute = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoute.includes(path);

  const jwt = (await cookies()).get("jwt")?.value;

  if (jwt && isAuthRoute)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
