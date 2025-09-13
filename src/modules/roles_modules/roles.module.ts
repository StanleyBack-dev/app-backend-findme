import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { RolesPostResolver } from 'src/resolvers/roles_resolvers/roles.post.resolver';
import { RolesPostService } from 'src/services/roles_services/roles.post.service';
import { RolesUpdateResolver } from 'src/resolvers/roles_resolvers/roles.update.resolver';
import { RolesUpdateService } from 'src/services/roles_services/roles.update.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesPostResolver, RolesUpdateResolver, RolesPostService, RolesUpdateService],
  exports: [RolesPostResolver, RolesUpdateResolver, RolesPostService, RolesUpdateService],
})

export class RolesModule {}