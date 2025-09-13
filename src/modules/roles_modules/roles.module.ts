import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles_entities/roles.entity';
import { RolesPostResolver } from 'src/resolvers/roles_resolvers/roles.post.resolver';
import { RolesPostService } from 'src/services/roles_services/roles.post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesPostResolver, RolesPostService],
  exports: [RolesPostResolver, RolesPostService],
})

export class RolesModule {}