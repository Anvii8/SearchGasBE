import { GasStationEntity } from 'src/gasstations/entities/gasstation.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favoritos')
export class FavoritosEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.favoritos, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => GasStationEntity, (gasStation) => gasStation.favoritos, { onDelete: 'CASCADE' })
  gasStation: GasStationEntity;

  constructor(user: UserEntity, gasStation: GasStationEntity) {
    super();
    this.user = user;
    this.gasStation = gasStation;
  }
}
