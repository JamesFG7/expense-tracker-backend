import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsersService } from '../users/services/users/users.service';
import { verify } from 'crypto';

export interface ExpressRequest extends Request {
  user?: any;
}
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly UsersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers['authorization'].split(' ')[1];
    try {
      const decode = verify(token, process.env.JWT_SECRET) as { email: string };
      const user = await this.UsersService.findByEmail(decode.email);
      req.user = user;
      next();
    } catch (e) {
      req.user = null;
      next();
    }
  }
}
