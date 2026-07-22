import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class OtpEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  otp_id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 20,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  otp: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 3,
    unique: false,
    default: '98',
  })
  national_code: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 12,
    unique: false,
    default: '',
  })
  phone: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  use: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @Column({
    type: 'timestamp',
    nullable: false,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  update_at: Date;
}
