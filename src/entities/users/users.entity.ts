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
import { Customers } from '../customers/customers.entity';
import { Roles } from '../roles/roles.entity';
import { AuthSessionUser } from '../auth/auth.session.entity';
import { AuthCodes } from '../auth_codes/auth.codes.entity';

@ObjectType()
@Entity('tb_users')
export class Users {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  idtb_users: number;

  @Column()
  idtb_customers: number;

  @Column()
  idtb_roles: number;

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

  @ManyToOne(() => Customers)
  @JoinColumn({ name: 'idtb_customers' })
  customer: Customers;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'idtb_roles' })
  role: Roles;

  @OneToMany(() => AuthSessionUser, (session) => session.user)
  sessions: AuthSessionUser[];

  @OneToMany(() => AuthCodes, (authCode) => authCode.user)
  authCodes: AuthCodes[];

  @BeforeInsert()
  async generatePublicId() {
    const { nanoid } = await import('nanoid');
    this.public_id_users = `USR-${nanoid(10)}`;
  }
}