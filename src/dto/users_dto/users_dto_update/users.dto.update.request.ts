import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUsersDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  last_name?: string;

  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  cpf?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field({ nullable: true })
  inactivated_at?: Date;

  @Field({ nullable: true })
  inactivated_by?: number;
}