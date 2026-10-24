import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuthenticated = Boolean(req.auth?.user);
  const isLoginPage = pathname === "/admin/login";

  // Resolve dynamic host origin so localhost redirects to localhost and production redirects to production
  const host =
    req.headers.get("x-forwarded-host") ||
    req.headers.get("host") ||
    req.nextUrl.host ||
    "localhost:3000";
  const protocol =
    req.headers.get("x-forwarded-proto") ||
    (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = new URL("/admin/login", origin);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (isAuthenticated && isLoginPage) {
      return NextResponse.redirect(new URL("/admin", origin));
    }
  }

  return NextResponse.next();
});

export default proxy;

export const config = {
  matcher: ["/admin/:path*"],
};
