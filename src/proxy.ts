import { betterFetch } from "@better-fetch/fetch";
import { Session } from "better-auth";

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const  session  = await auth.api.getSession({
    headers: await headers()
  })
  console.log(session)

  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
//   const user = session?.user
//   console.log(user)
  return NextResponse.next();
}

export const config = {
  matcher: ["/add-destination", "/my-booking", "/destinations/:path" ],
};