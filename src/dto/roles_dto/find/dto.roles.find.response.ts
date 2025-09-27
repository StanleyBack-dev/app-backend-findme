import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DtoRolesFindResponse {
  @Field(() => Int)
  idtb_roles: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Boolean)
  status: boolean;

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