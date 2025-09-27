import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class DtoRolesDeleteInput {
  @Field(() => Int)
  id: number;
}