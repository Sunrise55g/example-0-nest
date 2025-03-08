// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
  IsPhoneNumber,
  ValidateNested,
} from 'class-validator';



export class TicketsItemsReadResDto {

  ////
  @ApiProperty({ example: 1, description: 'Primary key' })
  id: number;

  ////
  @ApiProperty({ example: 1, description: 'ticketsInvoiceId'})
  ticketsInvoiceId: number;

  ////
  @ApiProperty({ example: 1, description: 'partItemId'})
  partItemId: number;


  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'updatedAt' })
  updatedAt: Date;

}



export class TicketsItemsReadBulkResDto {

  //
  @ApiProperty({ type: TicketsItemsReadResDto })
  data: TicketsItemsReadResDto;


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

