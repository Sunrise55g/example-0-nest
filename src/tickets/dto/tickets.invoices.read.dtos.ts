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
import { TicketsCategoriesReadResDto } from './tickets.categories.read.dtos';
import { PartsItemsReadResDto } from 'src/parts/dto/parts.items.read.dtos';
import { InvoiceStatusEnum } from '../entities/tickets.invoices.entity';



export class TicketsInvoicesReadResDto {

  ////
  @ApiProperty({ example: 1, description: 'Primary key' })
  id: number;


  ////
  @ApiProperty({ example: 1, description: 'ticketsCategoryId'})
  ticketsCategoryId: number;

  @ApiProperty({ type: TicketsCategoriesReadResDto })
  tickets_categories: TicketsCategoriesReadResDto;


  ////
  @ApiProperty({ example: 1, description: 'customerUserId'})
  customerUserId: number;


  ////
  @ApiProperty({ example: 1, description: 'employerUserId'})
  employerUserId: number;


  ////
  @ApiProperty({ type: PartsItemsReadResDto })
  parts_items: PartsItemsReadResDto;


  ////
  @ApiProperty({ example: 'Invoice #22222', description: 'Name of invoice' })
  name: string;

  @ApiProperty({ example: 'Invoice #22222? description', description: 'Invoice description', required: false })
  description: string;

 
  ////
  @ApiProperty({ example: false, description: 'Active status', required: false })
  active: boolean;

  @ApiProperty({ example: InvoiceStatusEnum.OPEN, description: 'Ticket status', required: false })
  status: InvoiceStatusEnum;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ example: '2025-05-19T20:44:19.360Z', description: 'updatedAt' })
  updatedAt: Date;

}



export class TicketsInvoicesReadBulkResDto {

  //
  @ApiProperty({ type: TicketsInvoicesReadResDto })
  data: TicketsInvoicesReadResDto;


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

