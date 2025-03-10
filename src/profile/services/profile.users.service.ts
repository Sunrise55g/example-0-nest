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
import { ProfileRoles } from 'src/profile/entities/profile.roles.entity';
import { ProfileUsers } from 'src/profile/entities/profile.users.entity';

//
import { ProfileUsersCreateReqDto } from '../dto/profile.users.create.dtos';
import { ProfileUsersReadResDto, ProfileUsersReadBulkResDto } from '../dto/profile.users.read.dtos';
import { ProfileUsersUpdateReqDto, ProfileUsersUpdatePasswordReqDto } from '../dto/profile.users.update.dtos';




@Injectable()
export class ProfileUsersService {

  profileRepo: any;
  private readonly logger = new Logger(ProfileUsersService.name);

  constructor(
    //
    @InjectRepository(ProfileRoles)
    private roleRepository: Repository<ProfileRoles>,
    @InjectRepository(ProfileUsers)
    private profileUsersRepo: Repository<ProfileUsers>,
  ) { }



  // for auth module
  async findOneById(id: number) {

    const user = await this.profileUsersRepo
      .createQueryBuilder('profile_users')
      .addSelect('profile_users.passwordHash')
      .where('profile_users.id = :id', { id: id })

      // for roles
      .leftJoinAndSelect(
        'profile_users.profileRole', 'profileRole',
      )

      .getOne();


    return user;
  }




  async findOneByLogin(username: string) {

    const user = await this.profileUsersRepo
      .createQueryBuilder('profile_users')
      .addSelect('profile_users.passwordHash')
      .where('profile_users.username = :username', { username: username })

      // for roles
      .leftJoinAndSelect(
        'profile_users.profileRole', 'profileRole',
      )

      .getOne();


    return user;
  }




  async findOneByEmail(email: string) {
    if (email) {
      email.toLowerCase();
    }

    const user = await this.profileUsersRepo
      .createQueryBuilder('profile_users')
      .addSelect('profile_users.passwordHash')
      .where('profile_users.email = :email', { email: email })

      // for roles
      .leftJoinAndSelect(
        'profile_users.profileRole', 'profileRole',
      )
      .getOne();


    return user;
  }




  async findOneByPhone(phone: string) {
    const user = await this.profileUsersRepo
      .createQueryBuilder('profile_users')
      .addSelect('profile_users.passwordHash')
      .where('profile_users.phone = :phone', { phone: phone })

      // for roles
      .leftJoinAndSelect(
        'profile_users.profileRole', 'profileRole',
      )

      .getOne();

    return user;
  }


  // simple
  async create(dto: ProfileUsersCreateReqDto): Promise<ProfileUsersReadResDto> {

    //// email sanitizer
    if (typeof dto['email'] !== 'undefined') {
      dto.email.toLowerCase();
    }


    //// user data check
    if (dto.profileRoleId) {
      const role = await this.roleRepository.findOne({
        where: { id: dto.profileRoleId },
      });
      if (!role) {
        throw new BadRequestException({
          message: 'Role with this profileRoleId not found',
        });
      }
    }

    if (dto.username) {
      const existLogin = await this.profileUsersRepo.findOne({
        where: { username: dto.username },
      });
      if (existLogin) {
        throw new BadRequestException({
          message: 'User with this Username is exist.',
        });
      }
    }

    if (typeof dto['email'] !== 'undefined') {
      const existEmail = await this.profileUsersRepo.findOne({
        where: { email: dto.email },
      });
      if (existEmail) {
        throw new BadRequestException({
          message: 'User with this Email is exist.',
        });
      }
    }

    if (typeof dto['phone'] !== 'undefined') {
      const existPhone = await this.profileUsersRepo.findOne({
        where: { phone: dto.phone },
      });
      if (existPhone) {
        throw new BadRequestException({
          message: 'User with this Pnone Number is exist.',
        });
      }
    }


    //// Create profile user
    const { password, ...dataAdded } = dto;

    const userCreate = await this.profileUsersRepo.save({
      ...dataAdded,
      passwordHash: await argon2.hash(password),
    });

    const userCreated = await this.profileUsersRepo.findOne({
      where: { id: userCreate.id },
      relations: {
        profileRole: true,
      },
    });
    if (!userCreated) {
      throw new InternalServerErrorException();
    }

    return userCreated;
  }




