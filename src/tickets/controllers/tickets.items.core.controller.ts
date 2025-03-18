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





@ApiTags('Tickets Items Core')
@Controller('tickets/items/core')
export class TicketsItemsCoreController {
  constructor(private readonly ticketsItemsService: TicketsItemsService) { }


  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsItemsReadResDto })
  create(@Body() dto: TicketsItemsCreateReqDto,) {
    return this.ticketsItemsService.create(dto);
  }


  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get many' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsItemsReadBulkResDto })
  findMany(@Request() req, @Query() dto: QueryBulkDto) {
    return this.ticketsItemsService.findMany(dto);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Get one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsItemsReadResDto })
  findOne(@Param('id') id: string, @Query() dto: QueryDto) {
    return this.ticketsItemsService.findOne(+id, dto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsItemsReadResDto })
  removeOneById(@Param('id') id: string) {
    return this.ticketsItemsService.removeOneById(+id);
  }


}
