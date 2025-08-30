import { Resolver, Mutation, Args, Context } from "@nestjs/graphql";
import { Throttle } from "@nestjs/throttler";
import { Public } from "src/common/decorators/public.decorator";
import { UseInterceptors } from "@nestjs/common";
import { LogLoginInterceptor } from "src/common/interceptors/login.interceptors";
import { AuthLoginService } from "src/services/auth_services/auth.login.service";
import { LoginResquestDto } from "src/dto/auth_dto/auth_dto_login/auth.dto.login.request";
import { LoginResponseDto } from "src/dto/auth_dto/auth_dto_login/auth.dto.login.response";

@Resolver()
export class AuthLoginResolver {
  constructor(
    private readonly authLoginService: AuthLoginService,
  ) {}

  @Public()
  @Throttle({ login: { limit: 5, ttl: 60000 } })
  @Mutation(() => LoginResponseDto)
  @UseInterceptors(LogLoginInterceptor)
  async login(
    @Args("loginInput") loginInput: LoginResquestDto,
    @Args("deviceName") deviceName: string,
    @Context() context: any
  ): Promise<LoginResponseDto> {

    const req = context.req;
    const ipAddress = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "unknown";

    const loginResult = await this.authLoginService.login(
      loginInput,
      ipAddress,
      userAgent,
      deviceName,
      context.res,
    );

    return loginResult;
  }
}