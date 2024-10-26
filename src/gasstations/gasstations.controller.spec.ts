import { Test, TestingModule } from '@nestjs/testing';
import { GasstationsController } from './gasstations.controller';

describe('GasstationsController', () => {
  let controller: GasstationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GasstationsController],
    }).compile();

    controller = module.get<GasstationsController>(GasstationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
