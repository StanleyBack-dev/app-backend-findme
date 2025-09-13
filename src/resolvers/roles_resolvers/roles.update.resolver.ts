import { Resolver, Mutation, Args, Context, Int} from '@nestjs/graphql';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { RolesUpdateService } from 'src/services/roles_services/roles.update.service';
import { UpdateRolesDto } from 'src/dto/roles_dto/roles_dto_update/roles.dto.update.request';

@Resolver(() => Roles)
export class RolesUpdateResolver {
    constructor(
        private readonly rolesUpdateService: RolesUpdateService
    ) {}

    @Mutation(() => Roles)
    async updateRoles(
        @Args('id', { type: () => Int }) roleId: number,
        @Args('data') data: UpdateRolesDto,
        @Context() context: { req: any }
    ): Promise<Roles> {

        const userId = context.req.user.sub;

        return this.rolesUpdateService.updateRoles(roleId, userId, data);
    }
}