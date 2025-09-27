import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { LogsModule } from '../logs/logs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSessionUser } from 'src/entities/auth/auth.session.entity';
import { AuthLoginResolver } from 'src/resolvers/auth/resolver.auth.login';
import { AuthLogoutResolver } from 'src/resolvers/auth/resolver.auth.logout';
import { AuthLoginService } from 'src/services/auth/service.auth.login';
import { AuthLogoutService } from 'src/services/auth/service.auth.logout';
import { AuthCreateSessionService } from 'src/services/auth/service.auth.create.session';

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