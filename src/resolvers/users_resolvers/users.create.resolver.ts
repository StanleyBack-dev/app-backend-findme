import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UsersCreateService } from '../../services/users_services/users.create.service';
import { Users } from '../../entities/users_entities/users.entity';
import { CreateUsersDto } from 'src/dto/users_dto/users_dto_create/users.dto.create.request';

@Resolver(() => Users)
export class UsersCreateResolver {
  constructor(
    private readonly usersCreateService: UsersCreateService,
  ) {}

  @Mutation(() => Users)
  async createUser(
    @Args('data') data: CreateUsersDto,
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