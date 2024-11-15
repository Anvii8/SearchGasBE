import { EntityRepository, Repository } from 'typeorm';
import { Gasstation } from '../entities/gasstation.entity';
import { InjectRepository } from '@nestjs/typeorm';

@EntityRepository(Gasstation)
export class GasStationRepository {

  constructor(
    @InjectRepository(Gasstation)
    private gasolinerasRepository: Repository<Gasstation>,
  ) {}

  async findByLocation(location: string): Promise<Gasstation[]> {
    return await this.gasolinerasRepository.find({ where: { localidad: location } });
  }

  async findById(id: number): Promise<Gasstation> {    
    return await this.gasolinerasRepository.findOne(id);
  }

  async findByLocationAndFuel(location: string, fuel: string[]): Promise<Gasstation[]> {
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
      query.andWhere(fuelConditions.join(' OR '));
    }

    return await query.getMany();
  }
}
