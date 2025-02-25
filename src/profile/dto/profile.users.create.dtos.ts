// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
  IsPhoneNumber,
} from 'class-validator';




export class ProfileUsersCreateReqDto {

  ////
  @IsOptional()
  @ApiProperty({ example: 1, description: 'profileRoleId', required: false })
  profileRoleId: number;


  ////
  @IsNotEmpty()
  @ApiProperty({ example: 'user', description: 'Username' })
  username: string;

  @MinLength(5, { message: 'Password must be more 5 symbols!' })
  @ApiProperty({ example: 'Password', description: 'Password' })
  password: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @ApiProperty({ example: '+79372222222', description: 'Phone number' })
  phone: string;

  @IsOptional()
  @ApiProperty({ example: 'user', description: 'First name', required: false })
  firstName: string;

  @IsOptional()
  @ApiProperty({ example: 'user', description: 'Last name', required: false })
  lastName: string;

}


