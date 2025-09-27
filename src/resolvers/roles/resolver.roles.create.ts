import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { RolesCreateService } from 'src/services/roles/service.roles.create';
import { Roles } from 'src/entities/roles/roles.entity';
import { DtoRolesCreateInput } from 'src/dto/roles_dto/create/dto.roles.create.input';

@Resolver(() => Roles)
export class RolesCreateResolver {
    constructor(
        private readonly rolesCreateService: RolesCreateService
    ) {}

    @Mutation(() => Roles)
    async createRole(
        @Args('data') data: DtoRolesCreateInput,
        @Context() context: { req: any }
    ): Promise<Roles>{
        
        const createBy = context.req.user.sub;

        return this.rolesCreateService.execute({ ...data, created_by: createBy });
    }
}