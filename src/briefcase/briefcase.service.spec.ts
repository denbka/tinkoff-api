import { Test, TestingModule } from '@nestjs/testing';
import { BriefcaseService } from './briefcase.service';

describe('BriefcaseService', () => {
  let service: BriefcaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BriefcaseService],
    }).compile();

    service = module.get<BriefcaseService>(BriefcaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
