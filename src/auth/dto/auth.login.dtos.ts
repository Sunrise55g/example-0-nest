import { PartialType } from '@nestjs/mapped-types';

import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MinLength,
  ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


////
import { ProfileUsersReadResDto } from 'src/profile/dto/profile.users.read.dtos';




export class AuthLoginSuccessDto {
  @IsNotEmpty()
  @ApiProperty({ type: ProfileUsersReadResDto })
  readonly user: ProfileUsersReadResDto;

  @IsNotEmpty()
  @ApiProperty({ example: '36i86564534867u5y4t7u65y4t76u5y', description: 'Token' })
  readonly token: string;
}
