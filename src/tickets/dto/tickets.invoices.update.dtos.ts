// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';


////
import { TicketsInvoicesCreateReqDto } from './tickets.invoices.create.dtos';
import { InvoiceStatusEnum } from '../entities/tickets.invoices.entity';




export class TicketsInvoicesUpdateReqDto {


////
@IsNotEmpty()
@IsOptional()
@ApiProperty({ example: 1, description: 'ticketsCategoryId', required: false,})
ticketsCategoryId: number;


////
@IsNotEmpty()
@IsOptional()
@ApiProperty({ example: 1, description: 'customerUserId', required: false,})
customerUserId: number;


////
@IsNotEmpty()
@IsOptional()
@ApiProperty({ example: 1, description: 'employerUserId', required: false,})
employerUserId: number;


////
@IsNotEmpty()
@IsOptional()
@ApiProperty({ example: 'Invoice 22222', description: 'Name of invoice', required: false, })
name: string;

@IsOptional()
@ApiProperty({ example: 'Invoice 22222....', description: 'Invoice description', required: false,
})
description: string;

////
@ApiProperty({ example: InvoiceStatusEnum.OPEN, description: 'Ticket status', required: false })
@IsOptional()
status: InvoiceStatusEnum;

}


