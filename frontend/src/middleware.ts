import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { nextUrl } = req

  // Protect dashboard and other authenticated routes
  if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
    return Response.redirect(new URL('/auth/login', nextUrl))
  }

  // Redirect authenticated users away from auth pages
  if (nextUrl.pathname.startsWith('/auth') && isLoggedIn) {
    return Response.redirect(new URL('/dashboard', nextUrl))
  }
})

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/resumes/:path*',
    '/portfolio/:path*',
    '/settings/:path*',
    '/auth/:path*',
  ],
} 