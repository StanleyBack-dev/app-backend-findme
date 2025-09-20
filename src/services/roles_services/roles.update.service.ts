import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "src/entities/roles_entities/roles.entity";

@Injectable()
export class RolesUpdateService {
  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}

  async updateRoles(
    idtb_roles: number,
    idtb_users: number,
    data: {
      name?: string;
      description?: string;
      status?: boolean;
      updated_by?: number;
      inactivated_at?: Date;
      inactivated_by?: number;
    }
  ): Promise<Roles> {
    const roles = await this.rolesRepository.findOne({ where: { idtb_roles } });

    if (!roles) {
      throw new NotFoundException(`Regra não encontrada`);
    }

    Object.assign(roles, {
      ...data,
      updated_by: idtb_users,
    });

    return await this.rolesRepository.save(roles);
  }
}