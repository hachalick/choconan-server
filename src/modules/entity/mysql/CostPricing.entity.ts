import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class CostPricingEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  cost_pricing_id: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  name: string;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
  })
  price: number;
}
