import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../entities/users/users.entity";
import { UsersCreateResolver } from "src/resolvers/users/resolver.users.create";
import { UsersCreateService } from "src/services/users/service.users.create";
import { UsersFindResolver } from "src/resolvers/users/resolver.users.find";
import { UsersFindService } from "src/services/users/service.users.find";
import { UsersUpdateService } from "src/services/users/service.users.update";
import { UsersUpdateResolver } from "src/resolvers/users/resolver.users.update";
import { UsersDeleteResolver } from "src/resolvers/users/resolver.users.delete";
import { UsersDeleteService } from "src/services/users/service.users.delete";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    UsersCreateService,
    UsersFindService,
    UsersUpdateService,
    UsersDeleteService,
    UsersCreateResolver,
    UsersFindResolver,
    UsersUpdateResolver,
    UsersDeleteResolver,
  ],
  exports: [UsersCreateService, UsersFindService, UsersUpdateService],
})

export class UsersModule {}