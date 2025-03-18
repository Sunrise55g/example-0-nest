import {
  BadRequestException, Injectable, NotFoundException, UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';


////
import { ProfileUsersService } from 'src/profile/services/profile.users.service';
import { ProfileUsersCreateReqDto } from 'src/profile/dto/profile.users.create.dtos';


////
//
import { IUser } from '../types/auth.types';

//
import { AuthLoginSuccessDto } from '../dto/auth.login.dtos';
import { AuthRegistrationReqDto, AuthRegistrationResSuccessDto } from '../dto/auth.registration.dtos';





@Injectable()
export class AuthService {
  constructor(
    //
    private readonly jwtService: JwtService,
    //
    private profileUsersService: ProfileUsersService,
  ) {}



  async registration(dto: AuthRegistrationReqDto) {

    console.log(dto);

    //// create user
    if (typeof dto['username'] === 'undefined') {
      if (typeof dto['email'] !== 'undefined') {
        dto.username = dto.email;
      }
    }

  
    const new_profile_users = await this.profileUsersService.create(
      {
        username: dto.username,
        password: dto.password,
        email: dto.email,
        phone: dto.phone,
        firstName: dto.firstName,
        lastName: dto.lastName,
      } as ProfileUsersCreateReqDto
    );


    const token = this.jwtService.sign({
      id: new_profile_users.id,
      username: new_profile_users.username,
    });


    const result = {
      user: new_profile_users,
      token: token,
    };

    return result;
  }



  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.profileUsersService.findOneByLogin(username);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }
    if (user.active == false) {
      throw new NotFoundException('User is not active!');
    }
   
    const passwordIsMatch = await argon2.verify(user.passwordHash, password);

    if (user && passwordIsMatch) {
      const { passwordHash, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('User or password are incorrect!');
  }




  //// Login
  async login(login: string, password: string): Promise<any> {

    //
    let userObj = await this.profileUsersService.findOneByEmail(login);

    if (!userObj) {
      userObj = await this.profileUsersService.findOneByLogin(login);
    }

    //
    if (!userObj) {
      throw new UnauthorizedException('User not found!');
    }
    if (userObj.active == false) {
      throw new NotFoundException('User is not active!');
    }
    

    //
    const passwordIsMatch = await argon2.verify(userObj.passwordHash, password);

    if (userObj && passwordIsMatch) {
      const { passwordHash, ...user } = userObj;
      const token = this.jwtService.sign({
        id: userObj.id,
        username: userObj.username,
      });

      const result = { user, token };
      return result;
    }

    throw new UnauthorizedException('Email | Login or password are incorrect!');
  }





  // login by username
  async loginByUsername(user: IUser) {
    const { id, username } = user;
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });

    const result = { user, token };
    return result;
  }



  //
  async refresh(user: IUser) {
    const { id, username } = user;
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });

    const result = { token: token };
    return result;
  }



  async verify(user: IUser) {
    const result = { verify: true };
    return result;
  }


}
