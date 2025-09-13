import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users_entities/users.entity';

@ObjectType()
@Entity('tb_users_sessions')
export class AuthSessionUser {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    idtb_users_sessions: number;

    @Field(() => String)
    @Column()
    idtb_users: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.sessions, { eager: false })
    @JoinColumn({ name: 'idtb_users' })
    user: User;

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    access_token: string | null;

    @Field(() => String, { nullable: true })
    @Column({ type: 'text', nullable: true })
    refresh_token: string | null;

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
    @Column({ default: false })
    is_revoked: boolean;

    @Field()
    @Column({ default: true })
    session_active: boolean;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    refresh_token_expires_at: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    revoked_at: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    last_used_at: Date;

}