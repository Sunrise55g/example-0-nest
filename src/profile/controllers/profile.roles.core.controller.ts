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
import { ProfileRolesCreateReqDto} from '../dto/profile.roles.create.dtos';
import { ProfileRolesReadResDto, ProfileRolesReadBulkResDto } from '../dto/profile.roles.read.dtos';
import { ProfileRolesUpdateReqDto } from '../dto/profile.roles.update.dtos';

//
import { ProfileRolesService } from '../services/profile.roles.service';





@ApiTags('Profile Roles Core')
@Controller('profile/roles/core')
export class ProfileRolesCoreController {
  constructor(private readonly profileRolesService: ProfileRolesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileRolesReadResDto })
  create(@Body() dto: ProfileRolesCreateReqDto) {
    return this.profileRolesService.create(dto);
  }


  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get many' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileRolesReadBulkResDto })
  findMany(@Query() dto: QueryBulkDto) {
    return this.profileRolesService.findMany(dto);
  }


  @Get('/totalCount')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get total count' })
  @ApiResponse({ status: 200, type: Number })
  async totalCount() {
    const dto = {
      fields: [`id`],
      joinDisable: true
    } as unknown as QueryBulkDto

    const usersList = await this.profileRolesService.findMany(dto)
    const count = usersList.count || 0;

    return count;
  }

  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileRolesReadResDto })
  findOne(@Param('id') id: string, @Query() dto: QueryDto) {
    return this.profileRolesService.findOne(+id, dto);
  }

  
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileRolesReadResDto })
  updateOneById(@Param('id') id: string, @Body() dto: ProfileRolesUpdateReqDto) {
    return this.profileRolesService.updateOneById(+id, dto);
  }

 
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileRolesReadResDto })
  removeOneById(@Param('id') id: string) {
    return this.profileRolesService.removeOneById(+id);
  }


}
