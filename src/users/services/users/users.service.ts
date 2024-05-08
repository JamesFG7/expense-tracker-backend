import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../schemas/User.schema';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UserResponseType } from '../../types/userResponse.type';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  //bale tinatanggal niya lang yung password sa response
  buildUserResponse(user: User): UserResponseType {
    //Copilot suggestion, pero nag-iinarte si TypeScript dahil unused si password. Which is technically mas ok sana to para dynamic yung properties.
    /*const { password, ...result } = user;
    return result;*/
    return {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }
}
