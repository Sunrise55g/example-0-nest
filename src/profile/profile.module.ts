import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';



////
//
import { ProfileRoles } from 'src/profile/entities/profile.roles.entity';
import { ProfileUsers } from 'src/profile/entities/profile.users.entity';

//
import { ProfileRolesCoreController } from './controllers/profile.roles.core.controller';
import { ProfileUsersCoreController } from './controllers/profile.users.core.controller';
import { ProfileUserCurrentController } from './controllers/profile.users.current.controller';

//
import { ProfileRolesService } from './services/profile.roles.service';
import { ProfileUsersService } from './services/profile.users.service';




@Global()
@Module({

  imports: [
    TypeOrmModule.forFeature([
      ProfileRoles,
      ProfileUsers,
    ]),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),

  ],

  controllers: [
    ProfileRolesCoreController,
    ProfileUsersCoreController,
    ProfileUserCurrentController,
  ],

  providers: [
    ProfileRolesService, 
    ProfileUsersService,
  ],

  exports: [ProfileRolesService, ProfileUsersService],
  
})
export class ProfileModule {}
