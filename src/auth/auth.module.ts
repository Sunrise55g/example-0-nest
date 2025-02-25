import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';


////
import { ProfileModule } from 'src/profile/profile.module';

//
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

//
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';






@Module({

  imports: [
    ProfileModule,
    PassportModule,

    //
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30d' },
      }),
      inject: [ConfigService],
    }),

  ],

  exports: [JwtModule],

  controllers: [
    AuthController,
  ],

  providers: [
    //
    LocalStrategy,
    JwtStrategy,
  
    //
    AuthService,
  ],
  
})
export class AuthModule {}
