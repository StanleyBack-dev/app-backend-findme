import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LogoutRequestDto {

  @Field()
  id: number;
}