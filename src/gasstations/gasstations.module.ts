import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasstationService } from './services/gasstation.service';
import { GasStationRepository } from './repository/gas-station.repository';
import { GasstationsController } from './gasstations.controller';
import { Gasstation } from './entities/gasstation.entity';
import { GasstationDto } from './models/gasstation.dto';


@Module({
  imports: [TypeOrmModule.forFeature([Gasstation])],
  controllers: [GasstationsController],
  providers: [GasStationsModule, GasstationDto, GasStationRepository, GasstationService],
  exports: [GasstationService],
})
export class GasStationsModule {}
