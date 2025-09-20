import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FindUsersInputDto {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  cpf?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: boolean;

  @Field(() => Int, { nullable: true })
  idtb_roles?: number;
}