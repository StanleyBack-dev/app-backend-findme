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
import { UsersFindService } from "src/services/users_services/users.find.service";
import { Users } from "src/entities/users_entities/users.entity";

@Injectable()
export class LogoutLogInterceptor implements NestInterceptor {
  constructor(
    private readonly logsCreateService: LogsCreateService,
    private readonly usersFindService: UsersFindService
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const req = gqlCtx.getContext().req;
    const userId = req.user?.sub;
    const tenantId: string | undefined = req.user?.tenantId;

    const logMeta = {
      ipAddress: req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
      userAgent: req.headers["user-agent"] || "unknown",
      deviceName: req.headers["device-name"] || "unknown",
      operationType: gqlCtx.getInfo().operation.operation,
      operationName: gqlCtx.getInfo().fieldName,
    };

    return next.handle().pipe(
      tap(() => {
        this.handleLog(userId, {
          action: "logout_success",
          description: "Logout completed successfully",
          ...logMeta,
          tenantId
        });
      }),
      catchError((err) => {
        return from(
          this.handleLog(userId, {
            action: "logout_error",
            description: err.message,
            ...logMeta,
            tenantId,
          })
        ).pipe(switchMap(() => throwError(() => err)));
      })
    );
  }

  private async handleLog(userId: number, logData: any) {
    try {
      let user: Users | null = null;
      if (userId && logData.tenantId) {
        user = await this.usersFindService.getByIdUsers(userId, logData.tenantId);
      }

      await this.logsCreateService.createLog({
        user: user,
        action: logData.action,
        description: logData.description,
        ipAddress: logData.ipAddress,
        userAgent: logData.userAgent,
        deviceName: logData.deviceName,
        operationType: logData.operationType,
        operationName: logData.operationName,
      });
    } catch (logError) {
      console.error("Failed to create logout log entry:", logError);
    }
  }
}