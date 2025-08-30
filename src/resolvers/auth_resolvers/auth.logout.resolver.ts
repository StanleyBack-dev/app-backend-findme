import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Throttle } from "@nestjs/throttler";
import { Response } from 'express';
import { UseInterceptors } from '@nestjs/common';
import { LogoutLogInterceptor } from 'src/common/interceptors/logout.interceptors';
import { LogoutInput } from './inputs/logout.input';
import { LogoutResponse } from './inputs/logout.response';
import { AuthLogoutService } from 'src/services/auth_services/auth.logout.service';

@Resolver()
export class AuthLogoutResolver {
  constructor(
    private readonly authLogoutService: AuthLogoutService,
  ) {}

  @Throttle({ logout: { limit: 5, ttl: 60000 } })
  @Mutation(() => LogoutResponse)
  @UseInterceptors(LogoutLogInterceptor)
  async logout(
    @Args("logoutInput") LogoutInput: LogoutInput,
    @Context() context: { res: Response },
  ): Promise<LogoutResponse> {

    return this.authLogoutService.logout(LogoutInput, context.res);
  }
}