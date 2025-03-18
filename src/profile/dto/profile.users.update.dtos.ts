// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';


////
import { ProfileUsersCreateReqDto } from './profile.users.create.dtos';




export class ProfileUsersUpdateReqDto extends PartialType(ProfileUsersCreateReqDto,) {}



export class ProfileUsersUpdatePasswordReqDto {

  @IsNotEmpty()
  @ApiProperty({ example: 'Password', description: 'Old password' })
  oldPassword: string;

  @IsNotEmpty()
  @MinLength(5, { message: 'Password must be more 5 symbols!' })
  @ApiProperty({ example: 'Password', description: 'New password' })
  newPassword: string;

}


