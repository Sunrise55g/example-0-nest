// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';


////
import { PartsCategoriesCreateReqDto } from './parts.categories.create.dtos';



export class PartsCategoriesUpdateReqDto extends PartialType(PartsCategoriesCreateReqDto) {}


