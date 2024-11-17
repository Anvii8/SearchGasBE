import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GasStationsModule } from 'src/gasstations/gasstations.module';
import { UsersModule } from 'src/users/users.module';
import { ValorationsEntity } from './entity/valoration.entity';
import { ValorationsController } from './valorations.controller';
import { ValorationsService } from './services/valorations.service';
import { ValorationsRepository } from './repository/valorations.repository';
import { ValorationDTO } from './models/valorations.dto';

@Module({
  imports: [
    TypeOrmModule.forFeature([ValorationsEntity]),
    GasStationsModule,
    UsersModule,
  ],
  controllers: [ValorationsController],
  providers: [ValorationsRepository, ValorationsService],
  exports: [ValorationsService],
})
export class ValorationModule {}
