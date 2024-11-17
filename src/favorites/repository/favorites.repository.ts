import { Injectable, NotFoundException } from "@nestjs/common";
import { FavoritosEntity } from "../entity/favorite.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersRepository } from "src/users/repository/users.repository";
import { GasStationRepository } from "src/gasstations/repository/gas-station.repository";

@Injectable()
export class FavoritesRepository {
    constructor(
        @InjectRepository(FavoritosEntity)
        private favoritosRepository: Repository<FavoritosEntity>,
        private userRepository: UsersRepository,
        private gasStationRepository: GasStationRepository
    ) {}

    async addFavorite(userId: string, gasStationId: number) {
        const user = await this.userRepository.getUserById(userId);
        const gasStation = await this.gasStationRepository.findById(gasStationId);
    
        if (!user) {
            throw new NotFoundException('Usuario no encontrado');
        }
      
        if (!gasStation) {
            throw new NotFoundException('Gasolinera no encontrada');
        }
    
        const favorite = new FavoritosEntity(user, gasStation);
        return await this.favoritosRepository.save(favorite);
    }
    
    async removeFavorite(userId: string, gasStationId: number) {
        const favorite = await this.favoritosRepository.findOne({
          where: { user: { userId }, gasStation: { id: gasStationId } },
        });
    
        if (!favorite) {
            throw new NotFoundException('Gasolinera favorita no encontrada');
        }
    
        await this.favoritosRepository.remove(favorite);
    }
    
    async getUserFavorites(userId: string) {        
        return await this.favoritosRepository
        .createQueryBuilder('favorito')
        .innerJoinAndSelect('favorito.gasStation', 'gasStation') // Trae datos de la gasolinera
        .innerJoinAndSelect('favorito.user', 'user') // Trae datos del usuario
        .where('user.userId = :userId', { userId }) // Filtra por ID del usuario
        .getMany();
    }
}