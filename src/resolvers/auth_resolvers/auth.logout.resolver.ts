import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { UseInterceptors, UseGuards } from '@nestjs/common';
import { LogoutLogInterceptor } from 'src/common/interceptors/logout.interceptors';
import { LogoutResponseDto } from 'src/dto/auth_dto/auth_dto_logout/auth.dto.logout.response';
import { AuthLogoutService } from 'src/services/auth_services/auth.logout.service';

@Resolver()
export class AuthLogoutResolver {
  constructor(private readonly authLogoutService: AuthLogoutService) {}

  @Throttle({ logout: { limit: 5, ttl: 60000 } })
  @Mutation(() => LogoutResponseDto)
  @UseInterceptors(LogoutLogInterceptor)
  async logout(@Context() context: { req: any; res: Response }): Promise<LogoutResponseDto> {
    const userId = context.req.user.sub;
    return this.authLogoutService.logout(userId, context.res);
  }
}