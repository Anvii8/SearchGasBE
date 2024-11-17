import { Injectable } from '@nestjs/common';
import { GasstationDto } from '../models/gasstation.dto';
import { GasStationRepository } from '../repository/gas-station.repository';

@Injectable()
export class GasstationService {
  constructor(
      private gasolinerasRepository: GasStationRepository,
    ) {}
    
  async getGasStationsByLocation(location: string): Promise<GasstationDto[]> {
    return await this.gasolinerasRepository.findByLocation(location);
  }

  async findById(id: number): Promise<GasstationDto> {
    return await this.gasolinerasRepository.findById(id);
  }
  
  async findByLocationAndFuel(location: string, fuel: string[]): Promise<GasstationDto[]> {   
    return await this.gasolinerasRepository.findByLocationAndFuel(location, fuel);
  }

  async getAllLocations(): Promise<string[]> {   
    return await this.gasolinerasRepository.getAllLocations();
  }
}
