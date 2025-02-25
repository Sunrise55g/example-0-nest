// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';




export class PartsCategoriesCreateReqDto {

  ////
  @IsNotEmpty()
  @ApiProperty({ example: 'Servers', description: 'Name of category' })
  name: string;

  @IsOptional()
  @ApiProperty({ example: 'This is Servers', description: 'Category description', required: false,
  })
  description: string;

  ////
  @IsOptional()
  @ApiProperty({ example: true, description: 'Active status', required: false })
  active: boolean;
}