  async findMany(dto?: QueryBulkDto) {
    //
    const repo = this.profileUsersRepo;
    const dbTable = 'profile_users';

    //
    let query = repo
      .createQueryBuilder(dbTable)

    // params from query
    if (!dto) {
      query = fieldsHandler(dto, dbTable, query);
      query = searchHandler(dto, dbTable, query);
      query = filterHandler(dto, dbTable, query);
      query = sortHandler(dto, dbTable, query);
      query = joinHandler(dto, dbTable, query);
    }

    // pagination
    const total = await query.getCount();
    const limit = dto.limit | 10;
    let offset = dto.offset | 0;
    let page = dto.page | 1;

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
        'profile_users.profileRole', 'profileRole'
      );
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
    const repo = this.profileUsersRepo;
    const dbTable = 'profile_users';

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
        'profile_users.profileRole', 'profileRole'
      );
    }

    //
    const data = await query.getOne();
    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }




  async updateOneById(id: number, dto: ProfileUsersUpdateReqDto) {
    if (typeof dto['email'] !== 'undefined') {
      dto.email.toLowerCase();
    }

    if (dto.profileRoleId) {
      const role = await this.roleRepository.findOne({
        where: { id: dto.profileRoleId },
      });
      if (!role) {
        throw new BadRequestException({
          message: 'Role with this profileRoleId not found',
        });
      }
    }

    const user = await this.profileUsersRepo.findOne({
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException();
    }

    if (dto.username) {
      if (dto.username !== user.username) {
        const existLogin = await this.profileUsersRepo.findOne({
          where: { username: dto.username },
        });
        if (existLogin) {
          throw new BadRequestException({
            message: 'User with this Username is exist.',
          });
        }
      }
    }

    if (typeof dto['email'] !== 'undefined') {
      if (dto.email !== user.email) {
        const existEmail = await this.profileUsersRepo.findOne({
          where: { email: dto.email },
        });
        if (existEmail) {
          throw new BadRequestException({
            message: 'User with this Email is exist.',
          });
        }
      }
    }

    let updateUserData: any;
    if (dto.password) {
      const { password, ...updateData } = dto;
      const passwordHash = await argon2.hash(password);
      updateUserData = { passwordHash, ...updateData };
    } else {
      updateUserData = dto;
    }

    //
    const userUpdate = await this.profileUsersRepo.save({ id, ...updateUserData });

    const userUpdated = await this.profileUsersRepo.findOne({
      where: { id: id },
      relations: {
        profileRole: true,
      },
    });

    return userUpdated;
  }




  async updatePassword(id: number, dto: ProfileUsersUpdatePasswordReqDto) {

    ////
    const user = await this.profileUsersRepo
      .createQueryBuilder('profile_users')
      .addSelect('profile_users.passwordHash')
      .where('profile_users.id = :id', { id: id })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found!');
    }


    ////
    const passwordIsMatch = await argon2.verify(user.passwordHash, dto.oldPassword);

    if (!passwordIsMatch) {
      throw new UnauthorizedException('Old password is incorrect!');
    }


    ////
    const passwordHash = await argon2.hash(dto.newPassword);

    const userUpdate = await this.profileUsersRepo.save({
      id: user.id,
      passwordHash: passwordHash
    });


    ////
    const userUpdated = await this.profileUsersRepo.findOne({
      where: { id: id },
      relations: {
        profileRole: true,
      },
    });


    return userUpdated;
  }




  async removeOneById(id: number) {

    const user = await this.profileUsersRepo.findOne({
      where: { id: id },
      relations: {
        profileRole: true
      },
    });

    if (!user) {
      throw new NotFoundException();
    }


    ////
    const userUpdate = await this.profileUsersRepo.delete(id);


    return user;
  }




}