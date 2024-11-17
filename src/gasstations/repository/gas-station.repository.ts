import { Repository } from 'typeorm';
import { GasStationEntity } from '../entities/gasstation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GasStationRepository {

  constructor(
    @InjectRepository(GasStationEntity)
    private gasolinerasRepository: Repository<GasStationEntity>,
  ) {}

  async findByLocation(location: string): Promise<GasStationEntity[]> {
    return await this.gasolinerasRepository.find({ where: { localidad: location } });
  }

  async findById(id: number): Promise<GasStationEntity> {    
    return await this.gasolinerasRepository.findOne(id);
  }

  async findByLocationAndFuel(location: string, fuel: string[]): Promise<GasStationEntity[]> {
    const fuelColumnMap: { [key: string]: string } = {
      "Gasolina 95": "preciogasolina95",
      "Gasolina 98": "preciogasolina98",
      "Diesel": "preciodiesel",
      "Diesel Premium": "preciodieselpremium",
    };

    const fuelConditions = fuel.map(fuel => {
      const column = fuelColumnMap[fuel];
      return column ? `${column} > 0.000` : null;
    }).filter(Boolean) as string[];

    const query = this.gasolinerasRepository.createQueryBuilder('gasstation')
      .where('gasstation.localidad = :location', { location });

    if (fuelConditions.length > 0) {
      query.andWhere(fuelConditions.join(' AND '));
    }        
    return await query.getMany();
  }
}
