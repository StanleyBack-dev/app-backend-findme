import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCustomersDto {
  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  cpf: string;

  @Field()
  email: string;

  @Field()
  contact: string;

  @Field()
  created_by: string;

  @Field()
  image: string;

}