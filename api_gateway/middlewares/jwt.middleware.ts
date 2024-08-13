import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(JwtMiddleware.name);

  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.headers['x-user-email'] = 'unknown user';
      return next();
    }

    const token = authHeader.split(' ')[1];
    try {
      const decodedToken = this.jwtService.decode(token) as { email?: string };
      if (decodedToken && decodedToken.email) {
        req.headers['x-user-email'] = decodedToken.email;
      } else {
        this.logger.error('Token decoded but email not found');
        req.headers['x-user-email'] = 'unknown user';
      }
    } catch (error) {
      this.logger.error('Failed to decode token', error.stack);
      req.headers['x-user-email'] = 'unknown user';
    }

    next();
  }
}
