import { Entity, Column } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity.js';

@Entity('file')
export class FileEntity extends BaseEntity {
  //#region properties

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  Direction: string;

  //#endregion
}
