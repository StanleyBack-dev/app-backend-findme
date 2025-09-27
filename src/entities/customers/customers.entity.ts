import { ObjectType,Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert  } from "typeorm";
import { Address } from "./address.customers.entity";

@ObjectType()
@Entity('tb_customers')
export class Customers {
  @Field()
  @PrimaryGeneratedColumn()
  idtb_customers: number;

  @Field()
  @Column({ unique: true })
  public_id_customers: string;

  @Field()
  @Column({ unique: true })
  name: string;

  @Field()
  @Column()
  last_name: string;

  @Field()
  @Column({ unique: true })
  cpf: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column()
  contact: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  image_url: string;

  @Field(() => Address, { nullable: true })
  @Column({ type: 'json', nullable: true })
  address: Address;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
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

  @BeforeInsert()
  async generatePublicId() {
    const { nanoid } = await import('nanoid');
    this.public_id_customers = `CUS-${nanoid(10)}`;
  }
}