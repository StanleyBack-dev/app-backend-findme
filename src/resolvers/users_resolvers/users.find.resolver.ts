import { Resolver, Query, Context } from '@nestjs/graphql';
import { UsersFindService } from 'src/services/users_services/users.find.service';
import { Users } from 'src/entities/users_entities/users.entity';

@Resolver(() => Users)
export class UsersFindResolver {
  constructor(private readonly usersFindService: UsersFindService) {}

@Query(() => [Users])
async users(@Context() context: any): Promise<Users[]> {
  const tenantId = context.req.user?.tenantId;
  if (!tenantId) throw new Error('TenantId missing');
  return this.usersFindService.getAllUsers(tenantId);
}
}
