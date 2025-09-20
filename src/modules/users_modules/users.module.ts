import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../entities/users_entities/users.entity";
import { UsersCreateResolver } from "src/resolvers/users_resolvers/users.create.resolver";
import { UsersCreateService } from "src/services/users_services/users.create.service";
import { UsersFindResolver } from "src/resolvers/users_resolvers/users.find.resolver";
import { UsersFindService } from "src/services/users_services/users.find.service";
import { UsersUpdateService } from "src/services/users_services/users.update.service";
import { UsersUpdateResolver } from "src/resolvers/users_resolvers/users.update.resolver";
import { UsersDeleteResolver } from "src/resolvers/users_resolvers/users.delete.resolver";
import { UsersDeleteService } from "src/services/users_services/users.delete.service";

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