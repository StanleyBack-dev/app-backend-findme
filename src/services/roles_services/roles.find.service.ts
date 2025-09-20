import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Roles } from "src/entities/roles_entities/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FindRolesInputDto } from "src/dto/roles_dto/roles_dto_find/roles.dto.find.input";
import { FindRolesResponseDto } from "src/dto/roles_dto/roles_dto_find/roles.dto.find.response";

@Injectable()
export class RolesFindService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}

  async getAllRoles(filters: FindRolesInputDto): Promise<FindRolesResponseDto[]> {
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