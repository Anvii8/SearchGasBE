import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersRepository } from "src/users/repository/users.repository";
import { GasStationRepository } from "src/gasstations/repository/gas-station.repository";
import { ValorationsEntity } from "../entity/valoration.entity";

@Injectable()
export class ValorationsRepository {
    constructor(
        @InjectRepository(ValorationsEntity)
        private valorationsRepository: Repository<ValorationsEntity>,
        private userRepository: UsersRepository,
        private gasStationRepository: GasStationRepository
    ) {}

    async findByGasStation(gasStationId: number): Promise<ValorationsEntity[]> {
        return await this.valorationsRepository.find({
          where: { gasStation: { id: gasStationId } },
          relations: ['user', 'gasStation']
        });
    }

    async addValoration(userId: string, gasStationId: number, rating: number, comment: string): Promise<ValorationsEntity> {
        const user = await this.userRepository.getUserById(userId);
        const gasStation = await this.gasStationRepository.findById(gasStationId);

        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
      
        if (!gasStation) {
            throw new NotFoundException('Gasolinera no encontrada');
        }
        const newValoration = this.valorationsRepository.create({
            user,
            gasStation,
            rating,
            comment,
        });
    
        return await this.valorationsRepository.save(newValoration);
    }
}