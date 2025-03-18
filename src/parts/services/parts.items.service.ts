import {
  Injectable, BadRequestException, NotFoundException, UnauthorizedException,
  Logger, Inject, forwardRef,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';


////
import { fieldsHandler } from 'src/common/utils/typeorm/fieldsHandler';
import { searchHandler } from 'src/common/utils/typeorm/searchHandler';
import { filterHandler } from 'src/common/utils/typeorm/filterHandler';
import { sortHandler } from 'src/common/utils/typeorm/sortHandler';
import { joinHandler } from 'src/common/utils/typeorm/joinHandler';
import { QueryBulkDto, QueryDto } from 'src/common/dto/query.dto';


////
//
import { PartsCategories } from '../entities/parts.categories.entity';
import { PartsItems } from '../entities/parts.items.entity';

//
import { PartsItemsCreateReqDto } from '../dto/parts.items.create.dtos';
import { PartsItemsReadResDto, PartsItemsReadBulkResDto } from '../dto/parts.items.read.dtos';
import { PartsItemsUpdateReqDto } from '../dto/parts.items.update.dtos';




@Injectable()
export class PartsItemsService {

  profileRepo: any;
  private readonly logger = new Logger(PartsItemsService.name);

  constructor(
    //
    @InjectRepository(PartsCategories)
    private partsCategoriesRepo: Repository<PartsCategories>,
    @InjectRepository(PartsItems)
    private partsItemsRepo: Repository<PartsItems>,
  ) { }




  async create(dto: PartsItemsCreateReqDto): Promise<PartsItemsReadResDto> {

    ////data check
    if (dto.partsCategoryId) {
      const partsCategory = await this.partsCategoriesRepo.findOne({
        where: {
          id: dto.partsCategoryId
        },
      });
      if (!partsCategory) {
        throw new BadRequestException({
          message: 'Category with this partsCategoryId not found',
        });
      }
    }


    const obj = await this.partsItemsRepo.save(dto);

    const objCreated = await this.partsItemsRepo.findOne({
      where: {
        id: obj.id
      },
      relations: {
        partsCategory: true,
      },
    });
    if (!objCreated) {
      throw new InternalServerErrorException();
    }

    return objCreated;
  }




  async findMany(dto: QueryBulkDto) {
    //
    const repo = this.partsItemsRepo;
    const dbTable = 'parts_items';

    //
    let query = repo
      .createQueryBuilder(dbTable)

    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = searchHandler(dto, dbTable, query);
    query = filterHandler(dto, dbTable, query);
    query = sortHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);

    // pagination
    const total = await query.getCount();
    const limit = dto.limit;
    let offset = dto.offset;
    let page = dto.page;

    const pageCount = Math.ceil(total / limit);
    if (page < 1) {
      dto.page = 1;
    }
    if (page > pageCount) {
      page = pageCount;
    }

    if (page > 0) {
      offset = limit * (page - 1);
    }

    query.skip(offset).take(limit);

    //
    if (!dto.join) {
      query.leftJoinAndSelect(
        'parts_items.partsCategory', 'partsCategory'
      );
    }

    //
    if (!dto.sort) {
      query.orderBy(`${dbTable}.id`, 'DESC');
    }

    //
    const data = await query.getMany();
    const count = data.length;

    //
    const result = {
      data: data,
      count: count,
      total: total,
      page: page,
      pageCount: pageCount,
    };
    return result;
  }




  async findOne(id: number, dto: QueryDto) {
    //
    const repo = this.partsItemsRepo;
    const dbTable = 'parts_items';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.id = :id`, { id: id })


    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);


    //
    if (!dto.join) {
      query.leftJoinAndSelect(
        'parts_items.partsCategory', 'partsCategory'
      );
    }

    //
    const data = await query.getOne();
    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }




  async updateOneById(id: number, dto: PartsItemsUpdateReqDto) {


    if (dto.partsCategoryId) {
      const partsCategory = await this.partsCategoriesRepo.findOne({
        where: {
          id: dto.partsCategoryId
        },
      });
      if (!partsCategory) {
        throw new BadRequestException({
          message: 'Category with this partsCategoryId not found',
        });
      }
    }


    const obj = await this.partsItemsRepo.findOne({
      where: {
        id: id
      },
    });
    if (!obj) {
      throw new NotFoundException();
    }

    //
    const objUpdate = await this.partsItemsRepo.save({ id, ...dto });

    const objUpdated = await this.partsItemsRepo.findOne({
      where: {
        id: id
      },
      relations: {
        partsCategory: true,
      },
    });

    return objUpdated;
  }



  async removeOneById(id: number) {

    const obj = await this.partsItemsRepo.findOne({
      where: {
        id: id
      },
      relations: {
        partsCategory: true
      },
    });

    if (!obj) {
      throw new NotFoundException();
    }


    ////
    const objDelete = await this.partsItemsRepo.delete(id);

    return objDelete;
  }




}