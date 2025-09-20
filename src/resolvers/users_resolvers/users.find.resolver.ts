import { Resolver, Query, Context, Args } from '@nestjs/graphql';
import { UsersFindService } from 'src/services/users_services/users.find.service';
import { FindUsersResponseDto } from 'src/dto/users_dto/users_dto_find/users.dto.find.response';
import { FindUsersInputDto } from 'src/dto/users_dto/users_dto_find/user.dto.find.input';

@Resolver(() => FindUsersResponseDto)
export class UsersFindResolver {
  constructor(private readonly usersFindService: UsersFindService) {}

  @Query(() => [FindUsersResponseDto])
  async users(
    @Args('filters', { nullable: true }) filters: FindUsersInputDto,
    @Context() context: any,
  ): Promise<FindUsersResponseDto[]> {
    
    const tenantId = context.req.user?.tenantId;

    return this.usersFindService.getAllUsers(filters || {}, tenantId);
  }
}