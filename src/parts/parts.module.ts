import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';



////
//
import { PartsCategories } from './entities/parts.categories.entity';
import { PartsItems } from './entities/parts.items.entity';

//
import { PartsCategoriesCoreController } from './controllers/parts.categories.core.controller';
import { PartsItemsCoreController } from './controllers/parts.items.core.controller';

//
import { PartsCategoriesService } from './services/parts.categories.service';
import { PartsItemsService } from './services/parts.items.service';




@Global()
@Module({

  imports: [
    TypeOrmModule.forFeature([
      PartsCategories,
      PartsItems,
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
    PartsCategoriesCoreController,
    PartsItemsCoreController,
  ],

  providers: [
    PartsCategoriesService, 
    PartsItemsService,
  ],

  exports: [
    PartsCategoriesService, 
    PartsItemsService,
  ],
  
})
export class PartsModule {}
