import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../../entities/users_entities/users.entity';
import { UsersPostResolver } from 'src/resolvers/users_resolvers/users.post.resolver';
import { UsersGetResolver } from 'src/resolvers/users_resolvers/users.get.resolver';
import { UsersPostService } from 'src/services/users_services/users.post.service';
import { UsersGetService } from 'src/services/users_services/users.get.service';
import { UsersUpdateService } from 'src/services/users_services/users.update.service';
import { UsersUpdateResolver } from 'src/resolvers/users_resolvers/users.update.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UsersPostService, UsersGetService, UsersUpdateService, UsersUpdateService, UsersPostResolver, UsersGetResolver, UsersUpdateResolver],
  exports: [UsersPostService, UsersGetService, UsersUpdateService, UsersUpdateService],
})
export class UsersModule {}