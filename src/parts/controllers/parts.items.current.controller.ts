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
import { PartsItemsCreateReqDto } from '../dto/parts.items.create.dtos';
import { PartsItemsReadResDto, PartsItemsReadBulkResDto } from '../dto/parts.items.read.dtos';
import { PartsItemsUpdateReqDto } from '../dto/parts.items.update.dtos';

//
import { PartsItemsService } from '../services/parts.items.service';





@ApiTags('Parts Items Current')
@Controller('parts/items/current')
export class PartsItemsCurrentController {
  constructor(private readonly partsItemsService: PartsItemsService) { }



  @Get('/totalCount')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get total count' })
  @ApiResponse({ status: 200, type: Number })
  async totalCount() {
    const dto = {
      fields: [`id`],
      joinDisable: true
    } as unknown as QueryBulkDto

    const usersList = await this.partsItemsService.findMany(dto)
    const count = usersList.count || 0;

    return count;
  }


}
