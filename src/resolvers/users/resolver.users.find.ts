import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { UsersFindService } from 'src/services/users/service.users.find';
import { DtoUsersFindResponse } from 'src/dto/users_dto/find/dto.users.find.response';
import { DtoUsersFindInput } from 'src/dto/users_dto/find/dto.user.find.input';

@Resolver(() => DtoUsersFindResponse)
export class UsersFindResolver {
  constructor(private readonly usersFindService: UsersFindService) {}

  @Query(() => [DtoUsersFindResponse])
  async users(
    @Args('filters', { nullable: true }) filters: DtoUsersFindInput,
    @Context() context: any,
  ): Promise<DtoUsersFindResponse[]> {
    
    const tenantId = context.req.user?.tenantId;

    return this.usersFindService.getAllUsers(filters || {}, tenantId);
  }
}