import { Test, TestingModule } from '@nestjs/testing';
import { CoveredCallsService } from './covered-calls.service';

describe('CoveredCallsService', () => {
  let service: CoveredCallsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoveredCallsService],
    }).compile();

    service = module.get<CoveredCallsService>(CoveredCallsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
