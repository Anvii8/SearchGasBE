import { Injectable } from '@nestjs/common';
import { ValorationsRepository } from '../repository/valorations.repository';

@Injectable()
export class ValorationsService {
    constructor(private valorationsRepository: ValorationsRepository){}

    async findByGasStation(gasStationId: number) {
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
    }

    async addValoration(userId: string, gasStationId: number, rating: number, comment: string) {
        try {
            return await this.valorationsRepository.addValoration(userId, gasStationId, rating, comment);
        } catch (error) {
            console.error('Error al añadir la valoración:', error);
            throw new Error('Hubo un error al añadir la valoración');
        }
    }
}
