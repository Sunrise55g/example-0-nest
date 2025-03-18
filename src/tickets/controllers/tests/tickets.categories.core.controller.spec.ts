import { Test, TestingModule } from '@nestjs/testing';

//
import { TicketsCategoriesCoreController } from '../tickets.categories.core.controller';
import { TicketsCategoriesService } from '../../services/tickets.categories.service';




describe('TicketsCategoriesCoreController', () => {
  let controller: TicketsCategoriesCoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketsCategoriesCoreController],
      providers: [TicketsCategoriesService],
    }).compile();

    controller = module.get<TicketsCategoriesCoreController>(TicketsCategoriesCoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
