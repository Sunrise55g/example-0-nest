import {
  Controller, UsePipes, ValidationPipe, ParseArrayPipe, UseGuards,
  Get, Post, Body, Request, Query, Patch, Param, Delete,
  UploadedFile,
  BadRequestException,
  HttpCode,
  HttpStatus,
  UseInterceptors,
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
import { ProfileUsersCreateReqDto } from '../dto/profile.users.create.dtos';
import { ProfileUsersReadResDto, ProfileUsersReadBulkResDto } from '../dto/profile.users.read.dtos';
import { ProfileUsersUpdateReqDto, ProfileUsersUpdatePasswordReqDto } from '../dto/profile.users.update.dtos';

//
import { ProfileUsersService } from '../services/profile.users.service';





@ApiTags('Profile Users Core')
@Controller('profile/users/core')
export class ProfileUsersCoreController {
  constructor(private readonly profileUsersService: ProfileUsersService) { }


  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Create one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  create(@Body() dto: ProfileUsersCreateReqDto,) {
    return this.profileUsersService.create(dto);
  }


  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get many' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadBulkResDto })
  findMany(@Request() req, @Query() dto: QueryBulkDto) {
    // console.log(req);
    return this.profileUsersService.findMany(dto);
  }


  @Get(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Get one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  findOne(@Param('id') id: string, @Query() dto: QueryDto) {
    return this.profileUsersService.findOne(+id, dto);
  }


  @Patch(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  updateOneById(@Param('id') id: string, @Body() dto: ProfileUsersUpdateReqDto) {
    return this.profileUsersService.updateOneById(+id, dto);
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @RoleAuth('moderator')
  @ApiOperation({ summary: 'Delete one' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  removeOneById(@Param('id') id: string) {
    return this.profileUsersService.removeOneById(+id);
  }


}
