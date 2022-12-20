import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthServiceMiddleware implements NestMiddleware {
  async use(req: Request, _res: Response, next: NextFunction) {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    try {
      req.user = verify(jwtFromRequest(req), jwtConstants.secret);
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired auth token!');
    }
    return next();
  }
}
