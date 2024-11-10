import { Injectable } from '@nestjs/common';
import { GasstationDto } from '../models/gasstation.dto';
import { GasStationRepository } from '../repository/gas-station.repository';

@Injectable()
export class GasstationService {
  constructor(
      private gasolinerasRepository: GasStationRepository,
    ) {}
    
  async findByLocation(location: string): Promise<GasstationDto[]> {
    return await this.gasolinerasRepository.findByLocation(location);
  }
  
  async findByLocationAndFuel(location: string, fuel: string[]): Promise<GasstationDto[]> {   
    return await this.gasolinerasRepository.findByLocationAndFuel(location, fuel);
  }
}
