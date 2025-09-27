import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class DtoAuthLogoutInput {

  @Field(() => Float, { nullable: true })
  id?: number;
  
}