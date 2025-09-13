import { Resolver, Query, Context } from '@nestjs/graphql';
import { UsersGetService } from 'src/services/users_services/users.get.service';
import { Users } from 'src/entities/users_entities/users.entity';

@Resolver(() => Users)
export class UsersGetResolver {
  constructor(private readonly usersGetService: UsersGetService) {}

@Query(() => [Users])
async users(@Context() context: any): Promise<Users[]> {
  const tenantId = context.req.user?.tenantId;
  if (!tenantId) throw new Error('TenantId missing');
  return this.usersGetService.getAllUsers(tenantId);
}
}
