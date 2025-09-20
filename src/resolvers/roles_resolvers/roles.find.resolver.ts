import { Resolver, Query, Args } from '@nestjs/graphql';
import { RolesFindService } from 'src/services/roles_services/roles.find.service';
import { FindRolesResponseDto } from 'src/dto/roles_dto/roles_dto_find/roles.dto.find.response';
import { FindRolesInputDto } from 'src/dto/roles_dto/roles_dto_find/roles.dto.find.input';

@Resolver(() => FindRolesResponseDto)
export class RolesFindResolver {
  constructor(private readonly rolesFindService: RolesFindService) {}

  @Query(() => [FindRolesResponseDto])
  async roles(
    @Args('filters', { nullable: true }) filters: FindRolesInputDto,
  ): Promise<FindRolesResponseDto[]> {
    
    return this.rolesFindService.getAllRoles(filters || {});
  }
}