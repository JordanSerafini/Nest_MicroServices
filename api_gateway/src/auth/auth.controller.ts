import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTHENTIFICATION_SERVICE')
    private readonly authServiceClient: ClientProxy,
  ) {}

  @Post('login')
  async login(@Body() loginDto: { username: string; password: string }) {
    return this.authServiceClient.send({ cmd: 'login' }, loginDto).toPromise();
  }

  @Post('register')
  async register(@Body() registerDto: { username: string; password: string }) {
    return this.authServiceClient
      .send({ cmd: 'register' }, registerDto)
      .toPromise();
  }
}
