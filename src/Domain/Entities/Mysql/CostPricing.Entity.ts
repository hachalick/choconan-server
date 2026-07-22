import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('cost_pricing')
export class CostPricingEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Name: string;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
    unique: false,
  })
  Price: number;
}
