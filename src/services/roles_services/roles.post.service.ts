import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Roles } from "src/entities/roles_entities/roles.entity";

@Injectable()
export class RolesPostService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>
    ) {}

    async createRoles(data: {
        name: string;
        description: string;
        created_by: string;
    }): Promise<Roles> {
        const roles = this.rolesRepository.create(data);
        return this.rolesRepository.save(roles);
    }
}