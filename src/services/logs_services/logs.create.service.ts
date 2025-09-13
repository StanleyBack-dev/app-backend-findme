import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logs } from 'src/entities/logs_entities/logs.entity';
import { Users } from '../../entities/users_entities/users.entity';

@Injectable()
export class LogsCreateService {
  constructor(
    @InjectRepository(Logs)
    private readonly logCreateRepo: Repository<Logs>,
  ) {}

  async createLog(data: {
    user: Users | null; 
    action: string;
    description: string;
    ipAddress: string;
    userAgent: string;
    deviceName: string;
    operationType: string;
    operationName: string;
  }) {
    const log = this.logCreateRepo.create({
      user: data.user ? { idtb_users: data.user.idtb_users } : undefined,
      action: data.action,
      description: data.description,
      ip_address: data.ipAddress,
      user_agent: data.userAgent,
      device_name: data.deviceName,
      operation_type: data.operationType,
      operation_name: data.operationName,
    });

    return this.logCreateRepo.save(log);
  }
}