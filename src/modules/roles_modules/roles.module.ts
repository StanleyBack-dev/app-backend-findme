import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { RolesCreateResolver } from 'src/resolvers/roles_resolvers/roles.create.resolver';
import { RolesCreateService } from 'src/services/roles_services/roles.create.service';
import { RolesUpdateResolver } from 'src/resolvers/roles_resolvers/roles.update.resolver';
import { RolesUpdateService } from 'src/services/roles_services/roles.update.service';
import { RolesFindResolver } from 'src/resolvers/roles_resolvers/roles.find.resolver';
import { RolesFindService } from 'src/services/roles_services/roles.find.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesCreateResolver, RolesUpdateResolver, RolesFindResolver, RolesCreateService, RolesUpdateService, RolesFindService],
  exports: [RolesCreateResolver, RolesUpdateResolver, RolesFindResolver, RolesCreateService, RolesUpdateService, RolesFindService],
})

export class RolesModule {}