import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';


////
import { ProfileUsersService } from 'src/profile/services/profile.users.service';


////
import { ROLE_KEY } from '../role-auth.decorator';





@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private profileUsersService: ProfileUsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const requiredRole = this.reflector.getAllAndOverride<string[]>(
        ROLE_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRole) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'Not autorized!' });
      }

      const payload = this.jwtService.verify(token);
      const user = await this.profileUsersService.findOneByLogin(
        payload.username,
      );
      if (!user) {
        throw new UnauthorizedException({ message: 'Not autorized!' });
      }

      let allow = false;

      if (
        requiredRole.includes('moderator') &&
        (user.profileRole.moderator == true ||
          user.profileRole.administrator == true)
      ) {
        allow = true;
      }

      if (
        requiredRole.includes('administrator') &&
        user.profileRole.administrator == true
      ) {
        allow = true;
      }

      return allow;
    } catch (e) {
      console.log(e);
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
