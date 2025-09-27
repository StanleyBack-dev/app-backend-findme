import { Resolver, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { Users } from 'src/entities/users/users.entity';
import { UsersUpdateService } from 'src/services/users/service.users.update';
import { DtoUsersUpdateInput } from 'src/dto/users_dto/update/dto.users.update.input';

@Resolver(() => Users)
export class UsersUpdateResolver {
    constructor( private readonly usersUpdateService: UsersUpdateService) {}

    @Mutation(() => Users)
    async updateUsers(
        @Args('id', { type: () => Int }) userId: number,
        @Args('data') data: DtoUsersUpdateInput,
        @Context() context: { req: any },
    ): Promise<Users> {

        const customerId = context.req.user.tenantId;

        return this.usersUpdateService.updateUsers(userId, customerId, data);
    }
}