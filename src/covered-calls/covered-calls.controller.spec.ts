import { Test, TestingModule } from '@nestjs/testing';
import { CoveredCallsController } from './covered-calls.controller';

describe('CoveredCallsController', () => {
  let controller: CoveredCallsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoveredCallsController],
    }).compile();

    controller = module.get<CoveredCallsController>(CoveredCallsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
