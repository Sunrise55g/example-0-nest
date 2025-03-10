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
import { ProfileRoles } from 'src/profile/entities/profile.roles.entity';
import { ProfileUsers } from 'src/profile/entities/profile.users.entity';

//
import { ProfileRolesCreateReqDto} from '../dto/profile.roles.create.dtos';
import { ProfileRolesReadResDto, ProfileRolesReadBulkResDto } from '../dto/profile.roles.read.dtos';
import { ProfileRolesUpdateReqDto } from '../dto/profile.roles.update.dtos';





@Injectable()
export class ProfileRolesService {
  constructor(
    @InjectRepository(ProfileRoles)
    private roleRepository: Repository<ProfileRoles>,
  ) {}



  async create(dto: ProfileRolesCreateReqDto) {
    const role = await this.roleRepository.save(dto);
    return role;
  }




  async findMany(dto: QueryBulkDto) {
    //
    const repo = this.roleRepository;
    const dbTable = 'profile_roles';

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
    const repo = this.roleRepository;
    const dbTable = 'profile_roles';

    //
    let query = repo
      .createQueryBuilder(dbTable)
      .where(`${dbTable}.id = :id`, { id: id })

    // params from query
    query = fieldsHandler(dto, dbTable, query);
    query = joinHandler(dto, dbTable, query);

    //
    const data = await query.getOne();
    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }




  async updateOneById(id: number, dto: ProfileRolesUpdateReqDto) {

    const role = await this.roleRepository.findOne({
      where: { 
        id: id
      },
    });
    if (!role) {
      throw new NotFoundException();
    }

    const roleUpdate = await this.roleRepository.save({ id, ...dto });

    const roleUpdated = await this.roleRepository.findOne({
      where: { id: id },
    });

    return roleUpdated;
  }




  async removeOneById(id: number) {

    const role = await this.roleRepository.findOne({
      where: { 
        id: id, 
      },
    });
    if (!role) {
      throw new NotFoundException();
    }

    const roleUpdate = await this.roleRepository.delete(id);
    
    return role;
  }

  
}
