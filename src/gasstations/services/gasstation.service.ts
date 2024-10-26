import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gasstation } from '../entities/gasstation.entity';
import { GasstationDto } from '../models/gasstation.dto';

@Injectable()
export class GasstationService {
    constructor(
        @InjectRepository(Gasstation)
        private gasolinerasRepository: Repository<Gasstation>,
      ) {}
    
      async getByLocation(location: string): Promise<GasstationDto[]> {
        return await this.gasolinerasRepository.find({ where: { localidad: location } });
      }
}
