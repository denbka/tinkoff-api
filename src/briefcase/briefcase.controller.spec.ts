import { Test, TestingModule } from '@nestjs/testing';
import { BriefcaseController } from './briefcase.controller';
import { BriefcaseService } from './briefcase.service';

describe('BriefcaseController', () => {
  let controller: BriefcaseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BriefcaseController],
      providers: [BriefcaseService],
    }).compile();

    controller = module.get<BriefcaseController>(BriefcaseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
