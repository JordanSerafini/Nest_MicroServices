import { Injectable, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Pool } from 'pg';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PG_CONNECTION') private readonly pool: Pool,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const query = `SELECT * FROM "Utilisateurs" WHERE username = $1`;
    const result = await this.pool.query(query, [username]);

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
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(username: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `
      INSERT INTO "Utilisateurs" (username, password)
      VALUES ($1, $2)
      RETURNING id, username;
    `;
    const result = await this.pool.query(query, [username, hashedPassword]);

    return result.rows[0];
  }
}
