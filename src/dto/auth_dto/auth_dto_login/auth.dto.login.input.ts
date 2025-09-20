import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class LoginResquestDto {
 @Field()
  username: string;

  @Field()
  password: string;
}