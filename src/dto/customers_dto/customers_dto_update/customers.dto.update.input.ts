import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateCustomersDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  cpf?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  contact?: string;

  @Field({ nullable: true })
  updated_by?: number;

  @Field({ nullable: true })
  status?: boolean;

  @Field({ nullable: true })
  image?: string;

  @Field({ nullable: true })
  inactivated_at?: Date;

  @Field({ nullable: true })
  inactivated_by?: number;
}