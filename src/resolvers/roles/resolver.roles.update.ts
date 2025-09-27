import { Resolver, Mutation, Args, Context, Int} from '@nestjs/graphql';
import { Roles } from 'src/entities/roles/roles.entity';
import { RolesUpdateService } from 'src/services/roles/service.roles.update';
import { DtoRolesUpdateInput } from 'src/dto/roles_dto/update/dto.roles.update.input';

@Resolver(() => Roles)
export class RolesUpdateResolver {
    constructor(
        private readonly rolesUpdateService: RolesUpdateService
    ) {}

    @Mutation(() => Roles)
    async updateRoles(
        @Args('id', { type: () => Int }) roleId: number,
        @Args('data') data: DtoRolesUpdateInput,
        @Context() context: { req: any }
    ): Promise<Roles> {

        const userId = context.req.user.sub;

        return this.rolesUpdateService.updateRoles(roleId, userId, data);
    }
}