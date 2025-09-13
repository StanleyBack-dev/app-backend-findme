import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetUsersDto {
  @Field()
  idtb_users: number;

  @Field()
  tenantId: number;

  @Field()
  username: string;
}