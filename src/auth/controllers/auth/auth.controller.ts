import { Body, Controller, Post } from '@nestjs/common';
import { RegisterPayloadDto } from 'src/auth/dtos/register.dto';
import { LoginPayloadDto } from 'src/auth/dtos/login.dto';
import { AuthService } from '../../services/auth/auth.service';
import { UserResponseType } from '../../../users/types/userResponse.type';
import { UsersService } from '../../../users/services/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
  ) {}
  @Post('register')
  async register(@Body() body: RegisterPayloadDto): Promise<UserResponseType> {
    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() body: LoginPayloadDto): Promise<UserResponseType> {
    const user = await this.authService.signIn(body);
    return this.UsersService.buildUserResponse(user);
  }

  @Post('test')
  async test() {
    return 'test';
  }
}
