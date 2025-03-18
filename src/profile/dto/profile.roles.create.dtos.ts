// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';




export class ProfileRolesCreateReqDto {

  ////
  @IsNotEmpty()
  @ApiProperty({ example: 'Moderator', description: 'Name of role' })
  name: string;

  @IsOptional()
  @ApiProperty({ example: 'This is moderator', description: 'Role description', required: false,
  })
  description: string;

  @IsBoolean()
  @ApiProperty({ example: true, description: 'Administrator privilegies' })
  administrator: boolean;

  @IsBoolean()
  @ApiProperty({ example: false, description: 'Moderator privilegies' })
  moderator: boolean;


  ////
  @IsOptional()
  @ApiProperty({ example: true, description: 'Active status', required: false })
  active: boolean;
}

