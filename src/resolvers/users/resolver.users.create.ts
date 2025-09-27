import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersCreateService } from '../../services/users/service.users.create';
import { Users } from '../../entities/users/users.entity';
import { DtoUsersCreateInput } from 'src/dto/users_dto/create/dto.users.create.input';

@Resolver(() => Users)
export class UsersCreateResolver {
  constructor(
    private readonly usersCreateService: UsersCreateService,
  ) {}

  @Mutation(() => Users)
  async createUser(
    @Args('data') data: DtoUsersCreateInput,
    @Context() context: { req: any },
  ): Promise<Users> {
    const userId = context.req.user.sub;
    const tenantId = context.req.user.tenantId;

    return this.usersCreateService.execute({
      ...data,
      created_by: userId,
      idtb_customers: tenantId,
    });
  }
}