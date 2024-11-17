import { Test, TestingModule } from '@nestjs/testing';
import { ValorationsController } from './valorations.controller';

describe('ValorationsController', () => {
  let controller: ValorationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ValorationsController],
    }).compile();

    controller = module.get<ValorationsController>(ValorationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
