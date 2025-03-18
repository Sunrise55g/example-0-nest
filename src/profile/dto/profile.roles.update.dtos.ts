// import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiQuery, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

import {
  IsBoolean,IsDateString, IsEmail, IsNotEmpty, IsOptional,
  IsNumber, MinLength, Min, Max,
} from 'class-validator';


////
import { ProfileRolesCreateReqDto } from './profile.roles.create.dtos';



export class ProfileRolesUpdateReqDto extends PartialType(ProfileRolesCreateReqDto) {}


