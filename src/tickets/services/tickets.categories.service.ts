import {
  Injectable, BadRequestException, NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


////
import { fieldsHandler } from 'src/common/utils/typeorm/fieldsHandler';
import { searchHandler } from 'src/common/utils/typeorm/searchHandler';
import { filterHandler } from 'src/common/utils/typeorm/filterHandler';
import { sortHandler } from 'src/common/utils/typeorm/sortHandler';
import { joinHandler } from 'src/common/utils/typeorm/joinHandler';
import { QueryBulkDto, QueryDto } from 'src/common/dto/query.dto';


////
//
import { TicketsCategories } from '../entities/tickets.categories.entity';
//
import { TicketsCategoriesCreateReqDto } from '../dto/tickets.categories.create.dtos';
import { TicketsCategoriesReadResDto, TicketsCategoriesReadBulkResDto } from '../dto/tickets.categories.read.dtos';
import { TicketsCategoriesUpdateReqDto } from '../dto/tickets.categories.update.dtos';





@Injectable()
export class TicketsCategoriesService {
  constructor(
    @InjectRepository(TicketsCategories)
    private ticketsCategoriesRepo: Repository<TicketsCategories>,
  ) { }



  async create(dto: TicketsCategoriesCreateReqDto) {
    const obj = await this.ticketsCategoriesRepo.save(dto);
    return obj;
  }




  async findMany(dto: QueryBulkDto) {
    //
    const repo = this.ticketsCategoriesRepo;
    const dbTable = 'tickets_categories';

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
    const repo = this.ticketsCategoriesRepo;
    const dbTable = 'tickets_categories';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.id = :id`, { id: id })

    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);

    //
    const obj = await query.getOne();
    if (!obj) {
      throw new NotFoundException();
    }

    return obj;
  }




  async updateOneById(id: number, dto: TicketsCategoriesUpdateReqDto) {

    const obj = await this.ticketsCategoriesRepo.findOne({
      where: {
        id: id
      },
    });
    if (!obj) {
      throw new NotFoundException();
    }

    const objUpdate = await this.ticketsCategoriesRepo.save({ id, ...dto });

    const objUpdated = await this.ticketsCategoriesRepo.findOne({
      where: { id: id },
    });

    return objUpdated;
  }




  async removeOneById(id: number) {

    const obj = await this.ticketsCategoriesRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!obj) {
      throw new NotFoundException();
    }

    const objDelete = await this.ticketsCategoriesRepo.delete(id);

    return objDelete;
  }


  async totalCount() {

    //
    const repo = this.ticketsCategoriesRepo;
    const dbTable = 'tickets_categories';


    let query = repo
      .createQueryBuilder(dbTable)
      .select([`${dbTable}.id, ${dbTable}.createdAt`])


    let data = await query.getRawMany();
    const count = data.length;

    return count;
  }


}
