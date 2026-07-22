import { Entity, Column } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('file')
export class FileEntity extends BaseEntity {
  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  Direction: string;
}
