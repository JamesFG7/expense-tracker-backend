import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../../../users/services/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from 'src/auth/dtos/login.dto';
import { RegisterPayloadDto } from 'src/auth/dtos/register.dto';
import { User } from 'src/schemas/User.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserResponseType } from '../../../users/types/userResponse.type';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async signIn({ username, password }: LoginPayloadDto): Promise<string> {
    const user: User = await this.userModel
      .findOne({ username: username })
      .select('+password');
    if (!user) {
      throw new HttpException('Username not found', 400);
    }
    const isPasswordValid: boolean = await compare(password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Incorrect Password', 400);
    }
    const { ...result }: { username: string } = { username: user.username };
    return this.jwtService.sign(result);
  }

  async register(register: RegisterPayloadDto): Promise<UserResponseType> {
    const findByUsername: User = await this.userModel.findOne({
      username: register.username,
    });
    const findByEmail: User = await this.userModel.findOne({
      email: register.email,
    });
    if (findByUsername) {
      throw new HttpException('Username already exists', 400);
    }

    if (findByEmail) {
      throw new HttpException('Email already exists', 400);
    }

    if (register.password !== register.password_confirmation) {
      throw new HttpException('Passwords do not match', 400);
    }
    const createdUser: User = await this.usersService.create(register);
    return this.usersService.buildUserResponse(createdUser);
  }
}
