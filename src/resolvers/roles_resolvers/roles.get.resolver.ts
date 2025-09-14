import { Resolver, Query } from '@nestjs/graphql';
import { RolesGetService } from 'src/services/roles_services/roles.get.service';
import { Roles } from 'src/entities/roles_entities/roles.entity';

@Resolver(() => Roles)
export class RolesGetResolver {
    constructor(
        private readonly rolesGetService: RolesGetService
    ) {}

    @Query(() => [Roles])
    async roles (): Promise<Roles[]>{
        return this.rolesGetService.getAllRoles();
    }
}