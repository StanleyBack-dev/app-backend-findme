import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from 'src/entities/roles_entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
})

export class RolesModule {}