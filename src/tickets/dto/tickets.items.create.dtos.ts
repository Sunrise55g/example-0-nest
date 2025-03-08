// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
  IsPhoneNumber,
} from 'class-validator';




export class TicketsItemsCreateReqDto {

  ////
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ticketsInvoiceId'})
  ticketsInvoiceId: number;
  
  ////
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'partsItemId'})
  partsItemId: number;


}


