import { Resolver, Mutation, Context, Args } from '@nestjs/graphql';
import { RolesDeleteService } from 'src/services/roles/service.roles.delete';
import { DtoRolesDeleteResponse } from 'src/dto/roles_dto/delete/dto.roles.delete.response';
import { DtoRolesDeleteInput } from 'src/dto/roles_dto/delete/dto.roles.delete.input';

@Resolver()
export class RolesDeleteResolver {
  constructor(
    private readonly rolesDeleteService: RolesDeleteService
  ) {}

  @Mutation(() => DtoRolesDeleteResponse)
  async deleteRoles(
    @Args('data') data: DtoRolesDeleteInput,
    @Context() context: { req: any },
  ): Promise<DtoRolesDeleteResponse> {
    const inactivatedBy = context.req.user.sub;

    return this.rolesDeleteService.deleteRoles(data.id, inactivatedBy);
  }
}