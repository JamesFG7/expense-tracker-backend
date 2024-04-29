import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../schemas/User.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userMode: Model<User>) {}

}
