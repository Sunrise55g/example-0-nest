import { forwardRef, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


////
import { ProfileUsers } from 'src/profile/entities/profile.users.entity';


////
import { PartsModule } from 'src/parts/parts.module';
import { PartsItems } from 'src/parts/entities/parts.items.entity';


////
//
import { TicketsCategories } from './entities/tickets.categories.entity';
import { TicketsInvoices } from './entities/tickets.invoices.entity';
import { TicketsItems } from './entities/tickets.items.entity';

//
import { TicketsCategoriesCoreController } from './controllers/tickets.categories.core.controller';
import { TicketsInvoicesCoreController } from './controllers/tickets.invoices.core.controller';
import { TicketsInvoicesCurrentController } from './controllers/tickets.invoices.current.controller';
import { TicketsItemsCoreController } from './controllers/tickets.items.core.controller';
import { TicketsItemsCurrentController } from './controllers/tickets.items.current.controller';

//
import { TicketsCategoriesService } from './services/tickets.categories.service';
import { TicketsInvoicesService } from './services/tickets.invoices.service';
import { TicketsItemsService } from './services/tickets.items.service';




@Global()
@Module({

  imports: [

    PartsModule,
    
    TypeOrmModule.forFeature([
      PartsItems,
      ProfileUsers,
      TicketsCategories,
      TicketsInvoices,
      TicketsItems
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
    TicketsCategoriesCoreController,
    TicketsInvoicesCoreController,
    TicketsInvoicesCurrentController,
    TicketsItemsCoreController,
    TicketsItemsCurrentController
  ],

  providers: [
    TicketsCategoriesService, 
    TicketsInvoicesService,
    TicketsItemsService
  ],

  exports: [
    TicketsCategoriesService, 
    TicketsInvoicesService,
    TicketsItemsService
  ],
  
})
export class TicketsModule {}
