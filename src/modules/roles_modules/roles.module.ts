import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { RolesCreateResolver } from 'src/resolvers/roles_resolvers/roles.create.resolver';
import { RolesCreateService } from 'src/services/roles_services/roles.create.service';
import { RolesUpdateResolver } from 'src/resolvers/roles_resolvers/roles.update.resolver';
import { RolesUpdateService } from 'src/services/roles_services/roles.update.service';
import { RolesGetResolver } from 'src/resolvers/roles_resolvers/roles.get.resolver';
import { RolesGetService } from 'src/services/roles_services/roles.get.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesCreateResolver, RolesUpdateResolver, RolesGetResolver, RolesCreateService, RolesUpdateService, RolesGetService],
  exports: [RolesCreateResolver, RolesUpdateResolver, RolesGetResolver, RolesCreateService, RolesUpdateService, RolesGetService],
})

export class RolesModule {}