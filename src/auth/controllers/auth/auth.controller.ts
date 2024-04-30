import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPayloadDto } from 'src/auth/dtos/register.dto';
import { LoginPayloadDto } from 'src/auth/dtos/login.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterPayloadDto) {
    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() body: LoginPayloadDto) {
    return this.authService.signIn(body);
  }
}
