import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Users } from 'src/entities/users_entities/users.entity';
import { UsersUpdateService } from 'src/services/users_services/users.update.service';
import { UpdateUsersDto } from 'src/dto/users_dto/users_dto_update/users.dto.update.request';

@Resolver(() => Users)
export class UsersUpdateResolver {
    constructor( private readonly usersUpdateService: UsersUpdateService) {}

    @Mutation(() => Users)
    async updateUsers(
        @Args('data') data: UpdateUsersDto,
        @Context() context: { req: any },
    ): Promise<Users> {
        const usersId = context.req.user.sub;
        const customerId = context.req.user.tenantId;

        return this.usersUpdateService.updateUsers(usersId, customerId, data);
    }
}