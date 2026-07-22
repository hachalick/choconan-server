import { Entity, Column } from 'typeorm';
import { BaseEntity } from './Seed/Base.Entity';

@Entity('blog')
export class BlogEntity extends BaseEntity {
  @Column({
    type: 'boolean',
    default: false,
  })
  Publish: boolean;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  MetaTitle: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  ShortDescription: string;

  @Column({
    type: 'varchar',
    length: 250,
    nullable: true,
    default: '',
    unique: false,
    charset: 'utf8',
  })
  title: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  SrcBanner: string;

  @Column({ type: 'text', nullable: true, unique: false, charset: 'utf8' })
  Text: string;
}
