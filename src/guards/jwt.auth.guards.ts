import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';
import { LogsCreateService } from 'src/services/logs_services/logs.create.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private logsService: LogsCreateService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const ctx = GqlExecutionContext.create(context).getContext();
    const req = ctx.req;
    const token = req.cookies?.['access_token'];

    if (!token) {
      await this.logsService.createLog({
        user: null,
        action: 'auth_fail',
        description: 'attempt without token',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || '',
        deviceName: 'unknown',
        operationType: 'auth',
        operationName: context.getHandler().name,
      });
      throw new UnauthorizedException('Missing authentication token');
    }

    try {

      const secret = this.configService.get<string>('JWT_SECRET', '');
      const payload: any = jwt.verify(token, secret);
      req.user = payload;
      return true;

    } catch (err) {
      await this.logsService.createLog({
        user: null,
        action: 'auth_fail',
        description: 'invalid or expired token',
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'] || '',
        deviceName: 'unknown',
        operationType: 'auth',
        operationName: context.getHandler().name,
      });
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}