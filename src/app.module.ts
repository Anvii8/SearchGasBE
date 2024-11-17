import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GasStationsModule } from './gasstations/gasstations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ValorationModule } from './valorations/valorations.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      autoLoadEntities: true,
    }),
    GasStationsModule,
    UsersModule,
    AuthModule,
    FavoritesModule,
    ValorationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
