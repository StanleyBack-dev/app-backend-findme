import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { UsersDeleteService } from 'src/services/users_services/users.delete.service';
import { DeleteUsersResponseDto } from 'src/dto/users_dto/users_dto_delete/users.dto.delete.response';
import { DeleteUsersInputDto } from 'src/dto/users_dto/users_dto_delete/users.dto.delete.input';

@Resolver()
export class UsersDeleteResolver {
    constructor(
        private readonly userDeleteService: UsersDeleteService
    ) {}

    @Mutation(() => DeleteUsersResponseDto)
    async deleteUsers(
        @Args('data') data: DeleteUsersInputDto,
        @Context() context: { req: any },
    ): Promise<DeleteUsersResponseDto> {

        const tenatId = context.req.user.tenatId;
        const inactivated_by = context.req.user.sub;

        return this.userDeleteService.deleteUsers(tenatId, data.id, inactivated_by);
    }
}