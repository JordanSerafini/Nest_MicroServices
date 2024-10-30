import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  console.log("Middleware exécuté");

  const token = req.cookies.get('token')?.value;
  const currentPath = req.nextUrl.pathname;

  if (!token && currentPath !== '/login') {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('message', 'not_logged_in');
    return NextResponse.redirect(loginUrl);
  }

  if (token) {
    try {
      // Vérifie si le token est valide et non expiré
      jwt.verify(token, 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj');
    } catch (error) {
      console.error("Token expired:", error);
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
