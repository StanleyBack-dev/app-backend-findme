import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Users } from "../users/users.entity";

@ObjectType()
@Entity('tb_auth_codes')
export class AuthCodes {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    idtb_auth_codes: number;

    @Field(() => Int)
    @Column()
    idtb_users: number;

    @Field()
    @Column()
    code: string;

    @Field()
    @Column()
    type_code: string;

    @Field()
    @Column({ default: false })
    used: boolean;

    @Field()
    @CreateDateColumn()
    created_at: Date;

    @Field({ nullable: true })
    @Column({ nullable: true })
    expires_at: Date;

    @ManyToOne(() => Users, (user) => user.authCodes)
    @JoinColumn({ name: 'idtb_users' })
    user: Users;
}