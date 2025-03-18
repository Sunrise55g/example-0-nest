import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';


////
import { AppController } from './app.controller';
import { AppService } from './app.service';


////
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { PartsModule } from './parts/parts.module';
import { TicketsModule } from './tickets/tickets.module';



@Module({

  imports: [

    //
    ConfigModule.forRoot({ isGlobal: true }),

    
    //
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/**/*.entity{.js, .ts}'],
        // logging: true,
      }),
    }),


    // for static and media
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: '/uploads',
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
      renderPath: '/static',
    }),

    ////
    AuthModule,
    ProfileModule,
    PartsModule,
    TicketsModule
    
  ],


  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
