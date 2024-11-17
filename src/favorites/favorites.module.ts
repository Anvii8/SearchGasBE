import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritosEntity } from './entity/favorite.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './repository/favorites.repository';
import { FavoritesService } from './services/favorites.service';
import { GasStationsModule } from 'src/gasstations/gasstations.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoritosEntity]),
    GasStationsModule,
    UsersModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesRepository, FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
