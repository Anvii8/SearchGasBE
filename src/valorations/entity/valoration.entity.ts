import { GasStationEntity } from 'src/gasstations/entities/gasstation.entity';
import { UserEntity } from 'src/users/entity/user.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('valorations')
export class ValorationsEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => UserEntity, (user) => user.valorations, { onDelete: 'CASCADE' })
  user: UserEntity;

  @ManyToOne(() => GasStationEntity, (gasStation) => gasStation.valorations, { onDelete: 'CASCADE' })
  gasStation: GasStationEntity;
}
