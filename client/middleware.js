import { NextResponse } from "next/server"

export function middleware(request) {
  const usuarioCookie = request.cookies.get("usuario-cookie")
  const url = request.nextUrl.clone()
  if (!usuarioCookie && url.pathname !== "/login") {
    url.pathname = "/login"
    return NextResponse.redirect(url)
  }
  if (usuarioCookie && url.pathname === "/login") {
    url.pathname = "/"
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
export const config = {
  matcher: ["/admin/:path*", "/login"],
}
