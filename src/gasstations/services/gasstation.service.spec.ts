import { Test, TestingModule } from '@nestjs/testing';
import { GasstationService } from './gasstation.service';

describe('GasstationService', () => {
  let service: GasstationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GasstationService],
    }).compile();

    service = module.get<GasstationService>(GasstationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
