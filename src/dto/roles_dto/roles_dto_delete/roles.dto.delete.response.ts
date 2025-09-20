import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeleteRolesResponseDto {
  @Field(() => Int)
  idtb_roles: number;

  @Field()
  status: boolean;

  @Field({ nullable: true })
  inactivated_at?: Date;

  @Field(() => Int, { nullable: true })
  inactivated_by?: number;
}