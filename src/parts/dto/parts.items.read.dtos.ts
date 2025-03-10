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
import { PartsCategoriesReadResDto } from './parts.categories.read.dtos';





export class PartsItemsReadResDto {

  ////
  @ApiProperty({ example: 1, description: 'Primary key' })
  id: number;


  ////
  @ApiProperty({ example: 1, description: 'partsCategoryId'})
  partsCategoryId: number;

  @ApiProperty({ type: PartsCategoriesReadResDto })
  partsCategory: PartsCategoriesReadResDto;


  ////
  @ApiProperty({ example: 'Big Server', description: 'Name of item' })
  name: string;

  @ApiProperty({ example: 'This is Big Server', description: 'Item description', required: false })
  description: string;

 
  ////
  @ApiProperty({ example: false, description: 'Active status', required: false })
  active: boolean;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'updatedAt' })
  updatedAt: Date;

}



export class PartsItemsReadBulkResDto {

  //
  @ApiProperty({ type: [PartsItemsReadResDto] })
  data: PartsItemsReadResDto[];


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

