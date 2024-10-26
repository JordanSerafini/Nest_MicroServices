import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.handleLogin(loginDto);
  }

  @Post('register')
  async register(@Body() registerDto: { email: string; password: string, nom: string, prenom: string, role:string }) {
    return this.handleRegister(registerDto);
  }

  @Post('validate')
  async validate(@Body() token: { token: string }) {
    return this.authService.validateToken(token.token);
  }

  @MessagePattern({ cmd: 'login' })
  async handleLogin(loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @MessagePattern({ cmd: 'register' })
  async handleRegister(registerDto: { email: string; password: string, nom: string, prenom: string, role:string }) {
    try {
      const user = await this.authService.register(
        registerDto.email,
        registerDto.password,
        registerDto.nom,
        registerDto.prenom,
        registerDto.role,
      );
      return user;
    } catch (error) {
      console.error(
        `Registration failed for email: ${registerDto.email}`,
        error.message,
      );
      throw new BadRequestException('Registration failed');
    }
  }
}
