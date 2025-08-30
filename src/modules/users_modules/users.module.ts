import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entities/users_entities/users.entity';
import { UsersPostResolver } from 'src/resolvers/users_resolvers/users.post.resolver';
import { UsersGetResolver } from 'src/resolvers/users_resolvers/users.get.resolver';
import { UsersPostService } from 'src/services/users_services/users.post.service';
import { UsersGetService } from 'src/services/users_services/users.get.service';
import { UsersUpdateService } from 'src/services/users_services/users.update.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersPostService, UsersGetService, UsersUpdateService, UsersPostResolver, UsersGetResolver],
  exports: [UsersPostService, UsersGetService, UsersUpdateService],
})
export class UsersModule {}