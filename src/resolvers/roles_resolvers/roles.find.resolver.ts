import { Resolver, Query } from '@nestjs/graphql';
import { RolesFindService } from 'src/services/roles_services/roles.find.service';
import { Roles } from 'src/entities/roles_entities/roles.entity';

@Resolver(() => Roles)
export class RolesFindResolver {
    constructor(
        private readonly rolesFindService: RolesFindService
    ) {}

    @Query(() => [Roles])
    async roles (): Promise<Roles[]>{
        return this.rolesFindService.getAllRoles();
    }
}