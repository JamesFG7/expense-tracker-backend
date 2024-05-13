import {
  HttpException,
  Injectable,
  NestMiddleware,
  Req,
  Res,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersService } from '../users/services/users/users.service';

export interface ExpressRequest extends Request {
  user?: any;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly UsersService: UsersService) {}
  async use(
    @Req() req: Request & { user?: any },
    @Res() res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (!req.headers['cookie']) {
      req.user = null;
      throw new HttpException('Unauthorized', 401);
    }

    const token: string = req.headers['cookie'].split('=')[1];
    try {
      const decode = verify(token, process.env.JWT_SECRET) as {
        email: string;
      };
      const user = await this.UsersService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
