// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
  IsPhoneNumber,
} from 'class-validator';




export class TicketsInvoicesCreateReqDto {

  ////
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'ticketsCategoryId'})
  ticketsCategoryId: number;


  ////
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: 'customerUserId'})
  customerUserId: number;


  ////
  @IsNotEmpty()
  @ApiProperty({ example: 'Invoice 22222', description: 'Name of invoice' })
  name: string;

  @IsOptional()
  @ApiProperty({ example: 'Invoice 22222....', description: 'Invoice description', required: false,
  })
  description: string;

}


