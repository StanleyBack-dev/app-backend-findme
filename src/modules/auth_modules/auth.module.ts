import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users_modules/users.module';
import { LogsModule } from '../logs_modules/logs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSessionUser } from 'src/entities/auth_entities/auth.session.entity';
import { AuthLoginResolver } from 'src/resolvers/auth_resolvers/auth.login.resolver';
import { AuthLogoutResolver } from 'src/resolvers/auth_resolvers/auth.logout.resolver';
import { AuthLoginService } from 'src/services/auth_services/auth.login.service';
import { AuthLogoutService } from 'src/services/auth_services/auth.logout.service';
import { AuthCreateSessionService } from 'src/services/auth_services/auth.create.session.service';

@Module({
  imports: [
    JwtModule.register({}),
    UsersModule,
    LogsModule,
    TypeOrmModule.forFeature([AuthSessionUser]),
  ],
  providers: [AuthLoginResolver, AuthLoginService, AuthCreateSessionService, AuthLogoutService, AuthLogoutResolver],
  exports: [AuthCreateSessionService, AuthLoginService, AuthLogoutService],
})
export class AuthModule {}