import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class DtoAuthLoginInput {
 @Field()
  username: string;

  @Field()
  password: string;
}