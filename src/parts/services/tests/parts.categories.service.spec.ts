import { Test, TestingModule } from '@nestjs/testing';

//
import { PartsCategoriesService } from '../parts.categories.service';

describe('PartsCategoriesService', () => {
  let service: PartsCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartsCategoriesService],
    }).compile();

    service = module.get<PartsCategoriesService>(PartsCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
