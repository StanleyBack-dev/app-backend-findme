import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable, from, throwError } from "rxjs";
import { tap, catchError, switchMap } from "rxjs/operators";
import { LogsCreateService } from "src/services/logs_services/logs.create.service";
import { UsersGetService } from "src/services/users_services/users.get.service";
import { User } from "src/entities/users_entities/users.entity";

@Injectable()
export class LogLoginInterceptor implements NestInterceptor {
  constructor(
    private readonly logsCreateService: LogsCreateService,
    private readonly usersGetService: UsersGetService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const req = gqlCtx.getContext().req;
    const args = gqlCtx.getArgs();

    const ipAddress = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "unknown";
    const operationType = gqlCtx.getInfo().operation.operation;
    const operationName = gqlCtx.getInfo().fieldName;

    return next.handle().pipe(
      tap((result) => {
        this.logsCreateService.createLog({
          user: result?.user || req.user || null,
          action: "login_success",
          description: "login completed",
          ipAddress,
          userAgent,
          deviceName: req.headers["device-name"] || "unknown",
          operationType,
          operationName,
        });
      }),
      catchError((err) => {
        return from(
          this.handleLoginError(err, args, {
            ipAddress,
            userAgent,
            deviceName: req.headers['device-name'] || 'unknown',
            operationType,
            operationName,
          }),
        ).pipe(
          switchMap(() => {
            return throwError(() => err);
          }),
        );
      }),
    );
  }

  private async handleLoginError(err: any, args: any, logMeta: any) {

    let user: User | null = null; 
    const username = args.loginInput?.username;

    if (username) {
      user = await this.usersGetService.getByUsernameAndCustomers(
        username
      );
    }

    await this.logsCreateService.createLog({
      user: user,
      action: 'error_login',
      description: err.message,
      ...logMeta,
    });
  }
}