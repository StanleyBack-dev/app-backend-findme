import { Resolver, Query, Args } from '@nestjs/graphql';
import { RolesFindService } from 'src/services/roles/service.roles.find';
import { DtoRolesFindResponse } from 'src/dto/roles_dto/find/dto.roles.find.response';
import { DtoRolesFindInput } from 'src/dto/roles_dto/find/dto.roles.find.input';

@Resolver(() => DtoRolesFindResponse)
export class RolesFindResolver {
  constructor(private readonly rolesFindService: RolesFindService) {}

  @Query(() => [DtoRolesFindResponse])
  async roles(
    @Args('filters', { nullable: true }) filters: DtoRolesFindInput,
  ): Promise<DtoRolesFindResponse[]> {
    
    return this.rolesFindService.getAllRoles(filters || {});
  }
}