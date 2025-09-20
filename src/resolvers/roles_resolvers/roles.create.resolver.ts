import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { RolesCreateService } from 'src/services/roles_services/roles.create.service';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { CreateRolesDto } from 'src/dto/roles_dto/roles_dto_create/roles.dto.create.input';

@Resolver(() => Roles)
export class RolesCreateResolver {
    constructor(
        private readonly rolesCreateService: RolesCreateService
    ) {}

    @Mutation(() => Roles)
    async createRole(
        @Args('data') data: CreateRolesDto,
        @Context() context: { req: any }
    ): Promise<Roles>{
        
        const createBy = context.req.user.sub;

        return this.rolesCreateService.execute({ ...data, created_by: createBy });
    }
}