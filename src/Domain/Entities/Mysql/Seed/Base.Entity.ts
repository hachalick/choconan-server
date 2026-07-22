import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryColumn({
    type: 'bigint',
    transformer: {
      from: (value: string): number => {
        return parseInt(value, 10);
      },
      to: (value: number): number => {
        return value;
      },
    },
  })
  @Generated()
  Id: bigint;

  @Column({
    type: 'uuid',
    nullable: false,
    unique: true,
  })
  @Generated('uuid')
  Guid: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  IsDelete: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  IsActive: boolean;

  @Column({
    type: 'boolean',
    default: false,
  })
  IsHidden: boolean;

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
  CreateDate: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
    unique: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value,
    },
  })
  UpdateDate: Date;
}
