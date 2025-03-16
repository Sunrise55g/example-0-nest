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
import { count } from 'console';




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




  async create(dto: TicketsInvoicesCreateReqDto, current: boolean = false, profileUserId?: number):
    Promise<TicketsInvoicesReadResDto | any> {

    //// Profile User from current
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }

    if (current === true && profileUserId) {
      dto.customerUserId = profileUserId;
    }


    if (current === false && !dto.customerUserId && profileUserId) {
      dto.customerUserId = profileUserId;
      this.logger.log(`dto: ${JSON.stringify(dto)}`);
    }

    if (current === false && !dto.customerUserId && !profileUserId) {
      throw new BadRequestException({
        message: 'No customerUserId',
      });
    }


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
    // this.logger.log(`customerUser: ${JSON.stringify(customerUser)}`);


    //
    const obj = await this.ticketsInvoicesRepo.save(dto);

    const objCreated = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: obj.id
      },
      relations: {
        ticketsCategory: true,
        customerUser: {
          profileRole: true
        },
        employerUser: {
          profileRole: true
        },
        ticketsItems: {
          partsItem: {
            partsCategory: true
          }
        }
      },
    });
    if (!objCreated) {
      throw new InternalServerErrorException();
    }


    //
    return objCreated;
  }




  async findMany(dto: QueryBulkDto, current: boolean = false, profileUserId?: number) {

    //// Profile User from current
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }


    ////
    const repo = this.ticketsInvoicesRepo;
    const dbTable = 'tickets_invoices';

    //
    let query = repo
      .createQueryBuilder(dbTable)


    if (current === true) {
      query.where(`${dbTable}.customerUserId = :customerUserId`, { customerUserId: profileUserId });
      query.orWhere(`${dbTable}.employerUserId = :employerUserId`, { employerUserId: profileUserId });
    }

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
      query.leftJoinAndSelect('tickets_invoices.ticketsCategory', 'ticketsCategory');

      query.leftJoinAndSelect('tickets_invoices.customerUser', 'customerUser');
      query.leftJoinAndSelect('customerUser.profileRole', 'customerUser.profileRole');

      query.leftJoinAndSelect('tickets_invoices.employerUser', 'employerUser');
      query.leftJoinAndSelect('employerUser.profileRole', 'employerUser.profileRole');

      query.leftJoinAndSelect('tickets_invoices.ticketsItems', 'ticketsItems');
      query.leftJoinAndSelect('ticketsItems.partsItem', 'partsItem');
      query.leftJoinAndSelect('partsItem.partsCategory', 'partsCategory');
    }

    //
    if (!dto.sort) {
      query.orderBy(`${dbTable}.id`, 'DESC');
    }

    //
    let data = await query.getMany();
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




  async findOne(id: number, dto: QueryDto, current: boolean = false, profileUserId?: number) {

    //// Profile User from current
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }


    ////
    const repo = this.ticketsInvoicesRepo;
    const dbTable = 'tickets_invoices';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.id = :id`, { id: id })


    if (current === true) {
      query.where(`${dbTable}.customerUserId = :customerUserId`, { customerUserId: profileUserId });
      query.orWhere(`${dbTable}.employerUserId = :employerUserId`, { employerUserId: profileUserId });
    }


    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);


    //
    if (!dto.join) {
      query.leftJoinAndSelect('tickets_invoices.ticketsCategory', 'ticketsCategory');

      query.leftJoinAndSelect('tickets_invoices.customerUser', 'customerUser');
      query.leftJoinAndSelect('customerUser.profileRole', 'customerUser.profileRole');

      query.leftJoinAndSelect('tickets_invoices.employerUser', 'employerUser');
      query.leftJoinAndSelect('employerUser.profileRole', 'employerUser.profileRole');

      query.leftJoinAndSelect('tickets_invoices.ticketsItems', 'ticketsItems');
      query.leftJoinAndSelect('ticketsItems.partsItem', 'partsItem');
      query.leftJoinAndSelect('partsItem.partsCategory', 'partsCategory');
    }


    //
    const dataObj = await query.getOne();
    if (!dataObj) {
      throw new NotFoundException();
    }


    //
    return dataObj;
  }




  async updateOneById(id: number, dto: TicketsInvoicesUpdateReqDto, current: boolean = false, profileUserId?: number) {

    //// Profile User from current
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }


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
    if (current !== false) {
      let obj = await this.ticketsInvoicesRepo.findOne({
        where: {
          id: id
        },
      });
      if (!obj) {
        throw new NotFoundException();
      }
    }


    if (current === true) {
      let obj = await this.ticketsInvoicesRepo.findOne({
        where: {
          id: id,
          customerUserId: profileUserId
        }
      });

      if (!obj) {
        obj = await this.ticketsInvoicesRepo.findOne({
          where: {
            id: id,
            employerUserId: profileUserId
          }
        });
      }

      if (!obj) {
        throw new NotFoundException();
      }
    }


    ////
    const objUpdate = await this.ticketsInvoicesRepo.save({ id, ...dto });

    let objUpdated = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: id
      },
      relations: {
        ticketsCategory: true,
        customerUser: {
          profileRole: true
        },
        employerUser: {
          profileRole: true
        },
        ticketsItems: {
          partsItem: {
            partsCategory: true
          }
        }
      },
    });


    //
    return objUpdated;
  }



  async removeOneById(id: number, current: boolean = false, profileUserId?: number) {

    //// Profile User from current
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }


    const obj = await this.ticketsInvoicesRepo.findOne({
      where: {
        id: id
      },
      relations: {
        ticketsCategory: true,
        customerUser: {
          profileRole: true
        },
        employerUser: {
          profileRole: true
        },
        ticketsItems: {
          partsItem: {
            partsCategory: true
          }
        }
      },
    });

    if (!obj) {
      throw new NotFoundException();
    }

    const objDelete = await this.ticketsInvoicesRepo.delete(id);


    //
    return objDelete;
  }



  async totalCount(current: boolean = false, profileUserId?: number) {

    //// check for current user
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }


    //
    const repo = this.ticketsInvoicesRepo;
    const dbTable = 'tickets_invoices';


    let query = repo
      .createQueryBuilder(dbTable)
      .select([`${dbTable}.id, ${dbTable}.createdAt`])


    if (current === true) {
      query.where(`${dbTable}.customerUserId = :customerUserId`, { customerUserId: profileUserId });
      query.orWhere(`${dbTable}.employerUserId = :employerUserId`, { employerUserId: profileUserId });
    }


    let data = await query.getRawMany();
    const count = data.length;

    return count;
  }



  async statsByDays(current: boolean = false, profileUserId?: number) {

    //// check for current user
    if (current === true && !profileUserId) {
      throw new BadRequestException({
        message: 'No profileUserId',
      });
    }


    ////
    const today = new Date();


    ////
    const repo = this.ticketsInvoicesRepo;
    const dbTable = 'tickets_invoices';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.createdAt >= :date`, { date: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000) })
      .select([`${dbTable}.id, ${dbTable}.createdAt`])

    //
    if (current === true) {
      query.where(`${dbTable}.customerUserId = :customerUserId`, { customerUserId: profileUserId });
      query.orWhere(`${dbTable}.employerUserId = :employerUserId`, { employerUserId: profileUserId });
    }

    //
    let data = await query.getRawMany();


    ////
    let statsByDays = [];

    for (let i = 0; i <= 10; i++) {
      const date = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);

      const dateStr = date.toISOString().split('T')[0]
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const name = `${day}.${month}`;

      statsByDays.push({
        date: dateStr,
        name: name,
        count: 0
      });
    }


    for (let statsObj of statsByDays) {

      const statsObjDateStr = statsObj.date;
      // console.log('statsObjDateStr', statsObjDateStr);

      for (let dataObj of data) {

        const dataObjDate = new Date(dataObj.created_at);
        const dataObjDateStr = dataObjDate.toISOString().split('T')[0]
        // console.log('dataObjDateStr', dataObjDateStr)

        if (dataObjDateStr == statsObjDateStr) {
          statsObj.count += 1;
        }
      }

    }

    statsByDays.reverse();
    return statsByDays;
  }


}