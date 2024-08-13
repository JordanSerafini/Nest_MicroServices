import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './app.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: { username: string; password: string }) {
    const user = await this.authService.register(
      registerDto.username,
      registerDto.password,
    );

    return user;
  }
}
