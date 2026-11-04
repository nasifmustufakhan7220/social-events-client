import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/lib/auth'
import { headers } from 'next/headers'


export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  const user = session?.user;
  if(!user){
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
   return NextResponse.redirect(new URL('/up-comming', request.url))
}


export const config = {
  matcher: ['/create-event','/joined-event','/manage-event', '/up-comming/:path'],
}