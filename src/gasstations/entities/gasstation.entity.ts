import { FavoritosEntity } from 'src/favorites/entity/favorite.entity';
import { ValorationsEntity } from 'src/valorations/entity/valoration.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('gasstation')
export class GasStationEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  localidad: string;

  @Column()
  direccion: string;

  @Column('decimal', { precision: 8, scale: 6 })
  longitud: number;

  @Column('decimal', { precision: 8, scale: 6 })
  latitud: number;

  @Column()
  fechadatos: string;

  @Column('decimal', { precision: 4, scale: 3 })
  preciogasolina95: number;

  @Column('decimal', { precision: 4, scale: 3 })
  preciogasolina98: number;

  @Column('decimal', { precision: 4, scale: 3 })
  preciodiesel: number;

  @Column('decimal', { precision: 4, scale: 3 })
  preciodieselpremium: number;

  @Column()
  marca: string;

  @Column()
  horario: string;

  @Column('decimal', { precision: 3, scale: 2, default: 0.00 })
  distance: number;

  @Column('decimal', { precision: 3, scale: 2, default: 0.00 })
  travelTime: number;

  @OneToMany(() => FavoritosEntity, (favorito) => favorito.gasStation)
  favoritos: FavoritosEntity[];

  @OneToMany(() => ValorationsEntity, (valoration) => valoration.gasStation)
  valorations: ValorationsEntity[];
}
