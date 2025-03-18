import {
  Controller, UsePipes, ValidationPipe, ParseArrayPipe, UseGuards,
  Get, Post, Body, Request, Query, Patch, Param, Delete, BadRequestException,
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
import { TicketsItemsCreateReqDto } from '../dto/tickets.items.create.dtos';
import { TicketsItemsReadResDto, TicketsItemsReadBulkResDto } from '../dto/tickets.items.read.dtos';

//
import { TicketsItemsService } from '../services/tickets.items.service';





@ApiTags('Tickets Items Current')
@Controller('tickets/items/current')
export class TicketsItemsCurrentController {
  constructor(private readonly ticketsItemsService: TicketsItemsService) { }


  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsItemsReadResDto })
  create(@Request() req,  @Body() dto: TicketsItemsCreateReqDto,) {
    return this.ticketsItemsService.create(dto, true, +req.user.id);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsItemsReadResDto })
  removeOneById(@Request() req, @Param('id') id: string) {
    return this.ticketsItemsService.removeOneById(+id, true, +req.user.id);
  }


}
