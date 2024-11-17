import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from '../repository/favorites.repository';

@Injectable()
export class FavoritesService {
    constructor(private favoritesRepository: FavoritesRepository){}

    async addFavorite(userId: string, gasStationId: number) {
        return await this.favoritesRepository.addFavorite(userId, gasStationId);
    }
    
    async removeFavorite(userId: string, gasStationId: number) {
        return await this.favoritesRepository.removeFavorite(userId, gasStationId);
    }
    
    async getUserFavorites(userId: string) {
        const favorites = await this.favoritesRepository.getUserFavorites(userId);

        return favorites.map(fav => ({
            id: fav.id,
            userId: fav.user.userId,
            gasStation: fav.gasStation,
        }));
    }
}
