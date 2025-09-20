import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DeleteUsersResponseDto {
  @Field(() => Int)
  idtb_users: number;

  @Field()
  status: boolean;

  @Field({ nullable: true })
  inactivated_at?: Date;

  @Field(() => Int, { nullable: true })
  inactivated_by?: number;
}