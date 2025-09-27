import { Resolver, Mutation, Context } from '@nestjs/graphql';
import { Throttle } from '@nestjs/throttler';
import { Response } from 'express';
import { UseInterceptors } from '@nestjs/common';
import { LogoutLogInterceptor } from 'src/common/interceptors/logout.interceptors';
import { DtoAuthLogoutResponse } from 'src/dto/auth/logout/dto.auth.logout.response';
import { AuthLogoutService } from 'src/services/auth/service.auth.logout';

@Resolver()
export class AuthLogoutResolver {
  constructor(private readonly authLogoutService: AuthLogoutService) {}

  @Throttle({ logout: { limit: 5, ttl: 60000 } })
  @Mutation(() => DtoAuthLogoutResponse)
  @UseInterceptors(LogoutLogInterceptor)
  async logout(@Context() context: { req: any; res: Response }): Promise<DtoAuthLogoutResponse> {
    const userId = context.req.user.sub;
    return this.authLogoutService.logout(userId, context.res);
  }
}