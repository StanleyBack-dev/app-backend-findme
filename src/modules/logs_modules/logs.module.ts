import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logs } from 'src/entities/logs_entities/logs.entity';
import { LogsCreateService } from 'src/services/logs_services/logs.create.service';

@Module({
  imports: [TypeOrmModule.forFeature([Logs])],
  providers: [LogsCreateService],
  exports: [LogsCreateService], 
})

export class LogsModule {}