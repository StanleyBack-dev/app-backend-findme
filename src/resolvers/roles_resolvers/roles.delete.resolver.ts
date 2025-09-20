import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { RolesDeleteService } from 'src/services/roles_services/roles.delete.service';
import { DeleteRolesResponseDto } from 'src/dto/roles_dto/roles_dto_delete/roles.dto.delete.response';
import { DeleteRolesInputDto } from 'src/dto/roles_dto/roles_dto_delete/roles.dto.delete.input';

@Resolver()
export class RolesDeleteResolver {
  constructor(
    private readonly rolesDeleteService: RolesDeleteService,
  ) {}

  @Mutation(() => DeleteRolesResponseDto)
  async deleteRoles(
    @Args('data') data: DeleteRolesInputDto,
    @Context() context: { req: any },
  ): Promise<DeleteRolesResponseDto> {
    const inactivatedBy = context.req.user.sub;

    return this.rolesDeleteService.deleteRoles(data.id, inactivatedBy);
  }
}