import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Roles } from "src/entities/roles/roles.entity";
import { RolesCreateResolver } from "src/resolvers/roles/resolver.roles.create";
import { RolesCreateService } from "src/services/roles/service.roles.create";
import { RolesUpdateResolver } from "src/resolvers/roles/resolver.roles.update";
import { RolesUpdateService } from "src/services/roles/service.roles.update";
import { RolesFindResolver } from "src/resolvers/roles/resolver.roles.find";
import { RolesFindService } from "src/services/roles/service.roles.find";
import { RolesDeleteResolver } from "src/resolvers/roles/resolver.roles.delete";
import { RolesDeleteService } from "src/services/roles/service.roles.delete";

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [
    RolesCreateResolver,
    RolesUpdateResolver,
    RolesFindResolver,
    RolesDeleteResolver,
    RolesCreateService,
    RolesUpdateService,
    RolesFindService,
    RolesDeleteService,
  ],
  exports: [
    RolesCreateResolver,
    RolesUpdateResolver,
    RolesFindResolver,
    RolesDeleteResolver,
    RolesCreateService,
    RolesUpdateService,
    RolesFindService,
    RolesDeleteService,
  ],
})

export class RolesModule {}