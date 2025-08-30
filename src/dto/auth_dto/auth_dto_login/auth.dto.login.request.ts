import { InputType, Field } from '@nestjs/graphql';
import { Roles } from 'src/entities/roles_entities/roles.entity';

@InputType()
export class LoginResquestDto {
  @Field()
  idtb_users: string;

  @Field()
  tenantId: string;

  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => Roles)
  role: Roles;
}