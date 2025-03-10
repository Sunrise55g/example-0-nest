import {
  Controller, UsePipes, ValidationPipe, ParseArrayPipe, UseGuards,
  Get, Post, Body, Request, Query, Patch, Param, Delete,
} from '@nestjs/common';

import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags,
  ApiBody, ApiConsumes,
} from '@nestjs/swagger';


////
import { QueryBulkDto, QueryDto } from 'src/common/dto/query.dto';


////
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role-auth.guard';
import { RoleAuth } from 'src/auth/role-auth.decorator';


////
//
import { TicketsInvoicesCreateReqDto } from '../dto/tickets.invoices.create.dtos';
import { TicketsInvoicesReadResDto, TicketsInvoicesReadBulkResDto } from '../dto/tickets.invoices.read.dtos';
import { TicketsInvoicesUpdateReqDto } from '../dto/tickets.invoices.update.dtos';

//
import { TicketsInvoicesService } from '../services/tickets.invoices.service';





@ApiTags('Tickets Invoices Current')
@Controller('tickets/invoices/current')
export class TicketsInvoicesCurrentController {
  constructor(private readonly ticketsInvoicesService: TicketsInvoicesService) { }


  @Get('totalCount')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get total count' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: Number })
  totalCount(@Request() req) {
    return this.ticketsInvoicesService.totalCount(true, req.user.id);
  }


  @Get('statsByDays')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get stats by days' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200 })
  statsByDays(@Request() req) {
    return this.ticketsInvoicesService.statsByDays(true, req.user.id);
  }


}
