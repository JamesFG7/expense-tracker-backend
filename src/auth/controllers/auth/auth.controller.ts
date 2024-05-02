import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPayloadDto } from 'src/auth/dtos/register.dto';
import { LoginPayloadDto } from 'src/auth/dtos/login.dto';
import { AuthService } from '../../services/auth/auth.service';
import { UserResponseType } from '../../../users/types/userResponse.type';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() body: RegisterPayloadDto): Promise<UserResponseType> {
    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() body: LoginPayloadDto): Promise<string> {
    return await this.authService.signIn(body);
  }
}
