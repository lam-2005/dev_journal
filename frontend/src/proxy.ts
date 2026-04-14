import { NextRequest, NextResponse } from "next/server";

const authRoute = ["/login", "/signup"];
const privateRoute = ["/create-post", "/my-posts"];
export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isAuthRoute = authRoute.includes(path);

  const isMyProfile = path === "/profile";

  const isPrivateRoute = privateRoute.some((route) => path.startsWith(route));
  const jwt = req.cookies.get("jwt")?.value;

  if (jwt && isAuthRoute)
    return NextResponse.redirect(new URL("/", req.nextUrl));

  if (!jwt && (isMyProfile || isPrivateRoute))
    return NextResponse.redirect(new URL("/login", req.nextUrl));

  return NextResponse.next();
}

// Routes Proxy should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
