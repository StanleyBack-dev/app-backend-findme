import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DtoAuthLogoutResponse {
  @Field()
  message: string;
}