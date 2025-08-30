import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUsersDto {
  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  name: string;

  @Field()
  last_name: string;

  @Field()
  cpf: string;

  @Field()
  email: string;

  @Field()
  phone: string;
  
}