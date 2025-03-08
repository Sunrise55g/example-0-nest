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
import { ProfileUsers } from 'src/profile/entities/profile.users.entity';


////
import { PartsItems } from 'src/parts/entities/parts.items.entity';


////
//
import { TicketsCategories } from '../entities/tickets.categories.entity';
import { TicketsInvoices } from '../entities/tickets.invoices.entity';

//
import { TicketsInvoicesCreateReqDto } from '../dto/tickets.invoices.create.dtos';
import { TicketsInvoicesReadResDto, TicketsInvoicesReadBulkResDto } from '../dto/tickets.invoices.read.dtos';
import { TicketsInvoicesUpdateReqDto } from '../dto/tickets.invoices.update.dtos';
import { TicketsItems } from '../entities/tickets.items.entity';
import { TicketsItemsCreateReqDto } from '../dto/tickets.items.create.dtos';
import { TicketsItemsReadResDto } from '../dto/tickets.items.read.dtos';




@Injectable()
export class TicketsItemsService {

  profileRepo: any;
  private readonly logger = new Logger(TicketsItemsService.name);

  constructor(

    //
    @InjectRepository(PartsItems)
    private partsItemsRepo: Repository<PartsItems>,

   //
    @InjectRepository(TicketsInvoices)
    private ticketsInvoicesRepo: Repository<TicketsInvoices>,

    @InjectRepository(TicketsItems)
    private ticketsItemsRepo: Repository<TicketsItems>,
  ) { }




  async create(dto: TicketsItemsCreateReqDto): Promise<TicketsItemsReadResDto | any> {

    ////data check

    //
    const invoicesTickets = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: dto.ticketsInvoiceId
      },
    });
    if (!invoicesTickets) {
      throw new BadRequestException({
        message: 'Tickets with this ticketsInvoiceId not found',
      });
    }

    //
    const partsItem = await this.partsItemsRepo.findOne({
      where: {
        id: dto.partsItemId
      },
    });
    if (!partsItem) {
      throw new BadRequestException({
        message: 'Item with this partsItemId not found',
      });
    }


    //
    const obj = await this.ticketsItemsRepo.save(dto);

    const objCreated = await this.ticketsItemsRepo.findOne({
      where: {
        id: obj.id
      },
  
    });
    if (!objCreated) {
      throw new InternalServerErrorException();
    }

    return objCreated;
  }




  async findAll(dto: QueryBulkDto) {
    //
    const repo = this.ticketsItemsRepo;
    const dbTable = 'tickets_items';

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
    const repo = this.ticketsItemsRepo;
    const dbTable = 'tickets_items';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.id = :id`, { id: id })


    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);


    //
    if (!dto.join) {
      
    }

    //
    const data = await query.getOne();
    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }



  async removeOneById(id: number) {

    const obj = await this.ticketsItemsRepo.findOne({
      where: {
        id: id
      },
    });

    if (!obj) {
      throw new NotFoundException();
    }


    ////
    const objDelete = await this.ticketsItemsRepo.delete(id);

    return objDelete;
  }




}