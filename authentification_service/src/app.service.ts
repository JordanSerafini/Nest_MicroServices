import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    let result;
    try {
      const query = `SELECT * FROM "Utilisateurs" WHERE email = $1`;
      result = await this.pool.query(query, [email]);
    } catch (error) {
      throw new InternalServerErrorException('Database query failed');
    }

    if (result.rows.length === 0) {
      return null; // Utilisateur non trouvé
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      const userWithoutPassword = { ...user };
      delete userWithoutPassword.password;
      return userWithoutPassword;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, password: string): Promise<any> {
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
      throw new InternalServerErrorException('Database insert failed');
    }

    return result.rows[0];
  }
}
