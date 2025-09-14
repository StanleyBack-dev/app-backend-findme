import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/users_entities/users.entity';
import { UsersCreateResolver } from 'src/resolvers/users_resolvers/users.create.resolver';
import { UsersCreateService } from 'src/services/users_services/users.create.service';
import { UsersGetResolver } from 'src/resolvers/users_resolvers/users.get.resolver';
import { UsersGetService } from 'src/services/users_services/users.get.service';
import { UsersUpdateService } from 'src/services/users_services/users.update.service';
import { UsersUpdateResolver } from 'src/resolvers/users_resolvers/users.update.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersCreateService, UsersGetService, UsersUpdateService, UsersCreateResolver, UsersGetResolver, UsersUpdateResolver],
  exports: [UsersCreateService, UsersGetService, UsersUpdateService],
})
export class UsersModule {}