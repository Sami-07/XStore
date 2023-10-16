// // import { getServerSession } from "next-auth";
// import { NextResponse, NextRequest } from "next/server";
// const protectedRoutes = ["/cart", "/checkout", "/myaccount", "/order", "/orders"];

// export default async function middleware(req, res) {
//     // const { user } = await getServerSession();

//     if (protectedRoutes.includes(req.nextUrl.pathname)) {
//         const absoluteUrl = new URL("/", req.nextUrl.origin);
//         return NextResponse.redirect(absoluteUrl.toString());
//     }
// }
export { default } from "next-auth/middleware"
export const config = { matcher: ["/cart", "/checkout", "/myaccount","/product/:path*", "/order/:path*", "/orders"] }