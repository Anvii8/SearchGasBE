import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FavoritesService } from './services/favorites.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritosService: FavoritesService) {}

    @Post('add')
    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    async addFavorite(@Body() { userId, gasStationId }: { userId: string; gasStationId: number }) {        
        try {
            const favorite = await this.favoritosService.addFavorite(userId, gasStationId);
            return { message: 'Gasolinera agregada a favoritos', favorite };
        } catch (error) {
            throw new Error('Hubo un error al agregar la gasolinera a favoritos');
        }
    }

    @Delete('user/:userId/gasStation/:gasStationId')
    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    async removeFavorite(@Param('userId') userId: string, @Param('gasStationId') gasStationId: number) {
        try {
            await this.favoritosService.removeFavorite(userId, gasStationId);
            return { message: 'Gasolinera eliminada de favoritos' };
        } catch (error) {
            throw new Error('Hubo un error al eliminar la gasolinera de favoritos');
        }
    }

    @Get('user/:userId')
    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    async getUserFavorites(@Param('userId') userId: string) {        
        try {
            const favorites = await this.favoritosService.getUserFavorites(userId);           
            return favorites;
        } catch (error) {
            throw new Error('Hubo un error al obtener las gasolineras favoritas');
        }
    }
}
