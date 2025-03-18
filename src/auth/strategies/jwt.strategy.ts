import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

////
import { IUser } from '../types/auth.types';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET', 'default_secret_key'),
    });
  }

  // async validate(user: IUser) {
  //   console.log(user)
  //   return { id: user.id, username: user.username };
  // }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
