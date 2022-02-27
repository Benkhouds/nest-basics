import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @JoinTable({ name: 'coffee_flavor' })
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, {
    cascade: ['insert'],
  })
  flavors: Flavor[];
}
