import { Resolver, Mutation, Args, Context, Int } from '@nestjs/graphql';
import { Users } from 'src/entities/users_entities/users.entity';
import { UsersUpdateService } from 'src/services/users_services/users.update.service';
import { UpdateUsersDto } from 'src/dto/users_dto/users_dto_update/users.dto.update.request';

@Resolver(() => Users)
export class UsersUpdateResolver {
    constructor( private readonly usersUpdateService: UsersUpdateService) {}

    @Mutation(() => Users)
    async updateUsers(
        @Args('id', { type: () => Int }) userId: number,
        @Args('data') data: UpdateUsersDto,
        @Context() context: { req: any },
    ): Promise<Users> {

        const customerId = context.req.user.tenantId;

        return this.usersUpdateService.updateUsers(userId, customerId, data);
    }
}