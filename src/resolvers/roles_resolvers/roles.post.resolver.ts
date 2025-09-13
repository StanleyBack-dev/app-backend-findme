import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { RolesPostService } from 'src/services/roles_services/roles.post.service';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { CreateRolesDto } from 'src/dto/roles_dto/roles_dto_create/roles.dto.create.request';

@Resolver(() => Roles)
export class RolesPostResolver {
    constructor(
        private readonly rolesPostService: RolesPostService
    ) {}

    @Mutation(() => Roles)
    async createRoles(
        @Args('data') data: CreateRolesDto,
        @Context() context: { req: any }
    ): Promise<Roles>{
        
        const createBy = context.req.user.sub;

        return this.rolesPostService.createRoles({ ...data, created_by: createBy });
    }
}