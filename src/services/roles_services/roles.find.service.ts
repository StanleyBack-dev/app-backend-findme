import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Roles } from "src/entities/roles_entities/roles.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class RolesFindService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>
    ) {}

    async getAllRoles():Promise<Roles[]>{
        return this.rolesRepository.find();
    }
}