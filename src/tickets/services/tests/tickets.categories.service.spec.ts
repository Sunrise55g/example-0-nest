import { Test, TestingModule } from '@nestjs/testing';

//
import { TicketsCategoriesService } from '../tickets.categories.service';

describe('TicketsCategoriesService', () => {
  let service: TicketsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsCategoriesService],
    }).compile();

    service = module.get<TicketsCategoriesService>(TicketsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
