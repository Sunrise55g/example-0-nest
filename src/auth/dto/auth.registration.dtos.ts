import { PartialType } from '@nestjs/mapped-types';

import {
  IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsPhoneNumber, MinLength, ValidateNested,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';


////
import { ProfileUsersReadResDto } from 'src/profile/dto/profile.users.read.dtos';



export class AuthRegistrationReqDto {

  ////
  @IsOptional()
  @ApiProperty({ example: 'user', description: 'Username', required: false })
  username: string;

  @MinLength(5, { message: 'Password must be more 5 symbols!' })
  @ApiProperty({ example: 'Password', description: 'Password' })
  password: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @IsPhoneNumber()
  @IsOptional()
  @ApiProperty({ example: '+79372222222', description: 'Phone number', required: false })
  phone: string;

  @IsOptional()
  @ApiProperty({ example: 'user', description: 'First name', required: false })
  firstName: string;

  @IsOptional()
  @ApiProperty({ example: 'user', description: 'Last name', required: false })
  lastName: string;

}




export class AuthRegistrationResSuccessDto {
  @ApiProperty({ type: ProfileUsersReadResDto })
  readonly user: ProfileUsersReadResDto;

  @ApiProperty({ example: '4y5tw45yh45tw34ty435ty453345324', description: 'Token' })
  readonly token: string;
}
