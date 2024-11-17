import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GasstationService } from './services/gasstation.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GasstationDto } from './models/gasstation.dto';

@Controller('gasstations')
export class GasstationsController {
  constructor(private readonly gasolinerasService: GasstationService) {}

  @Get('location/:location')
  async getByLocation(@Param('location') location: string): Promise<GasstationDto[]> {
    return await this.gasolinerasService.getGasStationsByLocation(location);
  }

  @Get('id/:id')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getById(@Param('id') id: number): Promise<GasstationDto> {    
    return await this.gasolinerasService.findById(id);
  }
  
  @Get('location/:location/fuel/:fuel')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getByLocationFuel(@Param('location') location: string, @Param('fuel') fuel: string): Promise<GasstationDto[]> {
    const fuelArray = fuel.split(',');
    return await this.gasolinerasService.findByLocationAndFuel(location, fuelArray);
  }

  @Get('locations')
  async getAllLocations(): Promise<string[]> {
    return await this.gasolinerasService.getAllLocations();
  }
}
