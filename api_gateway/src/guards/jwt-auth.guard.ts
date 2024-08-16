import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
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
      console.log('No authorization header found');
      return false; //! À changer à `false` après le développement
    }

    const [type, token] = authHeader.split(' ');
    console.log('Extracted token:', token);

    if (type !== 'Bearer' || !token) {
      console.log('Invalid token type or missing token');
      throw new UnauthorizedException('Invalid token type or missing token');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      });
      console.log('Token decoded successfully:', decoded);
      request.user = decoded;
      return true;
    } catch (error) {
      console.error('Token verification failed:', error.message);
      throw new ForbiddenException('Token verification failed');
    }
  }
}
