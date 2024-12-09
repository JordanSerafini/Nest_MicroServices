import {
  Injectable,
  Inject,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Pool } from 'pg';
import { CustomLogger } from './logging/custom-logger.service';

@Injectable()
export class AuthService {
  private readonly logger = new CustomLogger(AuthService.name);

  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    let result;
    try {
      const query = `SELECT * FROM "Utilisateurs" WHERE email = $1`;
      result = await this.pool.query(query, [email]);
    } catch (error) {
      this.logger.error(
        `Database query failed for email: ${email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database query failed');
    }

    if (result.rows.length === 0) {
      this.logger.warn(`User with email: ${email} not found`);
      return null;
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      this.logger.log(`User with email: ${email} validated successfully`);
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    }

    this.logger.warn(`Invalid password for user with email: ${email}`);
    return null;
  }

  async login(user: any): Promise<{ access_token: string; user: any }> {
    this.logger.log(`Logging in user with email: ${user.email}`);

    try {
      // Génération du token JWT
      const payload = { email: user.email, sub: user.id };
      const accessToken = this.jwtService.sign(payload, {
        secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
        expiresIn: '10000h',
      });

      // Mise à jour du token dans la base de données
      const query = `UPDATE "Utilisateurs" SET token = $1 WHERE id = $2`;
      await this.pool.query(query, [accessToken, user.id]);

      // Mise à jour de l'objet `user` avec le nouveau token
      user.token = accessToken;

      this.logger.log(`User with email: ${user.email} logged in successfully`);

      // Retourne le token d'accès et les informations utilisateur
      return {
        access_token: accessToken,
        user: user,
      };
    } catch (error) {
      // Gestion des erreurs pour la génération de token ou la mise à jour de la base
      if (error instanceof InternalServerErrorException) {
        this.logger.error(
          `Database update tokens failed for email: ${user.email}`,
          error.stack,
        );
        throw new InternalServerErrorException('Database update failed');
      } else {
        this.logger.error('Token generation failed', error.stack);
        throw new InternalServerErrorException('Token generation failed');
      }
    }
  }

  async register(
    email: string,
    password: string,
    nom: string,
    prenom: string,
    role: string,
  ): Promise<any> {
    this.logger.log(`Registering new user with email: ${email}`);
    let result;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const query = `
        INSERT INTO "Utilisateurs" (email, password, nom, prenom, role)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, email, nom, prenom, role;
      `;
      result = await this.pool.query(query, [
        email,
        hashedPassword,
        nom,
        prenom,
        role,
      ]);
    } catch (error) {
      this.logger.error(
        `Database insert failed for email: ${email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database insert failed');
    }

    this.logger.log(`User with email: ${email} registered successfully`);
    return result.rows[0];
  }

  validateToken(token: string): any {
    try {
      this.logger.log(`Validating token`);
      const decoded = this.jwtService.verify(token, {
        secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      });
      this.logger.log(`Token validated successfully`);
      return decoded;
    } catch (error) {
      this.logger.error('Token validation failed', error.stack);
      throw new UnauthorizedException('Invalid token');
    }
  }

  async logout(user: { email: string }): Promise<void> {
    this.logger.log(`Logging out user with email: ${user.email}`);

    try {
      const query = `UPDATE "Utilisateurs" SET token = NULL WHERE email = $1`;
      await this.pool.query(query, [user.email]);

      this.logger.log(`User with email: ${user.email} logged out successfully`);
    } catch (error) {
      this.logger.error(
        `Database update tokens failed for email: ${user.email}`,
        error.stack,
      );
      throw new InternalServerErrorException('Database update failed');
    }
  }
}
