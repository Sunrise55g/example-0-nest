import { Test, TestingModule } from '@nestjs/testing';

//
import { ProfileRolesCoreController } from '../profile.roles.core.controller';
import { ProfileRolesService } from '../../services/profile.roles.service';




describe('ProfileRolesCoreController', () => {
  let controller: ProfileRolesCoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileRolesCoreController],
      providers: [ProfileRolesService],
    }).compile();

    controller = module.get<ProfileRolesCoreController>(ProfileRolesCoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
