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
import { ProfileUsersCreateReqDto } from '../dto/profile.users.create.dtos';
import { ProfileUsersReadResDto, ProfileUsersReadBulkResDto } from '../dto/profile.users.read.dtos';
import { ProfileUsersUpdateReqDto, ProfileUsersUpdatePasswordReqDto } from '../dto/profile.users.update.dtos';

//
import { ProfileUsersService } from '../services/profile.users.service';


@ApiTags('Profile Users Current')
@Controller('profile/users/current')
export class ProfileUserCurrentController {
  constructor(
    private readonly profileUsersService: ProfileUsersService,
  ) { }



  @Get()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  findCurrent(@Request() req, @Query() dto: QueryDto) {
    return this.profileUsersService.findOne(req.user.id, dto);
  }


  @Patch()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path current user' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  updateOneById(@Request() req, @Body() dto: ProfileUsersUpdateReqDto) {
    return this.profileUsersService.updateOneById(req.user.id, dto);
  }


  @Patch('/password')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Path new password' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: ProfileUsersReadResDto })
  updatePassword(@Request() req, @Body() dto: ProfileUsersUpdatePasswordReqDto) {
    return this.profileUsersService.updatePassword(req.user.id, dto);
  }

  
}
