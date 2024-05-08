import { Controller, Get, Req } from '@nestjs/common';
import { ExpressRequest } from '../../../middlewares/auth.middleware';
import { UserResponseType } from '../../types/userResponse.type';
import { UsersService } from '../../services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}
  @Get('profile')
  async profile(@Req() request: ExpressRequest): Promise<UserResponseType> {
    return this.UsersService.buildUserResponse(request.user);
  }
}
