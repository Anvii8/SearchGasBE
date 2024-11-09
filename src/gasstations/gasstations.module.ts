import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gasstation } from './entities/gasstation.entity';
import { GasstationsController } from './gasstations.controller';
import { GasstationService } from './services/gasstation.service';
import { GasstationDto } from './models/gasstation.dto';


@Module({
  imports: [TypeOrmModule.forFeature([Gasstation])],
  controllers: [GasstationsController],
  providers: [GasstationDto, Gasstation, GasstationService],
  exports: [GasstationService],
})
export class GasStationsModule {}
