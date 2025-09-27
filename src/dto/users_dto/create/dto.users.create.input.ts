import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DtoUsersCreateInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  password: string;

  @Field()
  idtb_roles: number;

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