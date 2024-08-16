import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
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

  async login(user: any) {
    this.logger.log(`Logging in user with email: ${user.email}`);

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, {
      secret: 'zdf4e4fs6e4fesz4v1svds+df784+e+9zef4654fe4potydkyj',
      expiresIn: '10000h',
    });

    this.logger.log(`User with email: ${user.email} logged in successfully`);
    return {
      access_token: accessToken,
    };
  }

  async register(email: string, password: string): Promise<any> {
    this.logger.log(`Registering new user with email: ${email}`);
    let result;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const query = `
        INSERT INTO "Utilisateurs" (email, password)
        VALUES ($1, $2)
        RETURNING id, email;
      `;
      result = await this.pool.query(query, [email, hashedPassword]);
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
}
