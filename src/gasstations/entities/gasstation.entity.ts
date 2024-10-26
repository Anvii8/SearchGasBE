import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gasstation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  localidad: string;

  @Column()
  direccion: string;

  @Column()
  longitud: string;

  @Column()
  latitud: string;

  @Column()
  fechadatos: string;

  @Column('decimal', { precision: 5, scale: 3 })
  preciogasolina95: number;

  @Column('decimal', { precision: 5, scale: 3 })
  preciogasolina98: number;

  @Column('decimal', { precision: 5, scale: 3 })
  preciodiesel: number;

  @Column('decimal', { precision: 5, scale: 3 })
  preciodieselpremium: number;

  @Column()
  marca: string;

  @Column()
  horario: string;
}
