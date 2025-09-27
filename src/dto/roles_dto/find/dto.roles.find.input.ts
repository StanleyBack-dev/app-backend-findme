import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class DtoRolesFindInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  status?: boolean;
}
