// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';


////
import { PartsItemsCreateReqDto } from './parts.items.create.dtos';




export class PartsItemsUpdateReqDto extends PartialType(PartsItemsCreateReqDto,) {}


