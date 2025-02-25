import { Test, TestingModule } from '@nestjs/testing';

//
import { ProfileRolesService } from '../profile.roles.service';

describe('ProfileRolesService', () => {
  let service: ProfileRolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileRolesService],
    }).compile();

    service = module.get<ProfileRolesService>(ProfileRolesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
