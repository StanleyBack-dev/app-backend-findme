import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('tb_roles')
export class Roles {
  @Field()
  @PrimaryGeneratedColumn()
  idtb_roles: number;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true, nullable: true })
  status: boolean;

  @Field()
  @Column()
  created_by: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updated_by: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  inactivated_by: number;

  @Field({ nullable: true })
  @Column({ nullable: true })
  inactivated_at: Date;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field({ nullable: true })
  @UpdateDateColumn({ nullable: true })
  updated_at: Date;
}
