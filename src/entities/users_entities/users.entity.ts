import { ObjectType, Field } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  OneToMany
} from 'typeorm';
import { Customers } from '../customers_entities/customers.entity';
import { Roles } from '../roles_entities/roles.entity';
import { AuthSessionUser } from '../auth_entities/auth.session.entity';

@ObjectType()
@Entity('tb_users')
export class User {
  @Field(() => String)
  @PrimaryGeneratedColumn('uuid')
  idtb_users: string;

  @Column()
  idtb_customers: string;

  @Column()
  idtb_roles: string;

  @Field()
  @Column({ unique: true })
  public_id_users: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Field()
  @Column()
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
  phone: string;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true, nullable: true })
  status: boolean;

  @Field(() => Boolean, { defaultValue: true })
  @Column({ type: 'boolean', default: true })
  first_access: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  last_login_at: Date;

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

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'idtb_customers' })
  customer: Customers;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'idtb_roles' })
  role: Roles;

  @OneToMany(() => AuthSessionUser, (session) => session.user)
  sessions: AuthSessionUser[];

  @BeforeInsert()
  async generatePublicId() {
    const { nanoid } = await import('nanoid');
    this.public_id_users = `USR-${nanoid(10)}`;
  }
}