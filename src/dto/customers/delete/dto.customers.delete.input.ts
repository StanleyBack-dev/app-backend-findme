import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DtoCustomersDeleteInput {
  @Field(() => Int)
  id: number;
}