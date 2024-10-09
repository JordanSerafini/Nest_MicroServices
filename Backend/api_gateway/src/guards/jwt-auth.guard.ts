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

    // Vérification de l'en-tête spécifique pour les services internes
    const serviceAuthHeader = request.headers['x-service-auth'];
    if (serviceAuthHeader && serviceAuthHeader === 'trusted-service-key') {
      this.logger.log('Request from trusted internal service');
      // On définit un utilisateur fictif pour les requêtes internes
      request.user = { email: 'requete service interne' };
      return true;
    }

    const authHeader = request.headers['authorization'];

    // Si aucune autorisation n'est présente et que la requête ne provient pas d'un service interne
    if (!authHeader) {
      this.logger.warn('No authorization header found');
      throw new UnauthorizedException('Authorization header is missing');
    }

    const [type, token] = authHeader.split(' ');
    this.logger.debug('Extracted token:', token);

    if (type !== 'Bearer' || !token) {
      this.logger.error('Invalid token type or missing token', ``);
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
