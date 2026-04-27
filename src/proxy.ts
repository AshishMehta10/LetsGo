import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

const PUBLIC_ROUTE = ["/"];
const PUBLIC_APIS = ["/api/auth"];
export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Ignore static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith(".")
  ) {
    return NextResponse.next();
  }

  if (PUBLIC_ROUTE.includes(pathname)) {
    return NextResponse.next();
  }

  if (PUBLIC_APIS.includes(pathname)) {
    return NextResponse.next();
  }

  const session = await auth();

  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const role = session.user?.role;
  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/partner")) {
    if (pathname.startsWith("/partner/onbording/vechile")) {
      return NextResponse.next()
    }

    if (role !== "partner") {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }


  if (pathname.startsWith("/api") && !session.user) {
    return NextResponse.json(
      { message: "unauthorized" },
      { status: 401 }
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|).*)"],
};