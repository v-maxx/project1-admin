import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";
import {getSession} from "next-auth/react";


export default NextAuth(authConfig).auth;


//
// export async function middleware(request) {
//   const {pathname} = request.nextUrl
//   const secret=process.env.AUTH_SECRET
//   const session=await getSession()
//   console.log('session--',session)
//
//   // const getgg=await getToken()
//   // console.log('session',getgg)
//   //
//   // const secureCookie = process.env.NEXTAUTH_URL?.startsWith("https://") ?? !!process.env.VERCEL
//   //   const cookieName = secureCookie
//   //          ? "__Secure-next-auth.session-token"
//   //          : "next-auth.session-token"
//
//   // console.log('cokki name--',cookieName)
//
//   const token = request.cookies.get('next-auth.session-token')
//
//   const authPages = ['/login', '/user','/']
//   const secretPages = ['/user/dashboard']
//   if (token?.value) {
//     if (authPages.includes(pathname)) {
//       const url = request.nextUrl.clone()
//       url.pathname = '/user/dashboard'
//       return NextResponse.redirect(url)
//     }
//   }
//   if (!token) {
//     if (secretPages.includes(pathname)) {
//       const url = request.nextUrl.clone()
//       url.pathname = '/login'
//       return NextResponse.redirect(url)
//     }
//   }
//   return NextResponse.next()
// }




export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};


