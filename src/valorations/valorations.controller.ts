import { Body, Controller, Get, InternalServerErrorException, Param, Post, UseGuards } from '@nestjs/common';
import { ValorationsService } from './services/valorations.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('valorations')
export class ValorationsController {
    constructor(private valorationsService: ValorationsService){}

    @Post('add')
    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    async addValoration(@Body() { userId, gasStationId, rating, comment }: { userId: string; gasStationId: number; rating:number; comment:string }) {        
        try {
            const valoration = await this.valorationsService.addValoration(userId, gasStationId, rating, comment);            
            return { message: 'Valoración agregada a valorations', valoration };
        } catch (error) {
            throw new InternalServerErrorException('Hubo un error al agregar la valoración');
        }
    }

    @Get('gasStation/:gasStationId')
    @ApiBearerAuth('access_token')
    @UseGuards(AuthGuard('jwt'))
    async findByGasStation(@Param('gasStationId') gasStationId: number) {        
        try {
            const valorations = await this.valorationsService.findByGasStation(gasStationId);
            return valorations;
        } catch (error) {
            throw new InternalServerErrorException('Hubo un error al obtener las valoraciones de la gasolinera');
        }
    }
}
