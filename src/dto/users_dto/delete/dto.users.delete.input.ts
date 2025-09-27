import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DtoUsersDeleteInput {
  @Field(() => Int)
  id: number;
}