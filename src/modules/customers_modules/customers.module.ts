import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customers } from 'src/entities/customers_entities/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customers])],
})

export class CustomersModule {}