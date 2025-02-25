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
import { PartsItemsCreateReqDto } from '../dto/parts.items.create.dtos';
import { PartsItemsReadResDto, PartsItemsReadBulkResDto } from '../dto/parts.items.read.dtos';
import { PartsItemsUpdateReqDto } from '../dto/parts.items.update.dtos';

//
import { PartsItemsService } from '../services/parts.items.service';





@ApiTags('Parts Items Core')
@Controller('parts/items/core')
export class PartsItemsCoreController {
  constructor(private readonly partsItemsService: PartsItemsService) { }


  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsItemsReadResDto })
  create(@Body() dto: PartsItemsCreateReqDto,) {
    return this.partsItemsService.create(dto);
  }


  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get many' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsItemsReadBulkResDto })
  findAll(@Request() req, @Query() dto: QueryBulkDto) {
    console.log(req.user);
    return this.partsItemsService.findAll(dto);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Get one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsItemsReadResDto })
  findOne(@Param('id') id: string, @Query() dto: QueryDto) {
    return this.partsItemsService.findOne(+id, dto);
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsItemsReadResDto })
  updateOneById(@Param('id') id: string, @Body() dto: PartsItemsUpdateReqDto) {
    return this.partsItemsService.updateOneById(+id, dto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsItemsReadResDto })
  removeOneById(@Param('id') id: string) {
    return this.partsItemsService.removeOneById(+id);
  }


}
