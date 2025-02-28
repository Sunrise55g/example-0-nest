import {
  Controller, Get, Post, HttpCode, Body,
  Patch, Param, Delete, UseGuards, Request,
  UsePipes, ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import {
  ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags,
} from '@nestjs/swagger';


////
import { ProfileUsersReadResDto } from 'src/profile/dto/profile.users.read.dtos';


////
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';


////
//
import { AuthLoginSuccessDto } from '../dto/auth.login.dtos';
import { AuthRegistrationReqDto, AuthRegistrationResSuccessDto } from '../dto/auth.registration.dtos';

//
import { AuthService } from '../services/auth.service';




@ApiTags('Authorization and registration')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('registration')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: 'Registration' })
  @ApiResponse({ status: 201, type: AuthRegistrationResSuccessDto })
  registration(
    @Body() authBeginByEmailFinalDto: AuthRegistrationReqDto,
  ) {
    return this.authService.registration(
      authBeginByEmailFinalDto,
    );
  }


  // login
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login by Email | Username' })
  @ApiBody({
    schema: {
      example: { login: 'user@example.com', password: 'Password' },
    },
  })
  @ApiResponse({ status: 200, type: AuthLoginSuccessDto })
  async loginByEmail(@Body() body) {
    return this.authService.login(body.login, body.password);
  }


  // work for tokens
  @UseGuards(JwtAuthGuard)
  @Get('refresh')
  @ApiOperation({ summary: 'Refresh token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: { token: '43t54wyhj5w4t43wyh35t23q4t435r534t3r' },
    },
  })
  refresh(@Request() req) {
    return this.authService.refresh(req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Get('verify')
  @ApiOperation({ summary: 'Verify token' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    schema: {
      example: { verify: true },
    },
  })
  verify(@Request() req) {
    return this.authService.verify(req.user);
  }

  
}
