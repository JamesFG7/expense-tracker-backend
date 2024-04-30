import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/login.dto';
import { RegisterPayloadDto } from 'src/auth/dtos/register.dto';
import { User } from 'src/schemas/User.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(payload: LoginPayloadDto): Promise<string> {
    const user: User = await this.usersService.findOne(payload.username);
    if (user && payload.password !== user?.password) {
      throw new HttpException('Invalid Credentials', 400);
    }
    const { ...result } = { username: user.username, sub: user._id };
    return this.jwtService.sign(result);
  }

  async register(register: RegisterPayloadDto) {
    const user = await this.usersService.findOne(register.username);
    if (user) {
      throw new HttpException('User already exists', 400);
    }
    if (register.password !== register.password_confirmation) {
      throw new HttpException('Passwords do not match', 400);
    }
    return this.usersService.create(register);
  }
}
