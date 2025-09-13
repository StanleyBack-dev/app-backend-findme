import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from '../users_entities/users.entity';

@ObjectType()
@Entity('tb_logs')
export class Logs {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    idtb_logs: number;

    @Field(() => Users, { nullable: true })
    @ManyToOne(() => Users, { nullable: true })
    @JoinColumn({ name: 'idtb_users' })
    user?: Users;

    @Column({ name: 'idtb_users', nullable: true })
    userId?: string;

    @Field()
    @Column({ nullable: true })
    action: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    ip_address: string;

    @Field()
    @Column()
    user_agent: string;

    @Field()
    @Column()
    device_name: string;

    @Field()
    @Column({ nullable: true})
    operation_type: string;

    @Field()
    @Column({ nullable:true })
    operation_name: string;

    @Field()
    @CreateDateColumn()
    created_at: Date;

}