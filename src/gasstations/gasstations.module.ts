import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasStationEntity } from './entities/gasstation.entity';
import { GasstationService } from './services/gasstation.service';
import { GasStationRepository } from './repository/gas-station.repository';
import { GasstationsController } from './gasstations.controller';
import { GasstationDto } from './models/gasstation.dto';

@Module({
  imports: [TypeOrmModule.forFeature([GasStationEntity])],
  controllers: [GasstationsController],
  providers: [GasstationService, GasStationRepository, GasstationDto],
  exports: [GasstationService, GasStationRepository],
})
export class GasStationsModule {}
