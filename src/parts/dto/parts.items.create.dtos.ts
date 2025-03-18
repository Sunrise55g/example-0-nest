// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
  IsPhoneNumber,
} from 'class-validator';




export class PartsItemsCreateReqDto {

  ////
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'partsCategoryId'})
  partsCategoryId: number;


  ////
  @IsNotEmpty()
  @ApiProperty({ example: 'Big Server', description: 'Name of item' })
  name: string;

  @IsOptional()
  @ApiProperty({ example: 'This is Big Server', description: 'Item description', required: false,
  })
  description: string;

  ////
  @IsOptional()
  @ApiProperty({ example: true, description: 'Active status', required: false })
  active: boolean;

}


