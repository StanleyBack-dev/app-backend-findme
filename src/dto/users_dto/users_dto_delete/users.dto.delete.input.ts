import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteUsersInputDto {
  @Field(() => Int)
  id: number;
}