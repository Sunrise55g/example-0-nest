import { Test, TestingModule } from '@nestjs/testing';

//
import { PartsCategoriesCoreController } from '../parts.categories.core.controller';
import { PartsCategoriesService } from '../../services/parts.categories.service';




describe('PartsCategoriesCoreController', () => {
  let controller: PartsCategoriesCoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartsCategoriesCoreController],
      providers: [PartsCategoriesService],
    }).compile();

    controller = module.get<PartsCategoriesCoreController>(PartsCategoriesCoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
