import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      return false;
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      return false;
    }

    try {
      const decoded = this.jwtService.verify(token, { secret: 'secretKey' });
      request.user = decoded;
      return true;
    } catch (error) {
      return false;
    }
  }
}
