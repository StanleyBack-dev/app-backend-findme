import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DeleteRolesInputDto {
  @Field(() => Int)
  id: number;
}