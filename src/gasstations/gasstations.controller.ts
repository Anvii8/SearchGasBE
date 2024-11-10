import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GasstationService } from './services/gasstation.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GasstationDto } from './models/gasstation.dto';

@Controller('gasstations')
export class GasstationsController {
  constructor(private readonly gasolinerasService: GasstationService) {}

  @Get(':location')
  async getByLocation(@Param('location') location: string): Promise<GasstationDto[]> {
    return await this.gasolinerasService.findByLocation(location);
  }
  
  @Get(':location/:fuel')
  @ApiBearerAuth('access_token')
  @UseGuards(AuthGuard('jwt'))
  async getByLocationFuel(@Param('location') location: string, @Param('fuel') fuel: string): Promise<GasstationDto[]> {
    const fuelArray = fuel.split(',');
    return await this.gasolinerasService.findByLocationAndFuel(location, fuelArray);
  }
}
