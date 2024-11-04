import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
//import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  //console.log("Token dans le middleware:", token);

  if (!token && req.nextUrl.pathname !== '/login') {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('message', 'not_logged_in');
    console.log("Redirection vers login pour absence de token");
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    try {
      // jwt.verify(token, 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj');
      console.log("Token valide");
    } catch (error: any) {
      console.error("Token expiré ou invalide:", error.message);
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('message', 'token_expired');
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login).*)',
  ],
};
