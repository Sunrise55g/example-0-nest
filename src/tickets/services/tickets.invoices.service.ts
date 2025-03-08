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




@Injectable()
export class TicketsInvoicesService {

  profileRepo: any;
  private readonly logger = new Logger(TicketsInvoicesService.name);

  constructor(

    //
    @InjectRepository(ProfileUsers)
    private profileUsersRepo: Repository<ProfileUsers>,

    //
    @InjectRepository(PartsItems)
    private partsItemsRepo: Repository<PartsItems>,

    //
    @InjectRepository(TicketsCategories)
    private ticketsCategoriesRepo: Repository<TicketsCategories>,
    @InjectRepository(TicketsInvoices)
    private ticketsInvoicesRepo: Repository<TicketsInvoices>,
  ) { }




  async create(dto: TicketsInvoicesCreateReqDto): Promise<TicketsInvoicesReadResDto | any> {

    ////data check

    //
    const invoicesCategory = await this.ticketsCategoriesRepo.findOne({
      where: {
        id: dto.ticketsCategoryId
      },
    });
    if (!invoicesCategory) {
      throw new BadRequestException({
        message: 'Category with this ticketsCategoryId not found',
      });
    }

    //
    const customerUser = await this.profileUsersRepo.findOne({
      where: {
        id: dto.customerUserId
      },
    });
    if (!customerUser) {
      throw new BadRequestException({
        message: 'Customer with this customerUserId not found',
      });
    }

    
    //
    const obj = await this.ticketsInvoicesRepo.save(dto);

    const objCreated = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: obj.id
      },
      relations: {
        // profile_users: true,
        tickets_categories: true,
      },
    });
    if (!objCreated) {
      throw new InternalServerErrorException();
    }

    return objCreated;
  }




  async findAll(dto: QueryBulkDto) {
    //
    const repo = this.ticketsInvoicesRepo;
    const dbTable = 'tickets_invoices';

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
      // query.leftJoinAndSelect('tickets_invoices.tickets_categories', 'tickets_categories');
  
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
    const repo = this.ticketsInvoicesRepo;
    const dbTable = 'tickets_invoices';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.id = :id`, { id: id })


    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);


    //
    if (!dto.join) {
      query.leftJoinAndSelect('tickets_invoices.tickets_categories', 'tickets_categories');
    }

    //
    const data = await query.getOne();
    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }




  async updateOneById(id: number, dto: TicketsInvoicesUpdateReqDto) {

    //// check data
    //
    if (dto.ticketsCategoryId) {
      const category = await this.ticketsCategoriesRepo.findOne({
        where: {
          id: dto.ticketsCategoryId
        },
      });
      if (!category) {
        throw new BadRequestException({
          message: 'Category with this ticketsCategoryId not found',
        });
      }
    }

    //
    if (dto.customerUserId) {
      const customerUser = await this.profileUsersRepo.findOne({
        where: {
          id: dto.customerUserId
        },
      });
      if (!customerUser) {
        throw new BadRequestException({
          message: 'Customer with this customerUserId not found',
        });
      }
    }


    //
    if (dto.employerUserId) {
      const employerUser = await this.profileUsersRepo.findOne({
        where: {
          id: dto.employerUserId
        },
      });
      if (!employerUser) {
        throw new BadRequestException({
          message: 'Employer with this employerUserId not found',
        });
      }
    }

    
    ////
    const obj = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: id
      },
    });
    if (!obj) {
      throw new NotFoundException();
    }

    //
    const objUpdate = await this.ticketsInvoicesRepo.save({ id, ...dto });

    const objUpdated = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: id
      },
      relations: {
        tickets_categories: true,
        // profile_users: true,
      },
    });

    return objUpdated;
  }



  async removeOneById(id: number) {

    const obj = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: id
      },
      relations: {
        tickets_categories: true
      },
    });

    if (!obj) {
      throw new NotFoundException();
    }


    ////
    const objDelete = await this.ticketsInvoicesRepo.delete(id);

    return objDelete;
  }




}