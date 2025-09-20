import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindRolesInputDto {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: boolean;
}
