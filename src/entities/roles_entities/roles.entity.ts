import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity('tb_roles')
export class Roles {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  idtb_roles: string;

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
  created_by: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  updated_by: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  inactivated_by: string;

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
