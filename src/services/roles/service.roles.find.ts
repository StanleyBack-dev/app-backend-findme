import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Roles } from "src/entities/roles/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DtoRolesFindInput } from "src/dto/roles_dto/find/dto.roles.find.input";
import { DtoRolesFindResponse } from "src/dto/roles_dto/find/dto.roles.find.response";

@Injectable()
export class RolesFindService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}

  async getAllRoles(filters: DtoRolesFindInput): Promise<DtoRolesFindResponse[]> {
    const roles = await this.rolesRepository.find({
      where: {
        ...filters,
      },
    });

    return roles.map((r) => ({
      idtb_roles: r.idtb_roles,
      name: r.name,
      description: r.description,
      status: r.status,
      created_by: r.created_by,
      updated_by: r.updated_by,
      inactivated_by: r.inactivated_by,
      inactivated_at: r.inactivated_at,
      created_at: r.created_at,
      updated_at: r.updated_at,
    }));
  }
}