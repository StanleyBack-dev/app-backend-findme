import * as dotenv from "dotenv";
import typeOrmConfig from "../config/orm.config";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { GqlThrottlerGuard } from "src/config/limit.request.config";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { UsersModule } from "./users_modules/users.module";
import { AuthModule } from "./auth_modules/auth.module";
import { LogsModule } from "./logs_modules/logs.module";
import { RolesModule } from "./roles_modules/roles.module";
import { CustomersModule } from "./customers_modules/customers.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "src/guards/jwt.auth.guards";

import { ConfigModule } from "@nestjs/config";

dotenv.config();

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    LogsModule,
    RolesModule,
    CustomersModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: true,
      path: '/',
      context: ({ req, res }) => ({ req, res }),
    }),
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})

export class AppModule {}