import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class LogoutRequestDto {

  @Field(() => Float, { nullable: true })
  id?: number;
  
}