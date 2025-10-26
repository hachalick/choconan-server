import { Entity, PrimaryColumn, Generated, Column } from 'typeorm';

@Entity()
export class ImageEntity {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  image_id: string;

  @Column({
    type: 'varchar',
    length: 600,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  dir: string;
}
