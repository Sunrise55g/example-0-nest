// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';




export class PartsCategoriesReadResDto {

  ////
  @ApiProperty({ example: 1, description: 'Primary key' })
  id: number;


  ////
  @ApiProperty({ example: 'Server', description: 'Name of category' })
  name: string;

  @ApiProperty({ example: 'This is Server', description: 'category description', required: false, })
  description: string;

  
  ////
  @ApiProperty({ example: true, description: 'Active status', required: false })
  active: boolean;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'updatedAt',
  })
  updatedAt: Date;

}




export class PartsCategoriesReadBulkResDto {

  //
  @ApiProperty({ type: PartsCategoriesReadResDto })
  data: PartsCategoriesReadResDto;


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

