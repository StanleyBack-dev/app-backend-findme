import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FindCustomersInputDto {
  @Field(() => Int, { nullable: true })
  idtb_customers?: number;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  cpf?: string;

  @Field(() => Boolean, { nullable: true })
  status?: boolean;
}
