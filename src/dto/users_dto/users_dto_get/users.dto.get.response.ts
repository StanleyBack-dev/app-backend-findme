import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class GetUsersDto {
  @Field()
  idtb_users: string;

  @Field()
  tenantId: string;

  @Field()
  username: string;
}