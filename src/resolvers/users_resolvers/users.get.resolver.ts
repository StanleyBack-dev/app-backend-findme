import { Resolver, Query, Context } from '@nestjs/graphql';
import { UsersGetService } from 'src/services/users_services/users.get.service';
import { User } from 'src/entities/users_entities/users.entity';

@Resolver(() => User)
export class UsersGetResolver {
  constructor(private readonly usersGetService: UsersGetService) {}

@Query(() => [User])
async users(@Context() context: any): Promise<User[]> {
  const tenantId = context.req.user?.tenantId;
  if (!tenantId) throw new Error('TenantId missing');
  return this.usersGetService.getAllUsers(tenantId);
}
}
