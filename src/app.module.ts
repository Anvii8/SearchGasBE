import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GasstationsController } from './gasstations/gasstations.controller';
import { GasstationService } from './gasstations/services/gasstation.service';
import { Gasstation } from './gasstations/entities/gasstation.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Gasstation])],
  controllers: [AppController, GasstationsController],
  providers: [AppService, GasstationService],
})
export class AppModule {}
