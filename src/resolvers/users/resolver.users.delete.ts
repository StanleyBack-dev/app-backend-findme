import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { UsersDeleteService } from 'src/services/users/service.users.delete';
import { DtoUsersDeleteResponse } from 'src/dto/users_dto/delete/dto.users.delete.response';
import { DtoUsersDeleteInput } from 'src/dto/users_dto/delete/dto.users.delete.input';

@Resolver()
export class UsersDeleteResolver {
    constructor(
        private readonly userDeleteService: UsersDeleteService
    ) {}

    @Mutation(() => DtoUsersDeleteResponse)
    async deleteUsers(
        @Args('data') data: DtoUsersDeleteInput,
        @Context() context: { req: any },
    ): Promise<DtoUsersDeleteResponse> {

        const tenatId = context.req.user.tenatId;
        const inactivated_by = context.req.user.sub;

        return this.userDeleteService.deleteUsers(tenatId, data.id, inactivated_by);
    }
}