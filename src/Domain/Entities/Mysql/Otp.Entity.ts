import { Column, Entity } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('otp')
export class OtpEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  Otp: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 3,
    unique: false,
    default: '98',
  })
  NationalCode: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 12,
    unique: false,
    default: '',
  })
  Phone: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  IsUse: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value,
    },
  })
  ExpireDate: Date;
}
