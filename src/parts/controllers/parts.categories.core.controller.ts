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
import { PartsCategoriesCreateReqDto} from '../dto/parts.categories.create.dtos';
import { PartsCategoriesReadResDto, PartsCategoriesReadBulkResDto } from '../dto/parts.categories.read.dtos';
import { PartsCategoriesUpdateReqDto } from '../dto/parts.categories.update.dtos';

//
import { PartsCategoriesService } from '../services/parts.categories.service';





@ApiTags('Parts Categories Core')
@Controller('parts/categories/core')
export class PartsCategoriesCoreController {
  constructor(private readonly partsCategoriesService: PartsCategoriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsCategoriesReadResDto })
  create(@Body() dto: PartsCategoriesCreateReqDto) {
    return this.partsCategoriesService.create(dto);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  // @RoleAuth('moderator')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get many' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsCategoriesReadBulkResDto })
  findAll(@Query() dto: QueryBulkDto) {
    return this.partsCategoriesService.findAll(dto);
  }

  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  // @RoleAuth('moderator')
  @ApiOperation({ summary: 'Get one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsCategoriesReadResDto })
  findOne(@Param('id') id: string, @Query() dto: QueryDto) {
    return this.partsCategoriesService.findOne(+id, dto);
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsCategoriesReadResDto })
  updateOneById(@Param('id') id: string, @Body() dto: PartsCategoriesUpdateReqDto) {
    return this.partsCategoriesService.updateOneById(+id, dto);
  }

 
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: PartsCategoriesReadResDto })
  removeOneById(@Param('id') id: string) {
    return this.partsCategoriesService.removeOneById(+id);
  }


}
