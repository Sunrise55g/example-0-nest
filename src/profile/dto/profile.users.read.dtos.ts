// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';


////
import { ProfileRolesReadResDto } from './profile.roles.read.dtos';





export class ProfileUsersReadResDto {

  ////
  @ApiProperty({ example: 1, description: 'Primary key' })
  id: number;


  ////
  @ApiProperty({ example: 1, description: 'Role id', required: false })
  profileRoleId: number;

  @ApiProperty({ type: ProfileRolesReadResDto })
  profileRole: ProfileRolesReadResDto;

  @ApiProperty({ example: 'user', description: 'Username' })
  username: string;

  @IsEmail()
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  email: string;

  @IsPhoneNumber()
  @ApiProperty({ example: '+79372222222', description: 'Phone number' })
  phone: string;

  @ApiProperty({ example: 'user', description: 'First name', required: false })
  firstName: string;

  @ApiProperty({ example: 'user', description: 'Last name', required: false })
  lastName: string;


  ////
  @ApiProperty({ example: false, description: 'Active status', required: false })
  active: boolean;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'updatedAt' })
  updatedAt: Date;

}



export class ProfileUsersReadBulkResDto {

  //
  @ApiProperty({ type: [ProfileUsersReadResDto] })
  data: ProfileUsersReadResDto[];


  //
  @ApiProperty({ example: '10', description: 'Count on page' })
  count: number;

  @ApiProperty({ example: '100', description: 'Total count' })
  total: number;

  @ApiProperty({ example: '1', description: 'Page number' })
  page: number;

  @ApiProperty({ example: '0', description: 'Page count' })
  pageCount: number;
}

