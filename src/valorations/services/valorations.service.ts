import { Injectable } from '@nestjs/common';
import { ValorationsRepository } from '../repository/valorations.repository';
import { ValorationDTO } from '../models/valorations.dto';

@Injectable()
export class ValorationsService {
    constructor(private valorationsRepository: ValorationsRepository){}

    async findByGasStation(gasStationId: number) {
        try {
            const valorations = await this.valorationsRepository.findByGasStation(gasStationId);
            return valorations.map(val => ({
                id: val.id,
                rating: val.rating,
                comment: val.comment,
                createdAt: val.createdAt,
                userName: val.user.name,
                userSurname: val.user.surname,
                gasStationId: val.gasStation.id
            }));
        } catch (error) {
            console.error('Error al buscar valoraciones:', error.message);
            throw new Error(`Error al obtener las valoraciones: ${error.message}`);
        }

    }

    async addValoration(userId: string, gasStationId: number, rating: number, comment: string){
        try {
            return await this.valorationsRepository.addValoration(userId, gasStationId, rating, comment);
        } catch (error) {
            console.error('Error al añadir la valoración:', error.message);
            throw new Error(`Hubo un error al añadir la valoración: ${error.message}`);
        }
    }
}
