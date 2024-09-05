import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { CustomLogger } from '../logging/custom-logger.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new CustomLogger('JwtAuthGuard');

  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      this.logger.warn('No authorization header found');
      return false; //! À changer à `false` après le développement
    }

    const [type, token] = authHeader.split(' ');
    this.logger.debug('Extracted token:', token);

    if (type !== 'Bearer' || !token) {
      this.logger.error('Invalid token type or missing token', '');
      throw new UnauthorizedException('Invalid token type or missing token');
    }

    try {
      const decoded = this.jwtService.verify(token, {
        secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      });
      this.logger.log('Token decoded successfully', decoded.email);
      request.user = decoded;
      return true;
    } catch (error) {
      this.logger.error('Token verification failed', error.message);
      throw new ForbiddenException('Token verification failed');
    }
  }
}
