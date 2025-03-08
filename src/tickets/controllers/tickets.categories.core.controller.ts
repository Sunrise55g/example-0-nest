import {
  Controller, UsePipes, ValidationPipe, ParseArrayPipe, UseGuards,
  Get, Post, Body, Request, Query, Patch, Param, Delete,
} from '@nestjs/common';

import {
  ApiBearerAuth, ApiOperation, ApiResponse, ApiQuery, ApiTags,
} from '@nestjs/swagger';


////
import { QueryBulkDto, QueryDto } from 'src/common/dto/query.dto';


////
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role-auth.guard';
import { RoleAuth } from 'src/auth/role-auth.decorator';


////
//
import { TicketsCategoriesCreateReqDto} from '../dto/tickets.categories.create.dtos';
import { TicketsCategoriesReadResDto, TicketsCategoriesReadBulkResDto } from '../dto/tickets.categories.read.dtos';
import { TicketsCategoriesUpdateReqDto } from '../dto/tickets.categories.update.dtos';

//
import { TicketsCategoriesService } from '../services/tickets.categories.service';





@ApiTags('Tickets Categories Core')
@Controller('tickets/categories/core')
export class TicketsCategoriesCoreController {
  constructor(private readonly ticketsCategoriesService: TicketsCategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsCategoriesReadResDto })
  create(@Body() dto: TicketsCategoriesCreateReqDto) {
    return this.ticketsCategoriesService.create(dto);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  // @RoleAuth('moderator')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get many' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsCategoriesReadBulkResDto })
  findAll(@Query() dto: QueryBulkDto) {
    return this.ticketsCategoriesService.findAll(dto);
  }

  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @RoleAuth('moderator')
  @ApiOperation({ summary: 'Get one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsCategoriesReadResDto })
  findOne(@Param('id') id: string, @Query() dto: QueryDto) {
    return this.ticketsCategoriesService.findOne(+id, dto);
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsCategoriesReadResDto })
  updateOneById(@Param('id') id: string, @Body() dto: TicketsCategoriesUpdateReqDto) {
    return this.ticketsCategoriesService.updateOneById(+id, dto);
  }

 
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: TicketsCategoriesReadResDto })
  removeOneById(@Param('id') id: string) {
    return this.ticketsCategoriesService.removeOneById(+id);
  }


}
