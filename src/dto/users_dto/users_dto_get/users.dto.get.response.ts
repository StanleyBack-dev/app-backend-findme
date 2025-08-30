import { ObjectType, Field } from '@nestjs/graphql';
import { Roles } from 'src/entities/roles_entities/roles.entity';

@ObjectType()
export class GetUsersDto {
  @Field()
  idtb_users: string;

  @Field()
  tenantId: string;

  @Field()
  username: string;

  @Field(() => Roles)
  role: Roles;
}