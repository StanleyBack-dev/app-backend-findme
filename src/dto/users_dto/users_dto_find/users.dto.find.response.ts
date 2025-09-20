import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FindUsersResponseDto {
  @Field(() => Int)
  idtb_users: number;

  @Field()
  public_id_users: string;

  @Field()
  username: string;

  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  cpf: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field(() => Boolean)
  status: boolean;

  @Field(() => Boolean)
  first_access: boolean;

  @Field({ nullable: true })
  last_login_at?: Date;

  @Field(() => Int)
  created_by: number;

  @Field({ nullable: true })
  updated_by?: number;

  @Field({ nullable: true })
  inactivated_by?: number;

  @Field({ nullable: true })
  inactivated_at?: Date;

  @Field()
  created_at: Date;

  @Field({ nullable: true })
  updated_at?: Date;
}
