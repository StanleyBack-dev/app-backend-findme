import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "src/entities/roles_entities/roles.entity";
import { DeleteRolesResponseDto } from "src/dto/roles_dto/roles_dto_delete/roles.dto.delete.response";

@Injectable()
export class RolesDeleteService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>
    ) {}

    async deleteRoles(idtb_roles: number, inactivated_by: number): Promise<DeleteRolesResponseDto> {

    const role = await this.rolesRepository.findOne({ where: { idtb_roles } });

    if (!role) {
        throw new NotFoundException('Regra não encontrada');
    }

    role.status = false;
    role.inactivated_at = new Date();
    role.inactivated_by = inactivated_by;

    return this.rolesRepository.save(role);
    }
}