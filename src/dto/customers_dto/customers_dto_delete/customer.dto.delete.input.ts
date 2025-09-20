import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteCustomersInputDto {
  @Field(() => Int)
  id: number;
}